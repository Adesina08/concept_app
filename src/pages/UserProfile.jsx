import React, { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

const formatJoinDate = (isoDate) => {
  if (!isoDate) return 'Date unavailable';
  try {
    return new Date(isoDate).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch (error) {
    console.warn('Unable to format join date', error);
    return 'Date unavailable';
  }
};

const LoadingState = () => (
  <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
    <div className="size-24 animate-pulse rounded-full bg-[#1d2238]" />
    <div className="h-4 w-48 animate-pulse rounded-full bg-[#1d2238]" />
    <div className="h-3 w-36 animate-pulse rounded-full bg-[#1d2238]" />
    <div className="h-3 w-32 animate-pulse rounded-full bg-[#1d2238]" />
  </div>
);

const ErrorState = ({ onRetry }) => (
  <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-16 text-center">
    <div className="rounded-full bg-[#3b1d2b]/40 px-4 py-2 text-sm font-semibold text-[#ff7b9c]">Unable to load profile</div>
    <p className="max-w-md text-sm text-[#929bc9]">
      Something went wrong while retrieving your details. Please refresh the page or try loading your profile again.
    </p>
    <button
      type="button"
      onClick={onRetry}
      className="rounded-full bg-[#2b4bee] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d5cff]"
    >
      Retry
    </button>
  </div>
);

const MenuRow = ({ label, onClick, to, tone = 'default' }) => {
  const className = `flex min-h-14 items-center justify-between gap-4 px-4 transition ${
    tone === 'danger' ? 'text-[#ff7b9c] hover:bg-[#2d1c2a]' : 'text-white hover:bg-[#1c233b]'
  }`;

  const content = (
    <>
      <span className="flex-1 truncate text-base font-normal leading-normal">{label}</span>
      <ArrowRightIcon tone={tone} />
    </>
  );

  if (to) {
    return (
      <a href={to} className={className}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={`${className} text-left`}>
      {content}
    </button>
  );
};

const ArrowRightIcon = ({ tone = 'default' }) => (
  <div className={`shrink-0 ${tone === 'danger' ? 'text-[#ff7b9c]' : 'text-white'}`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
    </svg>
  </div>
);

const NotificationToggle = ({ label, description, value, onChange, disabled }) => (
  <button
    type="button"
    role="switch"
    aria-checked={value}
    onClick={onChange}
    disabled={disabled}
    className={`flex w-full items-center justify-between gap-3 rounded-2xl border border-[#232948] bg-[#161b2d] px-4 py-3 text-left transition ${
      disabled ? 'opacity-60' : 'hover:border-[#2b4bee] hover:bg-[#1b2136]'
    }`}
  >
    <span className="flex-1">
      <span className="block text-sm font-semibold text-white">{label}</span>
      {description && <span className="mt-1 block text-xs leading-relaxed text-[#929bc9]">{description}</span>}
    </span>
    <span
      className={`relative inline-flex h-6 w-10 items-center rounded-full transition ${
        value ? 'bg-[#2b4bee]' : 'bg-[#232948]'
      }`}
    >
      <span
        className={`inline-block size-4 transform rounded-full bg-white transition ${value ? 'translate-x-4' : 'translate-x-1'}`}
      />
    </span>
  </button>
);

const DEFAULT_NOTIFICATION_PREFS = {
  researchUpdates: true,
  weeklyDigest: true,
  newFeedback: true,
};

const Avatar = ({ url, name }) => (
  <div
    className="min-h-32 w-32 overflow-hidden rounded-full border border-[#232948] bg-[#1c233b]"
    style={{ backgroundImage: url ? `url("${url}")` : undefined, backgroundSize: 'cover', backgroundPosition: 'center' }}
    aria-label={name}
  >
    {!url && (
      <div className="flex size-full items-center justify-center text-3xl font-semibold text-[#2b4bee]">
        {name?.slice(0, 2)?.toUpperCase() || '??'}
      </div>
    )}
  </div>
);

const ModalShell = ({ title, description, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
    <div className="w-full max-w-lg rounded-2xl bg-[#161b2d] p-6 shadow-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-white">{title}</h2>
          {description && <p className="mt-1 text-sm text-[#929bc9]">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 text-[#929bc9] transition hover:bg-[#1f2741] hover:text-white"
          aria-label="Close dialog"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
          </svg>
        </button>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  </div>
);

const EditProfileModal = ({ user, onClose, onSave, isSubmitting }) => {
  const [formState, setFormState] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    bio: user?.bio || '',
    avatarUrl: user?.avatarUrl || '',
  });
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormState((prev) => ({ ...prev, avatarUrl: e.target?.result || '' }));
    };
    reader.onerror = () => {
      setError('We could not read that file. Please try another image.');
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const trimmedName = formState.name.trim();
    if (!trimmedName) {
      setError('Please provide your display name.');
      return;
    }

    const result = await onSave({ ...formState, name: trimmedName });
    if (!result.success) {
      setError('We could not save your profile. Please try again.');
      return;
    }
    onClose();
  };

  return (
    <ModalShell
      title="Edit profile"
      description="Update your personal information, role and avatar. Changes save locally for demo purposes."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Avatar
          <div className="flex items-center gap-3">
            <Avatar url={formState.avatarUrl} name={formState.name} />
            <div className="flex flex-col gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatar}
                className="block w-full text-xs text-[#929bc9] file:mr-3 file:rounded-full file:border-0 file:bg-[#2b4bee] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white"
              />
              <p className="text-xs text-[#5b6287]">PNG, JPG or GIF up to 2MB.</p>
            </div>
          </div>
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Name
          <input
            name="name"
            value={formState.name}
            onChange={handleChange}
            placeholder="Your full name"
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
            required
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Email
          <input
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange}
            placeholder="name@email.com"
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Role
          <input
            name="role"
            value={formState.role}
            onChange={handleChange}
            placeholder="Client, Admin, Researcher..."
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Bio
          <textarea
            name="bio"
            value={formState.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Add a short introduction or responsibilities"
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        {error && <p className="text-sm text-[#ff7b9c]">{error}</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#929bc9] transition hover:bg-[#1c233b]"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-full bg-[#2b4bee] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d5cff] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

const ChangePasswordModal = ({ onClose }) => {
  const [formState, setFormState] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState(null);
  const [complete, setComplete] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    if (!formState.currentPassword || !formState.newPassword) {
      setError('Please complete all fields.');
      return;
    }
    if (formState.newPassword !== formState.confirmPassword) {
      setError('New passwords do not match.');
      return;
    }
    setTimeout(() => {
      setComplete(true);
      setFormState({ currentPassword: '', newPassword: '', confirmPassword: '' });
    }, 500);
  };

  return (
    <ModalShell
      title="Change password"
      description="Demo flow only. Password updates are not persisted."
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Current password
          <input
            type="password"
            name="currentPassword"
            value={formState.currentPassword}
            onChange={handleChange}
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          New password
          <input
            type="password"
            name="newPassword"
            value={formState.newPassword}
            onChange={handleChange}
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-[#c3c9ef]">
          Confirm new password
          <input
            type="password"
            name="confirmPassword"
            value={formState.confirmPassword}
            onChange={handleChange}
            className="rounded-xl border border-transparent bg-[#111422] px-3 py-2 text-sm text-white focus:border-[#2b4bee] focus:outline-none"
          />
        </label>
        {error && <p className="text-sm text-[#ff7b9c]">{error}</p>}
        {complete && <p className="text-sm text-[#5bd8a2]">Password updated for demo 🎉</p>}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-semibold text-[#929bc9] transition hover:bg-[#1c233b]"
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded-full bg-[#2b4bee] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d5cff]"
          >
            Update password
          </button>
        </div>
      </form>
    </ModalShell>
  );
};

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, status, error, refreshProfile, updateProfile, updating, logout } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const joinDate = useMemo(() => formatJoinDate(user?.joinDate), [user?.joinDate]);
  const notifications = useMemo(
    () => ({ ...DEFAULT_NOTIFICATION_PREFS, ...(user?.notifications ?? {}) }),
    [user?.notifications],
  );

  const handleEditSave = (updates) => updateProfile(updates);

  const handleToggleNotification = useCallback(
    (key) => {
      const next = { ...notifications, [key]: !notifications[key] };
      updateProfile({ notifications: next });
    },
    [notifications, updateProfile],
  );

  const handleLogout = () => {
    logout();
    navigate('/login-signup');
  };

  const accountItems = [
    { label: 'Edit Profile', action: () => setShowEditModal(true) },
    { label: 'Change Password', action: () => setShowPasswordModal(true) },
    { label: 'Notifications', to: '#notifications' },
    { label: 'Logout', action: handleLogout, tone: 'danger' },
  ];

  const supportItems = [
    { label: 'Help Center', to: '#help' },
    { label: 'Contact Us', to: '#contact' },
  ];

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#111422]"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-12 shrink-0 items-center justify-center rounded-full text-white hover:bg-[#1c233b]"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </button>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Profile</h2>
        </div>
        {status === 'loading' && <LoadingState />}
        {status === 'error' && <ErrorState onRetry={refreshProfile} />}
        {status === 'logged-out' && (
          <div className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <p className="max-w-md text-sm text-[#929bc9]">
              You have been signed out for this demo. Restore the sample profile to continue exploring account settings.
            </p>
            <button
              type="button"
              onClick={refreshProfile}
              className="rounded-full bg-[#2b4bee] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#3d5cff]"
            >
              Restore profile
            </button>
          </div>
        )}
        {status === 'ready' && user && (
          <>
            <div className="@container flex p-4">
              <div className="flex w-full flex-col items-center gap-4">
                <div className="flex flex-col items-center gap-4">
                  <Avatar url={user.avatarUrl} name={user.name} />
                  <div className="flex flex-col items-center justify-center gap-1 text-center">
                    <p className="text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">{user.name}</p>
                    <p className="text-base font-normal leading-normal text-[#929bc9]">{user.role || 'Role unavailable'}</p>
                    <p className="text-sm font-normal leading-normal text-[#5b6287]">Joined {joinDate}</p>
                  </div>
                  {user.bio && (
                    <p className="max-w-md text-center text-sm leading-relaxed text-[#c3c9ef]">{user.bio}</p>
                  )}
                </div>
              </div>
            </div>
            <section className="mt-2">
              <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">Account</h3>
              <div className="divide-y divide-[#232948] border-y border-[#232948]">
                {accountItems.map((item) => (
                  <MenuRow
                    key={item.label}
                    label={item.label}
                    onClick={item.action}
                    to={item.to}
                    tone={item.tone}
                  />
                ))}
              </div>
            </section>
            <section id="notifications" className="mt-6 px-4">
              <div className="rounded-3xl border border-[#232948] bg-[#161b2d] p-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">Notifications</h3>
                  <p className="text-sm text-[#929bc9]">
                    Control which updates you receive about concept testing progress.
                  </p>
                </div>
                <div className="mt-4 flex flex-col gap-3">
                  <NotificationToggle
                    label="Research updates"
                    description="Alerts when new respondent feedback is ready to review."
                    value={notifications.researchUpdates}
                    onChange={() => handleToggleNotification('researchUpdates')}
                    disabled={updating}
                  />
                  <NotificationToggle
                    label="Weekly digest"
                    description="Summary email with highlights from all active concepts."
                    value={notifications.weeklyDigest}
                    onChange={() => handleToggleNotification('weeklyDigest')}
                    disabled={updating}
                  />
                  <NotificationToggle
                    label="New feedback in my projects"
                    description="Pings when stakeholders leave comments on your briefs."
                    value={notifications.newFeedback}
                    onChange={() => handleToggleNotification('newFeedback')}
                    disabled={updating}
                  />
                </div>
              </div>
            </section>
            <section className="mt-6">
              <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">Support</h3>
              <div className="divide-y divide-[#232948] border-y border-[#232948]">
                {supportItems.map((item) => (
                  <MenuRow key={item.label} label={item.label} to={item.to} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          {[
            { label: 'Submit', active: false },
            { label: 'Dashboard', active: false },
            { label: 'Reports', active: false },
            { label: 'Profile', active: true },
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
                {item.label === 'Submit' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
                  </svg>
                )}
                {item.label === 'Dashboard' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
                  </svg>
                )}
                {item.label === 'Reports' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                  </svg>
                )}
                {item.label === 'Profile' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M230.93,220a8,8,0,0,1-6.93,4H32a8,8,0,0,1-6.92-12c15.23-26.33,38.7-45.21,66.09-54.16a72,72,0,1,1,73.66,0c27.39,8.95,50.86,27.83,66.09,54.16A8,8,0,0,1,230.93,220Z" />
                  </svg>
                )}
              </div>
              <p className={`text-xs font-medium leading-normal tracking-[0.015em] ${item.active ? 'text-white' : 'text-[#929bc9]'}`}>
                {item.label}
              </p>
            </a>
          ))}
        </div>
        <div className="h-5 bg-[#191e33]" />
      </div>

      {showEditModal && user && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={handleEditSave}
          isSubmitting={updating}
        />
      )}
      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
    </div>
  );
};

export default UserProfile;
