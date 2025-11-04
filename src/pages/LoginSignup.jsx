import React from 'react';

const LoginSignup = () => {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <h2 className="flex-1 px-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">
            ConceptForge
          </h2>
        </div>
        <h1 className="px-4 pb-3 pt-5 text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">
          Welcome back
        </h1>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <span className="pb-2 text-base font-medium leading-normal text-white">Email or Username</span>
            <input
              type="text"
              placeholder="Enter your email or username"
              className="form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <span className="pb-2 text-base font-medium leading-normal text-white">Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              className="form-input h-14 flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            />
          </label>
        </div>
        <p className="px-4 pb-3 pt-1 text-center text-sm font-normal leading-normal text-[#929bc9] underline">
          Forgot password?
        </p>
        <div className="flex px-4 py-3">
          <button className="flex h-12 min-w-[84px] max-w-[480px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white">
            <span className="truncate">Log In</span>
          </button>
        </div>
      </div>
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
