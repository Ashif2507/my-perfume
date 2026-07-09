/**
 * config/razorpay.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Initializes and exports a single, reusable Razorpay SDK instance.
 *
 * WHY a dedicated config file?
 *   • Single responsibility — one place to change keys or options.
 *   • Prevents repeated instantiation across route files.
 *   • Makes it easy to swap test ↔ live keys by changing .env only.
 *
 * LOCATION: backend/config/razorpay.js
 * ─────────────────────────────────────────────────────────────────────────────
 */

const Razorpay = require('razorpay');

// Guard: fail fast if keys are missing instead of getting cryptic Razorpay errors
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error(
    '[razorpay.js] Missing Razorpay credentials.\n' +
    'Please set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env'
  );
}

/**
 * Razorpay SDK instance.
 * Initialized once at startup using credentials from environment variables.
 *
 * key_id     → Your Razorpay Key ID (rzp_test_... or rzp_live_...)
 * key_secret → Your Razorpay Key Secret — NEVER expose this to the client
 */
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpayInstance;
