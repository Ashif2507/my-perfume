/**
 * paymentService.js
 * Frontend payment service helper to load the Razorpay SDK script,
 * create orders, and verify payments via the backend.
 */

// Load the backend API base URL from Vite environment variables
const API_URL = import.meta.env.VITE_API_URL;

/**
 * Dynamically loads the Razorpay checkout script in the document body.
 * @returns {Promise<boolean>} Resolves to true when the script loads successfully, false otherwise.
 */
export function loadRazorpayScript() {
  return new Promise((resolve) => {
    // If already loaded, resolve immediately
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      resolve(true);
    };
    
    script.onerror = () => {
      resolve(false);
    };
    
    document.body.appendChild(script);
  });
}

/**
 * Calls the backend to create a Razorpay order.
 * @param {number} amount - The order total amount to charge.
 * @param {string} [currency='INR'] - The currency code.
 * @returns {Promise<Object>} The response containing order_id, amount, currency, and key_id.
 */
export async function createRazorpayOrder(amount, currency = 'INR') {
  try {
    const response = await fetch(`${API_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating order in paymentService:', error);
    throw error;
  }
}

/**
 * Calls the backend to verify the Razorpay payment signature.
 * @param {Object} paymentDetails - Details including razorpay_order_id, razorpay_payment_id, and razorpay_signature.
 * @returns {Promise<Object>} The response containing verification success status and message.
 */
export async function verifyRazorpayPayment(paymentDetails) {
  try {
    const response = await fetch(`${API_URL}/api/payment/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentDetails),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error verifying payment in paymentService:', error);
    throw error;
  }
}
