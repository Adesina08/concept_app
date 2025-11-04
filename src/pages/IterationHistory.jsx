import React from 'react';

const iterations = [
  { version: 'Version 3.0', date: '2024-03-15' },
  { version: 'Version 2.0', date: '2024-03-10' },
  { version: 'Version 1.0', date: '2024-03-05' },
];

const IterationHistory = () => (
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
        <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Concept Evolution</h2>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Iteration History</h2>
      {iterations.map((item) => (
        <div key={item.version} className="flex min-h-[72px] items-center justify-between gap-4 bg-[#111422] px-4 py-2">
          <div className="flex flex-col justify-center">
            <p className="line-clamp-1 text-base font-medium leading-normal text-white">{item.version}</p>
            <p className="line-clamp-2 text-sm font-normal leading-normal text-[#929bc9]">{item.date}</p>
          </div>
          <div className="shrink-0">
            <div className="text-white flex size-7 items-center justify-center" data-icon="ArrowRight" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
              </svg>
            </div>
          </div>
        </div>
      ))}
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

export default IterationHistory;
