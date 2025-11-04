import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const RespondentLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, user } = useAuth();

  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [feedback, setFeedback] = useState({ type: null, message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user?.role === 'respondent') {
      navigate('/respondent-dashboard', { replace: true });
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
      await login({ email: trimmedValues.email, password: trimmedValues.password, role: 'respondent' });
      setFeedback({ type: 'success', message: 'Welcome back! Redirecting to your dashboard…' });
      navigate('/respondent-dashboard', { replace: true });
    } catch (error) {
      setFeedback({ type: 'error', message: error.message || 'Unable to sign in. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <div className="flex size-12 shrink-0 items-center text-white" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            Respondent Login
          </h2>
        </div>
        {feedback.message ? (
          <div
            className={`mx-4 mt-4 rounded-lg border px-4 py-3 text-sm ${
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
            <input
              name="email"
              type="text"
              placeholder="Email or Username"
              value={formValues.email}
              onChange={handleChange}
              className={`form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:outline-none focus:ring-2 focus:ring-[#2b4bee] ${
                fieldErrors.email ? 'border-red-500/70 ring-red-500/40 focus:ring-red-500/60' : 'border-transparent'
              }`}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'respondent-email-error' : undefined}
            />
            {fieldErrors.email ? (
              <span id="respondent-email-error" className="pt-2 text-xs font-medium text-red-300">
                {fieldErrors.email}
              </span>
            ) : null}
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
              className={`form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:outline-none focus:ring-2 focus:ring-[#2b4bee] ${
                fieldErrors.password ? 'border-red-500/70 ring-red-500/40 focus:ring-red-500/60' : 'border-transparent'
              }`}
              aria-invalid={Boolean(fieldErrors.password)}
              aria-describedby={fieldErrors.password ? 'respondent-password-error' : undefined}
            />
            {fieldErrors.password ? (
              <span id="respondent-password-error" className="pt-2 text-xs font-medium text-red-300">
                {fieldErrors.password}
              </span>
            ) : null}
          </label>
        </div>
        <p className="px-4 pb-3 pt-1 text-sm font-normal leading-normal text-[#929bc9] underline">Forgot Password?</p>
        <div className="flex px-4 py-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 min-w-[84px] max-w-[480px] flex-1 items-center justify-center overflow-hidden rounded-xl bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="truncate">{isSubmitting ? 'Signing in…' : 'Login'}</span>
          </button>
        </div>
      </form>
      <div>
        <p className="px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#929bc9]">
          Don&apos;t have an account?
        </p>
        <p className="px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#929bc9] underline">Sign Up</p>
        <div className="h-5 bg-[#111422]" />
      </div>
    </div>
  );
};

export default RespondentLogin;
