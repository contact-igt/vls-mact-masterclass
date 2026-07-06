import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { phoneNumbers } from '@/constants/navlink';
import { safeGetPaymentDetails } from '@/utils/paymentStorage';
import styles from './styles.module.css';

export default function Response() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const routeResponse = router.query.response || router.asPath?.replace('/', '');
  const isSuccess = routeResponse === 'thank-you';

  useEffect(() => {
    setPaymentDetails(safeGetPaymentDetails());
  }, []);

  const goHome = () => {
    router.push('/');
  };

  return (
    <section className={styles.responseSection}>
      <div className="wrap">
        <div className={styles.responseCard}>
          <img className={styles.statusImage} src={isSuccess ? '/assets/images/success.png' : '/assets/images/error.png'} alt={isSuccess ? 'Payment successful' : 'Payment failed'} />
          <h1 className={isSuccess ? styles.successText : styles.errorText}>{isSuccess ? 'Payment Successful' : 'Payment Failed'}</h1>
          <p className={styles.message}>
            {isSuccess
              ? 'Your MACT Masterclass registration is confirmed.'
              : 'Your payment could not be completed. Please try again or contact support.'}
          </p>

          {isSuccess && paymentDetails ? (
            <div className={styles.summaryBox}>
              <div className={styles.summaryRow}><span>Name</span><strong>{paymentDetails.name || '-'}</strong></div>
              <div className={styles.summaryRow}><span>Email</span><strong>{paymentDetails.email || '-'}</strong></div>
              <div className={styles.summaryRow}><span>Mobile</span><strong>{paymentDetails.mobile || '-'}</strong></div>
              <div className={styles.summaryRow}><span>Amount</span><strong>₹{paymentDetails.amount || '499'}</strong></div>
              <div className={styles.summaryRow}><span>Transaction ID</span><strong>{paymentDetails.razorpay_payment_id || '-'}</strong></div>
            </div>
          ) : null}

          <div className={styles.actionRow}>
            <button className={styles.backButton} onClick={goHome} type="button">
              <img src="/assets/images/back.png" alt="" />
              Back to Home
            </button>
            {!isSuccess ? (
              <a className={styles.supportButton} href={phoneNumbers.primaryHref}>Call Support</a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}