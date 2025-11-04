import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetricList from '../components/MetricList.jsx';
import { fetchFinalReport, selectFinalReport } from '../api/dashboard.js';

const FinalReportInsights = () => {
  const { conceptId = 'concept-a' } = useParams();
  const [state, setState] = useState({ loading: true, error: null, report: null });

  useEffect(() => {
    let isMounted = true;

    setState({ loading: true, error: null, report: null });
    fetchFinalReport(conceptId)
      .then((response) => {
        if (!isMounted) return;
        setState({ loading: false, error: null, report: selectFinalReport(response) });
      })
      .catch(() => {
        if (!isMounted) return;
        setState({ loading: false, error: 'Unable to load final report.', report: null });
      });

    return () => {
      isMounted = false;
    };
  }, [conceptId]);

  const { loading, error, report } = state;
  const topConcept = report?.topConcept;
  const keyInsights = report?.keyInsights ?? [];
  const download = report?.downloads?.[0];

  return (
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
        {loading ? (
          <p className="px-4 py-6 text-sm font-medium text-[#929bc9]">Loading final report…</p>
        ) : error ? (
          <p className="px-4 py-6 text-sm font-medium text-red-400">{error}</p>
        ) : (
          <>
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Top Concept</h2>
            {topConcept ? (
              <div className="p-4 @container">
                <div className="flex flex-col items-stretch justify-start rounded-lg @xl:flex-row @xl:items-start">
                  <div
                    className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('${topConcept.image}')` }}
                  />
                  <div className="flex w-full min-w-72 grow flex-col items-stretch justify-center gap-1 py-4 @xl:px-4">
                    <p className="text-lg font-bold leading-tight tracking-[-0.015em] text-white">{topConcept.title}</p>
                    <div className="flex items-end justify-between gap-3">
                      <p className="text-base font-normal leading-normal text-[#929bc9]">{topConcept.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Key Insights</h2>
            <MetricList
              items={keyInsights.map((insight) => ({
                ...insight,
                subtitle: insight.value,
                iconBackground: 'bg-[#232948]',
              }))}
              itemClassName="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2"
            />
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Download Summary</h2>
            <div className="flex justify-start px-4 py-3">
              {download ? (
                <a
                  href={download.href}
                  className="flex h-10 min-w-[84px] max-w-[480px] items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#232948] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white"
                >
                  <div className="text-white" data-icon="DownloadSimple" data-size="20px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M224,152v56a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V152a8,8,0,0,1,16,0v56H208V152a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,132.69V40a8,8,0,0,0-16,0v92.69L93.66,106.34a8,8,0,0,0-11.32,11.32Z" />
                    </svg>
                  </div>
                  <span className="truncate">{download.label}</span>
                </a>
              ) : null}
            </div>
          </>
        )}
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
};

export default FinalReportInsights;
