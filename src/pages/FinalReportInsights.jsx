import React from 'react';

const FinalReportInsights = () => (
  <div
    className="group/design-root relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
    style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
  >
    <div>
      <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
        <div className="text-white flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
          </svg>
        </div>
        <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Concept Refinement Results</h2>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Top Concept</h2>
      <div className="p-4 @container">
        <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
          <div
            className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCaMepnbZfjredeUYNTpzdpBMLcBoq14Z4sy1MSGvDftsRn4pn80p3az59BqV09mfoz-McjxX2Lsf0kuL482sGhVDZAmCL7CFIzduEf5RKY-goX4UGYUlONZBaCF9C9BHawYKqBspbhuB9Y0UODArUVJbkc-7UfFcli81Ma8UgP55smCRlSCZuVEXr7xaV4cyqHs05BIKZc7U6WPHq-Fj3qGgYp2pE4og99BToFAHt9Rd4ygxMXWROKGJu2aMosHvs5IaVXY373eU1E')",
            }}
          />
          <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
            <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">AI-Powered Personal Finance Advisor</p>
            <div className="flex items-end justify-between gap-3">
              <p className="text-base font-normal leading-normal text-[#929bc9]">
                A personalized financial planning tool that leverages AI to provide tailored investment strategies and budgeting advice.
              </p>
            </div>
          </div>
        </div>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Key Insights</h2>
      {[{
        title: 'User Satisfaction',
        value: '85%',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z" />
          </svg>
        ),
        iconLabel: 'Smiley',
      }, {
        title: 'Concept Preference',
        value: '78%',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z" />
          </svg>
        ),
        iconLabel: 'Star',
      }, {
        title: 'Average Rating',
        value: '4.8/5',
        icon: (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
            <path d="M232,208a8,8,0,0,1-8,8H32a8,8,0,0,1-8-8V48a8,8,0,0,1,16,0v94.37L90.73,98a8,8,0,0,1,10.07-.38l58.81,44.11L218.73,90a8,8,0,1,1,10.54,12l-64,56a8,8,0,0,1-10.07.38L96.39,114.29,40,163.63V200H224A8,8,0,0,1,232,208Z" />
          </svg>
        ),
        iconLabel: 'ChartLine',
      }].map((item) => (
        <div key={item.title} className="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2">
          <div className="text-white flex size-12 shrink-0 items-center justify-center rounded-lg bg-[#232948]" data-icon={item.iconLabel} data-size="24px" data-weight="regular">
            {item.icon}
          </div>
          <div className="flex flex-col justify-center">
            <p className="line-clamp-1 text-base font-medium leading-normal text-white">{item.title}</p>
            <p className="line-clamp-2 text-sm font-normal leading-normal text-[#929bc9]">{item.value}</p>
          </div>
        </div>
      ))}
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Download Summary</h2>
      <div className="flex justify-start px-4 py-3">
        <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#232948] px-4 pl-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
          <div className="text-white" data-icon="DownloadSimple" data-size="20px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z" />
            </svg>
          </div>
          <span className="truncate">Download White Paper</span>
        </button>
      </div>
    </div>
    <div>
      <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
        {[{ label: 'Submit', active: false }, { label: 'Dashboard', active: true }, { label: 'Reports', active: false }, { label: 'Profile', active: false }].map((item) => {
          const color = item.active ? 'text-white' : 'text-[#929bc9]';
          const containerClasses = item.active
            ? 'just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-white'
            : 'just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]';

          return (
            <a key={item.label} className={containerClasses} href="#">
              <div className={`${color} flex h-8 items-center justify-center`} data-icon={item.label} data-size="24px" data-weight={item.active ? 'fill' : 'regular'}>
                {item.label === 'Submit' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                  </svg>
                )}
                {item.label === 'Dashboard' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
                  </svg>
                )}
                {item.label === 'Reports' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                  </svg>
                )}
                {item.label === 'Profile' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
                  </svg>
                )}
              </div>
              <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${item.active ? 'text-white' : 'text-[#929bc9]'}`}>
                {item.label}
              </p>
            </a>
          );
        })}
      </div>
      <div className="h-5 bg-[#191e33]" />
    </div>
  </div>
);

export default FinalReportInsights;
