import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard.jsx';
import MetricList from '../components/MetricList.jsx';
import { fetchAdminMetrics, selectAdminConcepts, selectAdminMetricCards } from '../api/dashboard.js';

const AdminFeedbackDashboard = () => {
  const [state, setState] = useState({ loading: true, error: null, metrics: [], concepts: [] });

  useEffect(() => {
    let isMounted = true;

    fetchAdminMetrics()
      .then((response) => {
        if (!isMounted) return;
        setState({
          loading: false,
          error: null,
          metrics: selectAdminMetricCards(response),
          concepts: selectAdminConcepts(response),
        });
      })
      .catch(() => {
        if (!isMounted) return;
        setState((previous) => ({ ...previous, loading: false, error: 'Unable to load dashboard metrics.' }));
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const { loading, error, metrics, concepts } = state;

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#111422]"
      style={{ fontFamily: 'Manrope, "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
          <div className="text-white flex size-12 shrink-0 items-center" data-icon="List" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16Z M216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Admin Dashboard</h2>
        </div>
        {loading ? (
          <p className="px-4 py-6 text-sm font-medium text-[#929bc9]">Loading dashboard metrics…</p>
        ) : error ? (
          <p className="px-4 py-6 text-sm font-medium text-red-400">{error}</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-4 p-4">
              {metrics.map((card) => (
                <DashboardCard key={card.id} label={card.label} value={card.value} className="border-0 bg-[#232948]" />
              ))}
            </div>
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">All Concepts</h2>
            <MetricList
              items={concepts}
              itemClassName="flex min-h-[72px] items-center justify-between gap-4 bg-[#111422] px-4 py-2"
            />
          </>
        )}
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]" href="#">
            <div className="text-[#929bc9] flex h-8 items-center justify-center" data-icon="Plus" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-[#929bc9]">Submit</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-white" href="#">
            <div className="text-white flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-white">Dashboard</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]" href="#">
            <div className="text-[#929bc9] flex h-8 items-center justify-center" data-icon="PresentationChart" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-[#929bc9]">Reports</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]" href="#">
            <div className="text-[#929bc9] flex h-8 items-center justify-center" data-icon="User" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-[#929bc9]">Profile</p>
          </a>
        </div>
        <div className="h-5 bg-[#191e33]" />
      </div>
    </div>
  );
};

export default AdminFeedbackDashboard;
