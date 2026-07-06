import { useState } from 'react';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Popup from '@/common/Popup';
import { courseDetails, mactPayment } from '@/constants/Home';
import { safeSetPaymentDetails } from '@/utils/paymentStorage';
import styles from './styles.module.css';

const getUTM = (key) => {
  if (typeof window === 'undefined') {
    return '';
  }

  try {
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
};

const handleGoogleSheetForm = async (formData, retries = 3, delay = 1500) => {
  const sheetUrl = "https://script.google.com/macros/s/AKfycbzjGS_s5Mac0FZh5QM8b4P9oih4YAzTk3695yE1AXymcGk9cxTdrbsyCKlbQLYd572N/exec";

  if (!sheetUrl) {
    return false;
  }

  try {
    const response = await fetch(sheetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData.toString(),
    });

    if (response.ok) {
      return true;
    }

    throw new Error('Sheet responded with non-OK status');
  } catch (error) {
    if (retries <= 1) {
      console.error('Google Sheet failed permanently:', error);
      return false;
    }

    await new Promise((resolve) => setTimeout(resolve, delay));
    return handleGoogleSheetForm(formData, retries - 1, delay);
  }
};

// const handleWhatsappMessage = async (phone, name, amount, programmName, schedule, platform, linkDate) => {
//   const response = await fetch('/api/sendWhatsapp', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       phone,
//       name,
//       amount,
//       programm_name: programmName,
//       schedule,
//       platform,
//       link_date: linkDate,
//     }),
//   });
//
//   if (!response.ok) {
//     throw new Error('WhatsApp message failed');
//   }
//
//   return response.json();
// };

const readApiError = async (response) => {
  try {
    const data = await response.json();
    return data?.error || data?.description || 'Payment order could not be created.';
  } catch {
    return 'Payment order could not be created.';
  }
};

