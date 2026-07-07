import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required.';
    if (!form.email) errs.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Enter a valid email.';
    if (!form.password) errs.password = 'Password is required.';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters.';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: { full_name: form.name.trim() },
      },
    });
    setLoading(false);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Account created! Welcome to AURA.');
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-luxury-dark flex items-center justify-center px-4 py-16">
      {/* Background glow orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-luxury-gold/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-luxury-card border border-luxury-gold/20 rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="px-8 pt-10 pb-6 text-center border-b border-white/5">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-luxury-gold animate-pulse" />
              <span className="font-serif text-xl tracking-[0.3em] text-white">AURA</span>
            </Link>
            <h1 className="font-serif text-3xl text-white mb-1">Create Account</h1>
            <p className="text-sm text-gray-400">Join AURA and discover your signature scent</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="px-8 py-8 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="signup-name" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                <input
                  id="signup-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className={`w-full bg-luxury-accent/50 border rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${
                    errors.name
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-luxury-gold/20 focus:border-luxury-gold/60'
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="signup-email" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`w-full bg-luxury-accent/50 border rounded-xl py-3 pl-10 pr-4 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-luxury-gold/20 focus:border-luxury-gold/60'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="signup-password" className="block text-xs uppercase tracking-widest text-gray-400 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                <input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className={`w-full bg-luxury-accent/50 border rounded-xl py-3 pl-10 pr-10 text-sm text-white placeholder-gray-600 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-500/70 focus:border-red-500'
                      : 'border-luxury-gold/20 focus:border-luxury-gold/60'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-red-400">{errors.password}</p>}
            </div>

            {/* Password strength hint */}
            {form.password.length > 0 && (
              <div className="flex gap-1.5 mt-1">
                {[1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                      form.password.length >= level * 3
                        ? level <= 1
                          ? 'bg-red-500'
                          : level <= 2
                          ? 'bg-yellow-500'
                          : level <= 3
                          ? 'bg-blue-400'
                          : 'bg-green-500'
                        : 'bg-white/10'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Submit */}
            <button
              id="signup-submit"
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 rounded-xl text-sm tracking-widest uppercase font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating Account…
                </>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Footer link */}
            <p className="text-center text-sm text-gray-500 pt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-luxury-gold hover:text-yellow-300 transition-colors font-medium">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
