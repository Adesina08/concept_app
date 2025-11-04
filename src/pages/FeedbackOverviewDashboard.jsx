import React from 'react';

const activeConcepts = [
  {
    title: 'Concept A: Eco-Friendly Packaging',
    status: '75% Complete',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNwi6CrHADEFpgsDm2v3g07eMyFodMW6dQ6beNKaMsjgrVr8rRL2Xts60bsPbkPCk7yQa8tyb-nqfzgCmUm-B_IuqhdjtMBSCHsfFcoeuVRSFI7HhWNlLDofJJvMUrVnspUIH9r55_2rHZ3GJaPER_B6kuus6hyLhlNXU885YHeHKU45lMViKOcfpCgCqLX-wsZ9oyEvCu8g6IJa1Yskr7zLuiRyxkg_W1MCK8TFq6cq9hp2IPqfpx5gTJ5oemWcqfyogiFS5MqfAp',
  },
  {
    title: 'Concept B: Sustainable Materials',
    status: '50% Complete',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBxwkR8a2e4cMLySwIhL0QlqwFRpY9k-bjAfPJPrl1P9q_aVGV9sV1-aO9azVioEFpt44QqZKkvUYQP6Dlt503NlKiJnENCl7izDkEKfViRSfEVBzDP6ACu7GyaDIpQaFj6NWlC17n1laGKYANhJ0Uu1yr6ZrsfCVpLqWPC5hlWMmaqWhaCSnGXwg_ksBttX7CWKeKTG98kPNUS-dG7ENrLFJ9s5RbeaeiY7axEKh75-vNc2kgOFZwfuACFMs8Occ34hQKjCMd9Lo2B',
  },
  {
    title: 'Concept C: Reduced Waste',
    status: '25% Complete',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCo0zZMmbQdk3HhzgzWMnvLjIguqygQSWf9X6y5x2C5Hl-xOuE0k_G1RzC223s2PJl2i2Vi87cqfXTwX4vCZt7NHYQ5i3FP5k-D7OjvsvimsTjmD_an8vvXfgpSTFvNaXEWkqOAm0DtgUZu1fxEwGHJXZK4Z13TysiIXNZ-Q11ylcGEb4IZMYaok0T85VdhxGYsOpaPD12_8RSTGogNnbFB4WFmIIEh_Z3yelAC6a6jeCfE2uUE-gDz6X6mt7N3yqKkVOQoCGTh4mzG',
  },
];

const summaryCards = [
  { label: 'Active Concepts', value: '5' },
  { label: 'Survey Responses', value: '234' },
  { label: 'A/B Tests', value: '3' },
];

const FeedbackOverviewDashboard = () => (
  <div
    className="group/design-root relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
    style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
  >
    <div>
      <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
        <h2 className="flex-1 pl-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Dashboard</h2>
        <div className="flex w-12 items-center justify-end">
          <button className="flex h-12 max-w-[480px] min-w-0 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-transparent p-0 text-base font-bold leading-normal tracking-[0.015em] text-white">
            <div className="text-white" data-icon="Plus" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Summary</h2>
      <div className="flex flex-wrap gap-4 p-4">
        {summaryCards.map((card) => (
          <div key={card.label} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-lg border border-[#323b67] p-6">
            <p className="text-base font-medium leading-normal text-white">{card.label}</p>
            <p className="text-2xl font-bold leading-tight tracking-tight text-white">{card.value}</p>
          </div>
        ))}
      </div>
      <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Active Concepts</h2>
      {activeConcepts.map((concept) => (
        <div key={concept.title} className="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2">
          <div
            className="size-14 shrink-0 rounded-lg bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${concept.image}')` }}
          />
          <div className="flex flex-col justify-center">
            <p className="line-clamp-1 text-base font-medium leading-normal text-white">{concept.title}</p>
            <p className="line-clamp-2 text-sm font-normal leading-normal text-[#929bc9]">{concept.status}</p>
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

export default FeedbackOverviewDashboard;
