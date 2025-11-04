import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchRespondentAssignments, fetchRespondentProgress } from '../api/responses.js';

const RespondentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [progress, setProgress] = useState({ conceptsReviewed: 0, feedbackSubmissions: 0, pointsEarned: 0 });

  const navItems = useMemo(
    () => [
      { label: 'Concepts', path: '/respondent-feedback', active: location.pathname === '/respondent-feedback' },
      { label: 'Dashboard', path: '/respondent-dashboard', active: location.pathname === '/respondent-dashboard' },
      { label: 'Profile', path: '/user-profile', active: location.pathname === '/user-profile' },
    ],
    [location.pathname]
  );

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [assignmentsData, progressData] = await Promise.all([
        fetchRespondentAssignments(),
        fetchRespondentProgress(),
      ]);
      setAssignments(assignmentsData?.assignments ?? []);
      setProgress({
        conceptsReviewed: progressData?.conceptsReviewed ?? 0,
        feedbackSubmissions: progressData?.feedbackSubmissions ?? 0,
        pointsEarned: progressData?.pointsEarned ?? 0,
      });
    } catch (err) {
      setError(err.message || 'Failed to load dashboard data.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const handleRefresh = () => {
      loadData();
    };

    window.addEventListener('respondent:updated', handleRefresh);
    return () => {
      window.removeEventListener('respondent:updated', handleRefresh);
    };
  }, [loadData]);

  const pendingAssignments = assignments.filter((assignment) => assignment.status !== 'completed');

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <div className="flex size-12 shrink-0 items-center text-white" data-icon="List" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Dashboard</h2>
        </div>
        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Feedback Summary</h2>
        <div className="flex flex-wrap gap-4 p-4">
          {[
            { label: 'Concepts Reviewed', value: progress.conceptsReviewed },
            { label: 'Feedback Submissions', value: progress.feedbackSubmissions },
            { label: 'Points Earned', value: progress.pointsEarned },
          ].map((item) => (
            <div key={item.label} className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl bg-[#232948] p-6">
              <p className="text-base font-medium leading-normal text-white">{item.label}</p>
              <p className="text-2xl font-bold leading-tight text-white">{isLoading ? '—' : item.value}</p>
            </div>
          ))}
        </div>
        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Pending Feedback</h2>
        <div className="flex flex-col gap-2">
          {isLoading && (
            <div className="flex min-h-[72px] items-center justify-center bg-[#111422] px-4 py-6 text-sm text-[#929bc9]">
              Loading assignments…
            </div>
          )}
          {!isLoading && error && (
            <div className="flex min-h-[72px] items-center justify-center bg-[#111422] px-4 py-6 text-sm text-red-400">
              {error}
            </div>
          )}
          {!isLoading && !error && pendingAssignments.length === 0 && (
            <div className="flex min-h-[72px] items-center justify-center bg-[#111422] px-4 py-6 text-sm text-[#929bc9]">
              No pending assignments. Check back later!
            </div>
          )}
          {!isLoading && !error &&
            pendingAssignments.map((item) => (
              <div key={item.id ?? item.title} className="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2">
                <div
                  className="size-14 rounded-lg bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${item.imageUrl ?? ''})` }}
                />
                <div className="flex flex-col justify-center">
                  <p className="line-clamp-1 text-base font-medium leading-normal text-white">{item.title}</p>
                  <p className="line-clamp-2 text-sm font-normal leading-normal text-[#929bc9]">{item.dueLabel}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`just flex flex-1 flex-col items-center justify-end gap-1 ${
                item.active ? 'rounded-full text-white' : 'text-[#929bc9]'
              }`}
            >
              <div
                className={`${item.active ? 'text-white' : 'text-[#929bc9]'} flex h-8 items-center justify-center`}
                data-size="24px"
                data-weight={item.active ? 'fill' : 'regular'}
              >
                {item.label === 'Concepts' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z" />
                  </svg>
                )}
                {item.label === 'Dashboard' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
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
            </button>
          ))}
        </div>
        <div className="h-5 bg-[#191e33]" />
      </div>
    </div>
  );
};

export default RespondentDashboard;
