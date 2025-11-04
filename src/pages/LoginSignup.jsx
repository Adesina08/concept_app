import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const LoginSignup = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && (!user?.role || user.role === 'admin')) {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate, user]);

  const validationRules = useMemo(
    () => ({
      email: {
        test: (value) => value.trim().length > 0,
        message: 'Please enter your email or username.',
      },
      password: {
        test: (value) => value.trim().length >= 6,
        message: 'Password must be at least 6 characters long.',
      },
    }),
    [],
  );

  const validate = (values) => {
    const errors = {};
    Object.entries(validationRules).forEach(([key, rule]) => {
      if (!rule.test(values[key] ?? '')) {
        errors[key] = rule.message;
      }
    });
    return errors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    setFeedback({ type: null, message: '' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmedValues = {
      email: formValues.email.trim(),
      password: formValues.password,
    };

    const validationErrors = validate(trimmedValues);
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setFeedback({ type: null, message: '' });
      await login({ email: trimmedValues.email, password: trimmedValues.password, role: 'admin' });
      setFeedback({ type: 'success', message: 'Successfully signed in. Redirecting…' });
      navigate('/admin-dashboard', { replace: true });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to sign in. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <h2 className="flex-1 px-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            ConceptForge
          </h2>
        </div>
        <h1 className="px-4 pb-3 pt-5 text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">
          Welcome back
        </h1>
        {feedback.message ? (
          <div
            className={`mx-4 mt-2 rounded-lg border px-4 py-3 text-sm ${
              feedback.type === 'success'
                ? 'border-green-500/50 bg-green-500/10 text-green-300'
                : 'border-red-500/50 bg-red-500/10 text-red-300'
            }`}
            role="alert"
          >
            {feedback.message}
          </div>
        ) : null}
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <span className="pb-2 text-base font-medium leading-normal text-white">Email or Username</span>
            <input
              name="email"
              type="text"
              placeholder="Enter your email or username"
              value={formValues.email}
              onChange={handleChange}
              className={`form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:outline-none focus:ring-2 focus:ring-[#2b4bee] ${
                fieldErrors.email ? 'border-red-500/70 ring-red-500/40 focus:ring-red-500/60' : 'border-transparent'
              }`}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
            />
            {fieldErrors.email ? (
              <span id="email-error" className="pt-2 text-xs font-medium text-red-300">
                {fieldErrors.email}
              </span>
            ) : null}
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <span className="pb-2 text-base font-medium leading-normal text-white">Password</span>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formValues.password}
              onChange={handleChange}
              className={`form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:outline-none focus:ring-2 focus:ring-[#2b4bee] ${
                fieldErrors.password ? 'border-red-500/70 ring-red-500/40 focus:ring-red-500/60' : 'border-transparent'
              }`}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'password-error' : undefined}
            />
            {fieldErrors.password ? (
              <span id="password-error" className="pt-2 text-xs font-medium text-red-300">
                {fieldErrors.password}
              </span>
            ) : null}
          </label>
        </div>
        <p className="px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#929bc9] underline">
          Forgot password?
        </p>
        <div className="flex px-4 py-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center overflow-hidden rounded-lg bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="truncate">{isSubmitting ? 'Signing in…' : 'Log In'}</span>
          </button>
        </div>
      </form>
      <div>
        <p className="px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#929bc9] underline">
          Don&apos;t have an account? Sign up
        </p>
        <div
          className="group-[.dark]/design-root:hidden aspect-square w-full rounded-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/dark.svg")', aspectRatio: '390 / 320' }}
        />
        <div
          className="group-[:not(.dark)]/design-root:hidden aspect-square w-full rounded-none bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/light.svg")', aspectRatio: '390 / 320' }}
        />
      </div>
    </div>
  );
};

export default LoginSignup;
