export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { amount } = req.body || {};

  if (!amount || Number.isNaN(Number(amount))) {
    return res.status(400).json({ error: 'Valid amount is required' });
  }

  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  const secret = process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET;

  if (!keyId || !secret) {
    return res.status(500).json({ error: 'Razorpay credentials missing' });
  }

  if (keyId.includes('xxxxxxxx') || secret.includes('your_')) {
    return res.status(500).json({ error: 'Razorpay credentials are not configured' });
  }

  const auth = `Basic ${Buffer.from(`${keyId}:${secret}`).toString('base64')}`;
  const payload = {
    amount: Math.round(Number(amount) * 100),
    currency: 'INR',
    receipt: `mact_${Date.now()}`,
    payment_capture: 1,
  };

  try {
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: auth,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await razorpayResponse.json();

    return res.status(razorpayResponse.status).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Unable to create Razorpay order' });
  }
}