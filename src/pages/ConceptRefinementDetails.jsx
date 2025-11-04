import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import MetricList from '../components/MetricList.jsx';
import { fetchConceptDetails, selectConceptDetails } from '../api/dashboard.js';

const ConceptRefinementDetails = () => {
  const { conceptId = 'concept-a' } = useParams();
  const [state, setState] = useState({ loading: true, error: null, details: null });

  useEffect(() => {
    let isMounted = true;

    setState({ loading: true, error: null, details: null });
    fetchConceptDetails(conceptId)
      .then((response) => {
        if (!isMounted) return;
        setState({ loading: false, error: null, details: selectConceptDetails(response) });
      })
      .catch(() => {
        if (!isMounted) return;
        setState({ loading: false, error: 'Unable to load concept details.', details: null });
      });

    return () => {
      isMounted = false;
    };
  }, [conceptId]);

  const { loading, error, details } = state;

  const ratingMeta = useMemo(() => {
    if (!details) return { fullStars: 0, hasPartial: false };
    const ratingNumber = parseFloat(details.rating);
    const fullStars = Math.floor(ratingNumber);
    const hasPartial = ratingNumber - fullStars > 0;
    return { fullStars, hasPartial };
  }, [details]);

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
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Concept Analysis</h2>
        </div>
        {loading ? (
          <p className="px-4 py-6 text-sm font-medium text-[#929bc9]">Loading concept details…</p>
        ) : error ? (
          <p className="px-4 py-6 text-sm font-medium text-red-400">{error}</p>
        ) : details ? (
          <>
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Overall Assessment</h2>
            <div className="flex flex-wrap gap-x-8 gap-y-6 p-4">
              <div className="flex flex-col gap-2">
                <p className="text-4xl font-black leading-tight tracking-[-0.033em] text-white">{details.rating}</p>
                <div className="flex gap-0.5">
                  {Array.from({ length: ratingMeta.fullStars }).map((_, index) => (
                    <div key={`full-star-${index}`} className="text-[#2b4bee]" data-icon="Star" data-size="18px" data-weight="fill">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M234.5,114.38l-45.1,39.36,13.51,58.6a16,16,0,0,1-23.84,17.34l-51.11-31-51,31a16,16,0,0,1-23.84-17.34L66.61,153.8,21.5,114.38a16,16,0,0,1,9.11-28.06l59.46-5.15,23.21-55.36a15.95,15.95,0,0,1,29.44,0h0L166,81.17l59.44,5.15a16,16,0,0,1,9.11,28.06Z" />
                      </svg>
                    </div>
                  ))}
                  {ratingMeta.hasPartial ? (
                    <div className="text-[#2b4bee]" data-icon="Star" data-size="18px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M239.2,97.29a16,16,0,0,0-13.81-11L166,81.17,142.72,25.81h0a15.95,15.95,0,0,0-29.44,0L90.07,81.17,30.61,86.32a16,16,0,0,0-9.11,28.06L66.61,153.8,53.09,212.34a16,16,0,0,0,23.84,17.34l51-31,51.11,31a16,16,0,0,0,23.84-17.34l-13.51-58.6,45.1-39.36A16,16,0,0,0,239.2,97.29Zm-15.22,5-45.1,39.36a16,16,0,0,0-5.08,15.71L187.35,216v0l-51.07-31a15.9,15.9,0,0,0-16.54,0l-51,31h0L82.2,157.4a16,16,0,0,0-5.08-15.71L32,102.35a.37.37,0,0,1,0-.09l59.44-5.14a16,16,0,0,0,13.35-9.75L128,32.08l23.2,55.29a16,16,0,0,0,13.35,9.75L224,102.26S224,102.32,224,102.33Z" />
                      </svg>
                    </div>
                  ) : null}
                </div>
                <p className="text-base font-normal leading-normal text-white">{details.reviews} reviews</p>
              </div>
              <div className="grid min-w-[200px] max-w-[400px] flex-1 grid-cols-[20px_1fr_40px] items-center gap-y-3">
                {details.ratingDistribution.map((item) => (
                  <React.Fragment key={item.label}>
                    <p className="text-sm font-normal leading-normal text-white">{item.label}</p>
                    <div className="flex h-2 flex-1 overflow-hidden rounded-full bg-[#323b67]">
                      <div className="rounded-full bg-[#2b4bee]" style={{ width: `${item.rawPercentage}%` }} />
                    </div>
                    <p className="text-right text-sm font-normal leading-normal text-[#929bc9]">{item.percentage}</p>
                  </React.Fragment>
                ))}
              </div>
            </div>
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Strengths</h2>
            <MetricList
              items={details.strengths.map((item, index) => ({ ...item, id: `strength-${index}` }))}
              itemClassName="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2"
            />
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Weaknesses</h2>
            <MetricList
              items={details.weaknesses.map((item, index) => ({ ...item, id: `weakness-${index}` }))}
              itemClassName="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2"
            />
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Improvement Areas</h2>
            <MetricList
              items={details.improvements.map((item, index) => ({ ...item, id: `improvement-${index}` }))}
              itemClassName="flex min-h-[72px] items-center gap-4 bg-[#111422] px-4 py-2"
            />
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">AI Revision Suggestions</h2>
            <p className="px-4 pb-3 pt-1 text-base font-normal leading-normal text-white">
              Based on the analysis, the AI suggests the following revisions:
            </p>
            <MetricList
              items={details.revisionSuggestions.map((suggestion, index) => ({
                id: `suggestion-${index}`,
                title: suggestion,
                icon: 'plus',
              }))}
              itemClassName="flex min-h-14 items-center gap-4 bg-[#111422] px-4"
              leadingClassName="text-white flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#232948]"
            />
          </>
        ) : null}
      </div>
      <div>
        <div className="flex justify-stretch">
          <div className="flex flex-1 flex-wrap justify-between gap-3 px-4 py-3">
            <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#232948] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
              <span className="truncate">Reject Revisions</span>
            </button>
            <button className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b4bee] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white">
              <span className="truncate">Apply Revisions</span>
            </button>
          </div>
        </div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          {[{ label: 'Submit', iconWeight: 'fill', active: true }, { label: 'Dashboard', iconWeight: 'regular' }, { label: 'Reports', iconWeight: 'regular' }, { label: 'Profile', iconWeight: 'regular' }].map((item) => {
            const iconColor = item.active ? 'text-white' : 'text-[#929bc9]';
            const containerClasses = item.active
              ? 'just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-white'
              : 'just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]';
            return (
              <a key={item.label} className={containerClasses} href="#">
                <div className={`${iconColor} flex h-8 items-center justify-center`} data-icon={item.label} data-size="24px" data-weight={item.iconWeight}>
                  {item.label === 'Submit' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
                    </svg>
                  )}
                  {item.label === 'Dashboard' && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
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

export default ConceptRefinementDetails;
