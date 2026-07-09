/**
 * server.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Express application entry point for AURA Perfumes backend.
 *
 * Responsibilities:
 *   1. Load environment variables from .env (via dotenv)
 *   2. Configure CORS so the React frontend can call the API
 *   3. Parse incoming JSON request bodies
 *   4. Mount the payment router at /api/payment
 *   5. Provide a health-check endpoint at GET /health
 *   6. Start the HTTP server on the configured PORT
 *
 * LOCATION: backend/server.js
 *
 * HOW TO RUN:
 *   Development:  npm run dev   (uses nodemon for auto-reload)
 *   Production:   npm start
 * ─────────────────────────────────────────────────────────────────────────────
 */

// ── 1. Load Environment Variables ─────────────────────────────────────────────
// dotenv reads backend/.env and injects variables into process.env.
// This MUST be the first require so all other modules see the env vars.
require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const paymentRouter = require('./routes/payment');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── 2. CORS Configuration ─────────────────────────────────────────────────────
// Restrict which origins can call this API.
// In development: localhost Vite dev server.
// In production: add your deployed frontend URL (Vercel, Netlify, etc.)
// to the ALLOWED_ORIGINS variable in backend/.env.
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn(`[CORS] Blocked request from origin: ${origin}`);
      return callback(new Error(`CORS policy: Origin ${origin} is not allowed.`));
    },
    methods:     ['GET', 'POST', 'OPTIONS'],
    credentials: true,
  })
);

// ── 3. Body Parsing ────────────────────────────────────────────────────────────
// Parse incoming requests with JSON payloads (Content-Type: application/json).
// Limit set to 10kb — payment payloads are tiny, this guards against large body attacks.
app.use(express.json({ limit: '10kb' }));

// ── 4. Routes ──────────────────────────────────────────────────────────────────
// Health check — useful for uptime monitors and deployment platforms (Render, Railway)
app.get('/health', (_req, res) => {
  res.status(200).json({
    status:  'ok',
    service: 'aura-perfumes-backend',
    time:    new Date().toISOString(),
  });
});

// Payment routes:
//   POST /api/payment/create-order  → create a Razorpay order
//   POST /api/payment/verify        → verify payment signature
app.use('/api/payment', paymentRouter);

// ── 5. 404 Handler ────────────────────────────────────────────────────────────
// Catch all unmatched routes and return a clean JSON 404.
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found.' });
});

// ── 6. Global Error Handler ───────────────────────────────────────────────────
// Catches any errors thrown by route handlers (including CORS rejections).
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.error('[Global Error Handler]', err.message || err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error.',
  });
});

// ── 7. Start Server ───────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('');
  console.log('  ╔═══════════════════════════════════════╗');
  console.log('  ║   AURA Perfumes — Backend Server      ║');
  console.log(`  ║   Running on http://localhost:${PORT}    ║`);
  console.log('  ╚═══════════════════════════════════════╝');
  console.log('');
  console.log(`  Razorpay Key ID : ${process.env.RAZORPAY_KEY_ID}`);
  console.log(`  Allowed Origins : ${allowedOrigins.join(', ')}`);
  console.log('');
  console.log('  Routes:');
  console.log('    GET  /health                     → Health check');
  console.log('    POST /api/payment/create-order   → Create Razorpay order');
  console.log('    POST /api/payment/verify         → Verify payment signature');
  console.log('');
});