export default function ContactForm({ ipAddress = '' }) {
  const router = useRouter();
  const [instructionOpen, setInstructionOpen] = useState(false);
  const [agree, setAgree] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [formValues, setFormValues] = useState(null);
  const [formError, setFormError] = useState('');

  const redirectToError = () => {
    window.dataLayer?.push({ event: 'mact_payment_failed' });
    router.replace('/error');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      mobile: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().matches(/^[a-zA-Z ]*$/, 'Invalid name'),
      email: Yup.string()
        .required('Email required')
        .email('Enter valid email')
        .test('lowercase', 'Email must be lowercase', (value) => !value || value === value.toLowerCase()),
      mobile: Yup.string()
        .required('Mobile required')
        .matches(/^[0-9]{10}$/, 'Invalid mobile number'),
    }),
    onSubmit: (values) => {
      setFormError('');
      setFormValues(values);
      setAgree(false);
      setInstructionOpen(true);
      window.dataLayer?.push({ event: 'mact_register_submit', course: mactPayment.title });
    },
  });

  const createPaymentPayload = (values, order, response) => ({
    name: values.name || '',
    email: values.email,
    mobile: `+91${values.mobile}`,
    amount: order.amount / 100,
    programm_date: mactPayment.programmDate,
    razorpay_order_id: response.razorpay_order_id || '',
    razorpay_payment_id: response.razorpay_payment_id || '',
    razorpay_signature: response.razorpay_signature || '',
    payment_status: 'paid',
    captured: response.captured || '',
    page_name: mactPayment.pageName,
    ip_address: ipAddress,
    utm_source: getUTM('utm_source'),
    utm_medium: getUTM('utm_medium'),
    utm_campaign: getUTM('utm_campaign'),
    utm_term: getUTM('utm_term'),
    utm_content: getUTM('utm_content'),
  });

  const finishSuccessfulPayment = async (values, order, response) => {
    if (!response?.razorpay_payment_id) {
      redirectToError();
      return;
    }

    setProcessing(true);
    window.dataLayer?.push({ event: 'mact_payment_success', payment_id: response.razorpay_payment_id });

    const apiPayload = createPaymentPayload(values, order, response);
    const sheetParams = new URLSearchParams();

    Object.keys(apiPayload).forEach((key) => {
      sheetParams.append(key, apiPayload[key] ?? '');
    });

    // try {
    //   await handleWhatsappMessage(
    //     `91${values.mobile}`,
    //     values.name,
    //     mactPayment.amount,
    //     mactPayment.whatsappProgramName,
    //     mactPayment.whatsappSchedule,
    //     mactPayment.whatsappPlatform,
    //     mactPayment.whatsappLinkDate
    //   );
    // } catch (error) {
    //   console.error('WhatsApp message failed:', error);
    // }

    await handleGoogleSheetForm(sheetParams);
    safeSetPaymentDetails(apiPayload);
    window.location.href = '/thank-you';
  };

  const openRazorpay = async () => {
    if (!formValues) {
      return;
    }

    if (!window.Razorpay) {
      setFormError('Payment gateway did not load. Please try again.');
      return;
    }

    try {
      window.dataLayer?.push({ event: 'mact_payment_started', amount: mactPayment.amount });

      const orderResponse = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: mactPayment.amount }),
      });

      if (!orderResponse.ok) {
        const errorMessage = await readApiError(orderResponse);
        setFormError(errorMessage);
        window.dataLayer?.push({ event: 'mact_payment_order_failed', reason: errorMessage });
        return;
      }

      const order = await orderResponse.json();

      const razorpay = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: formValues.name || 'VLS Law Academy',
        order_id: order.id,
        description: `${mactPayment.title} - Rs.${mactPayment.amount}`,
        prefill: {
          name: formValues.name,
          email: formValues.email,
          contact: formValues.mobile,
        },
        theme: { color: '#b20a0a' },
        handler: (response) => finishSuccessfulPayment(formValues, order, response),
      });

      razorpay.on('payment.failed', redirectToError);
      razorpay.open();
    } catch (error) {
      setFormError('Payment could not be started. Please try again or contact support.');
      window.dataLayer?.push({ event: 'mact_payment_order_failed', reason: 'unexpected_error' });
    }
  };

  const handleInstructionPayment = () => {
    setInstructionOpen(false);
    openRazorpay();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} noValidate>
        <p className="form-card__title">Register Now</p>
        <p className="form-card__sub">( Get Your MACT Practice — Roadmap )</p>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" type="text" placeholder="Your full name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.name && formik.errors.name ? <p className={styles.errorText}>{formik.errors.name}</p> : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" placeholder="your@email.com" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
          {formik.touched.email && formik.errors.email ? <p className={styles.errorText}>{formik.errors.email}</p> : null}
        </div>

        <div className="form-group">
          <label htmlFor="mobile">Mobile *</label>
          <div className={styles.mobileInputWrap}>
            <span className={styles.countryCode}>+91</span>
            <input id="mobile" name="mobile" type="tel" placeholder="XXXXX XXXXX" value={formik.values.mobile} onChange={formik.handleChange} onBlur={formik.handleBlur} maxLength="10" />
          </div>
          {formik.touched.mobile && formik.errors.mobile ? <p className={styles.errorText}>{formik.errors.mobile}</p> : null}
        </div>

        <button className="form-submit" type="submit">SUBMIT</button>
        {formError ? <p className="form-message">{formError}</p> : null}
        <div className="form-pricing">
          <span className="orig">INR {courseDetails.originalPrice}</span>&nbsp;→&nbsp;<span className="now">{courseDetails.offerPrice}</span>
          <small>Limited seats — first-come, first-served</small>
        </div>
      </form>

      <Popup open={instructionOpen} onClose={() => setInstructionOpen(false)}>
        <div className={styles.instructionPopup}>
          <h3>Payment Instructions</h3>
          <p>Please wait until you are redirected to the success page after completing payment.</p>
          <p>Do not close, refresh, or go back during payment. If the page is closed early, your registration details may not be recorded correctly.</p>
          <label className={styles.agreeRow}>
            <input type="checkbox" checked={agree} onChange={(event) => setAgree(event.target.checked)} />
            I understand and agree.
          </label>
          <div className={styles.popupActions}>
            <button className={styles.secondaryButton} type="button" onClick={() => setInstructionOpen(false)}>Cancel</button>
            <button className={styles.payButton} type="button" disabled={!agree} onClick={handleInstructionPayment}>I Agree & Pay ₹499</button>
          </div>
        </div>
      </Popup>

      <Popup open={processing} onClose={() => {}}>
        <div className={styles.processingPopup}>
          <h3>Processing your registration...</h3>
          <p>Please do not close this page.</p>
        </div>
      </Popup>
    </>
  );
}