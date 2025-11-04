import React from 'react';

const UserProfile = () => {
  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <div className="flex size-12 shrink-0 items-center text-white" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Profile</h2>
        </div>
        <div className="@container flex p-4">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-4">
              <div
                className="min-h-32 w-32 rounded-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD5kGYELEbQZ_gA1bZ66c0xfnW41Hatxev5Wrv5AXYrRVzzqiYeBDwDvBP-oAylwd_Um2SpwSigXeyX9pfgdXVbneSr_EYtLdbvKCJHCCHblKr5g6kEGVcXqt7JUo89zuw_X8I6jFae_QLXOYCK5Spr63Fu9P-z2vXuPOS39eONGCUCcp-WXuzu62NqKGPbWjfienr6pXwAidc_kC9_6XBM1T9GIa5-9ux4TvY4vTlEOltfEW2xQVf3ZiEb4XLpKkAtHip5FK-W0Ig")',
                }}
              />
              <div className="flex flex-col items-center justify-center">
                <p className="text-center text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Sophia Carter</p>
                <p className="text-center text-base font-normal leading-normal text-[#929bc9]">Client</p>
                <p className="text-center text-base font-normal leading-normal text-[#929bc9]">Joined 2022</p>
              </div>
            </div>
          </div>
        </div>
        <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">Account</h3>
        {[
          'Edit Profile',
          'Change Password',
          'Notifications',
        ].map((item) => (
          <div key={item} className="flex min-h-14 items-center justify-between gap-4 bg-[#111422] px-4">
            <p className="flex-1 truncate text-base font-normal leading-normal text-white">{item}</p>
            <div className="shrink-0">
              <div className="flex size-7 items-center justify-center text-white" data-icon="ArrowRight" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
        <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">Support</h3>
        {['Help Center', 'Contact Us'].map((item) => (
          <div key={item} className="flex min-h-14 items-center justify-between gap-4 bg-[#111422] px-4">
            <p className="flex-1 truncate text-base font-normal leading-normal text-white">{item}</p>
            <div className="shrink-0">
              <div className="flex size-7 items-center justify-center text-white" data-icon="ArrowRight" data-size="24px" data-weight="regular">
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
          {[
            {
              label: 'Submit',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                </svg>
              ),
            },
            {
              label: 'Dashboard',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                </svg>
              ),
            },
            {
              label: 'Reports',
              active: false,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                </svg>
              ),
            },
            {
              label: 'Profile',
              active: true,
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                  <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z" />
                </svg>
              ),
            },
          ].map((item) => (
            <a
              key={item.label}
              href="#"
              className={`just flex flex-1 flex-col items-center justify-end gap-1 ${
                item.active ? 'rounded-full text-white' : 'text-[#929bc9]'
              }`}
            >
              <div
                className={`${item.active ? 'text-white' : 'text-[#929bc9]'} flex h-8 items-center justify-center`}
                data-size="24px"
                data-weight={item.active ? 'fill' : 'regular'}
              >
                {item.icon}
              </div>
              <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${item.active ? 'text-white' : 'text-[#929bc9]'}`}>
                {item.label}
              </p>
            </a>
          ))}
        </div>
        <div className="h-5 bg-[#191e33]" />
      </div>
    </div>
  );
};

export default UserProfile;
