/**
 * routes/payment.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Express router handling all Razorpay payment operations.
 *
 * Routes:
 *   POST /api/payment/create-order  → Creates a Razorpay order
 *   POST /api/payment/verify        → Verifies payment signature (HMAC-SHA256)
 *
 * LOCATION: backend/routes/payment.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

const express = require('express');
const crypto = require('crypto'); // Node.js built-in — no install needed
const razorpay = require('../config/razorpay');

const router = express.Router();

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/payment/create-order
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Creates a new Razorpay order.
 *
 * Request body:
 *   { amount: number, currency?: string }
 *   - amount   → Order total in the smallest currency unit.
 *                For INR, this is PAISE (1 INR = 100 paise).
 *                Your frontend sends rupees, so we multiply by 100 here.
 *   - currency → Optional. Defaults to 'INR'.
 *
 * Response:
 *   { order_id, amount, currency, key_id }
 *   - order_id → Passed to Razorpay checkout widget on the frontend
 *   - key_id   → Your public KEY_ID — safe to send to the client
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR' } = req.body;

    // ── Input Validation ──────────────────────────────────────────────────
    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: 'Amount is required.' });
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ error: 'Amount must be a positive number.' });
    }

    // Razorpay requires amount in paise (smallest currency unit)
    // e.g., ₹499.00 → 49900 paise
    const amountInPaise = Math.round(parsedAmount * 100);

    // ── Create Razorpay Order ──────────────────────────────────────────────
    const options = {
      amount: amountInPaise,
      currency,
      // receipt: A short reference string for your records (max 40 chars)
      receipt: `receipt_${Date.now()}`,
      // payment_capture: 1 means auto-capture on successful payment
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    console.log(`[create-order] ✅ Order created: ${order.id} | ₹${parsedAmount} (${amountInPaise} paise)`);

    // Return the data the frontend needs to open the Razorpay modal
    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,       // in paise — Razorpay checkout expects this
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID, // public key — safe to expose
    });

  } catch (error) {
    console.error('[create-order] ❌ Error:', error);

    // Razorpay SDK errors have an `error` property with a description
    const message = error?.error?.description || error?.message || 'Failed to create order.';
    return res.status(500).json({ error: message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/payment/verify
// ─────────────────────────────────────────────────────────────────────────────
/**
 * Verifies a Razorpay payment using HMAC-SHA256 signature verification.
 *
 * HOW IT WORKS:
 *   After a successful payment, Razorpay sends three values to the frontend:
 *     - razorpay_order_id   → the order ID you created
 *     - razorpay_payment_id → the payment ID from Razorpay
 *     - razorpay_signature  → HMAC-SHA256 of (order_id + "|" + payment_id)
 *                             signed with your KEY_SECRET
 *
 *   We recompute the HMAC on the server using our secret and compare it
 *   to the signature sent by the client. If they match, the payment is genuine.
 *
 * Request body:
 *   { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 *
 * Response:
 *   { success: true, message: string }  → on valid signature
 *   { success: false, error: string }   → on invalid signature (HTTP 400)
 */
router.post('/verify', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // ── Input Validation ──────────────────────────────────────────────────
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment verification fields.',
      });
    }

    // ── Recompute Expected Signature ──────────────────────────────────────
    // Razorpay's signature is: HMAC-SHA256(order_id + "|" + payment_id, key_secret)
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');

    // ── Constant-Time Comparison ──────────────────────────────────────────
    // Using timingSafeEqual prevents timing-based attacks that could leak
    // information about the signature through response time differences.
    const signatureBuffer = Buffer.from(razorpay_signature, 'hex');
    const expectedBuffer  = Buffer.from(expectedSignature, 'hex');

    const isValid =
      signatureBuffer.length === expectedBuffer.length &&
      crypto.timingSafeEqual(signatureBuffer, expectedBuffer);

    if (!isValid) {
      console.warn(
        `[verify] ⚠️ Signature mismatch for order: ${razorpay_order_id} | payment: ${razorpay_payment_id}`
      );
      return res.status(400).json({
        success: false,
        error: 'Payment signature verification failed. This payment may be fraudulent.',
      });
    }

    console.log(
      `[verify] ✅ Payment verified: order=${razorpay_order_id} | payment=${razorpay_payment_id}`
    );

    return res.status(200).json({
      success: true,
      message: 'Payment verified successfully.',
      payment_id: razorpay_payment_id,
      order_id:   razorpay_order_id,
    });

  } catch (error) {
    console.error('[verify] ❌ Unexpected error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during payment verification.',
    });
  }
});

module.exports = router;
