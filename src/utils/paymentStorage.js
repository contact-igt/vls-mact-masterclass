const paymentStorageKey = 'PaymentDetails';

export const safeSetPaymentDetails = (data) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(paymentStorageKey, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to store PaymentDetails:', error);
  }
};

export const safeGetPaymentDetails = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedData = window.localStorage.getItem(paymentStorageKey);
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error('Invalid PaymentDetails in localStorage:', error);
    window.localStorage.removeItem(paymentStorageKey);
    return null;
  }
};

export const clearPaymentDetails = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(paymentStorageKey);
};