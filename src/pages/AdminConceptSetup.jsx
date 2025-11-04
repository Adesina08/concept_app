import React from 'react';

const selectButtonSvg = "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(146,155,201)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')";

const AdminConceptSetup = () => (
  <div
    className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
    style={{ '--select-button-svg': selectButtonSvg, fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
  >
    <div>
      <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
        <div className="text-white flex size-12 shrink-0 items-center" data-icon="X" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </div>
        <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">New Concept</h2>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex min-w-40 flex-1 flex-col">
          <input
            placeholder="Concept Title"
            className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            defaultValue=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex min-w-40 flex-1 flex-col">
          <textarea
            placeholder="Concept Description"
            className="form-input flex min-h-36 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
            defaultValue=""
          />
        </label>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Assets</h2>
      <div className="flex flex-col p-4">
        <div className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#323b67] px-6 py-14">
          <div className="flex max-w-[480px] flex-col items-center gap-2">
            <p className="max-w-[480px] text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Upload Assets</p>
            <p className="max-w-[480px] text-center text-sm font-normal leading-normal text-white">Drag and drop or browse to upload images or videos.</p>
          </div>
          <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#232948] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
            <span className="truncate">Browse Files</span>
          </button>
        </div>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Target Audience</h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex min-w-40 flex-1 flex-col">
          <select className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] bg-[image:var(--select-button-svg)] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0">
            <option value="" />
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
        </label>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Feedback Type</h2>
      <div className="flex flex-wrap gap-3 p-4">
        <label className="text-sm font-medium leading-normal relative flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#323b67] px-4 text-white has-[:checked]:border-[3px] has-[:checked]:border-[#2b4bee] has-[:checked]:px-3.5">
          Survey
          <input type="radio" name="feedback-type" className="invisible absolute" />
        </label>
        <label className="text-sm font-medium leading-normal relative flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#323b67] px-4 text-white has-[:checked]:border-[3px] has-[:checked]:border-[#2b4bee] has-[:checked]:px-3.5">
          A/B Test
          <input type="radio" name="feedback-type" className="invisible absolute" />
        </label>
      </div>
    </div>
    <div>
      <div className="flex px-4 py-3">
        <button className="flex h-12 min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white">
          <span className="truncate">Push for Feedback</span>
        </button>
      </div>
      <div className="h-5 bg-[#111422]" />
    </div>
  </div>
);

export default AdminConceptSetup;
