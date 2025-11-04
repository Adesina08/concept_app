import React from 'react';

const RespondentLogin = () => {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
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
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <input
              type="text"
              placeholder="Email or Username"
              className="form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <input
              type="password"
              placeholder="Password"
              className="form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            />
          </label>
        </div>
        <p className="px-4 pb-3 pt-1 text-sm font-normal leading-normal text-[#929bc9] underline">Forgot Password?</p>
        <div className="flex px-4 py-3">
          <button className="flex h-12 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-xl bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white">
            <span className="truncate">Login</span>
          </button>
        </div>
      </div>
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
