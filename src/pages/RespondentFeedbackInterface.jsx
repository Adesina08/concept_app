import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { submitDecision, uploadFeedbackAudio } from '../api/responses.js';

const TOAST_DURATION_MS = 4000;

const RespondentFeedbackInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const [isRecording, setIsRecording] = useState(false);
  const [isUploadingAudio, setIsUploadingAudio] = useState(false);
  const [isSubmittingDecision, setIsSubmittingDecision] = useState(false);
  const [lastDecision, setLastDecision] = useState(null);
  const [toasts, setToasts] = useState([]);

  const concept = useMemo(
    () => ({
      id: 'concept-1',
      title: 'Concept A',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCu8WRdg--pujbLZwGqB6tD0qIHCokf8E21vD-NJ-V_y2NnbAhEjf3XV5T4GfiS-YWqYoIt4vcZjEIKFWDmKpAgBTy62IB43ITRMPdfcY-vkRoLAsEk0cTkn-cc12ACf645AQD31wfPkLNhnG7B9ZMyJk9_VP7WmSH7AIdmcO6ghqh5vB1ei6ju9A1WdMQaF5InEaFW8r9XLsDTxdJLXNu_9fZXaKO9Eyhuntmvcf_zbo7CZLRpc2ftJe-FpBh9qzEN8hU4phPt8DhE',
    }),
    []
  );

  const showToast = (type, message) => {
    const id = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, TOAST_DURATION_MS);
  };

  useEffect(() => () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    mediaRecorderRef.current = null;
  }, []);

  const handleDecision = async (decision) => {
    if (isSubmittingDecision || isRecording || isUploadingAudio) {
      return;
    }

    try {
      setIsSubmittingDecision(true);
      await submitDecision({ conceptId: concept.id, decision });
      setLastDecision(decision);
      showToast('success', `You marked this concept as a ${decision}.`);
      window.dispatchEvent(new CustomEvent('respondent:updated'));
    } catch (error) {
      showToast('error', error.message || 'Unable to submit your decision.');
    } finally {
      setIsSubmittingDecision(false);
    }
  };

  const startRecording = async () => {
    if (isRecording || isSubmittingDecision || isUploadingAudio) {
      return;
    }

    try {
      if (!navigator?.mediaDevices?.getUserMedia) {
        showToast('error', 'Audio recording is not supported in this browser.');
        return;
      }
      if (typeof MediaRecorder === 'undefined') {
        showToast('error', 'Audio recorder is unavailable in this environment.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };
      recorder.onstop = async () => {
        setIsRecording(false);
        recorder.stream.getTracks().forEach((track) => track.stop());
        if (!chunksRef.current.length) {
          showToast('error', 'No audio captured. Please try recording again.');
          return;
        }

        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        try {
          setIsUploadingAudio(true);
          await uploadFeedbackAudio({ conceptId: concept.id, blob });
          showToast('success', 'Audio feedback uploaded successfully.');
          window.dispatchEvent(new CustomEvent('respondent:updated'));
        } catch (error) {
          showToast('error', error.message || 'Failed to upload audio feedback.');
        } finally {
          setIsUploadingAudio(false);
          chunksRef.current = [];
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      showToast('info', 'Recording started. Tap again to stop.');
    } catch (error) {
      showToast('error', 'Unable to access your microphone.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleRecordToggle = () => {
    if (isUploadingAudio) {
      return;
    }

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const navItems = [
    { label: 'Home', path: '/respondent-dashboard', active: location.pathname === '/respondent-dashboard' },
    {
      label: 'Explore',
      path: '/respondent-feedback',
      active: location.pathname === '/respondent-feedback',
    },
    { label: 'Add', path: '/respondent-feedback', active: false },
    { label: 'Archive', path: '/respondent-dashboard', active: false },
    { label: 'Profile', path: '/user-profile', active: location.pathname === '/user-profile' },
  ];

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between bg-[#111422] overflow-x-hidden"
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] p-4 pb-2">
          <div className="flex size-12 shrink-0 items-center text-white" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Concept Feedback</h2>
        </div>
        <div className="@container">
          <div className="@[480px]:px-4 @[480px]:py-3">
            <div
              className="min-h-80 flex w-full flex-col justify-end overflow-hidden bg-[#111422] bg-cover bg-center bg-no-repeat @[480px]:rounded-xl"
              style={{ backgroundImage: `url(${concept.image})` }}
            />
          </div>
        </div>
        <div className="px-4 pb-3 pt-1 text-center text-base font-normal leading-normal text-white">
          <p className="mb-2">Swipe left if you dislike the concept, swipe right if you like it.</p>
          {lastDecision && (
            <p className="text-sm text-[#929bc9]">Your last choice: {lastDecision}</p>
          )}
        </div>
        <div className="flex items-center justify-between gap-3 px-5 pb-5">
          <button
            type="button"
            onClick={() => handleDecision('dislike')}
            disabled={isSubmittingDecision || isRecording || isUploadingAudio}
            className={`flex h-14 flex-1 min-w-0 items-center justify-center gap-3 rounded-xl px-5 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${
              isSubmittingDecision || isRecording || isUploadingAudio
                ? 'cursor-not-allowed bg-[#1b213a] text-[#3f4a7a]'
                : 'bg-[#2f1c1f] text-[#ff8585] hover:bg-[#422629]'
            }`}
          >
            <span role="img" aria-label="thumbs down">
              👎
            </span>
            Dislike
          </button>
          <button
            type="button"
            onClick={handleRecordToggle}
            disabled={isSubmittingDecision || isUploadingAudio}
            className={`flex h-14 min-w-0 items-center justify-center gap-3 rounded-xl px-5 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${
              isRecording
                ? 'bg-[#ffb347] text-[#2f1c1f] hover:bg-[#ff9c1f]'
                : isUploadingAudio
                  ? 'cursor-not-allowed bg-[#1b213a] text-[#3f4a7a]'
                  : 'bg-[#2b4bee] text-white hover:bg-[#3c5cff]'
            }`}
          >
            <div className="text-current" data-icon="Microphone" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z" />
              </svg>
            </div>
            {isRecording ? 'Stop Recording' : isUploadingAudio ? 'Uploading…' : 'Record Feedback'}
          </button>
          <button
            type="button"
            onClick={() => handleDecision('like')}
            disabled={isSubmittingDecision || isRecording || isUploadingAudio}
            className={`flex h-14 flex-1 min-w-0 items-center justify-center gap-3 rounded-xl px-5 text-base font-bold leading-normal tracking-[0.015em] transition-colors ${
              isSubmittingDecision || isRecording || isUploadingAudio
                ? 'cursor-not-allowed bg-[#1b213a] text-[#3f4a7a]'
                : 'bg-[#1f2f2b] text-[#8affc1] hover:bg-[#2a3f39]'
            }`}
          >
            <span role="img" aria-label="thumbs up">
              👍
            </span>
            Like
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          {navItems.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              className={`just flex flex-1 flex-col items-center justify-end gap-1 ${
                item.active ? 'rounded-full text-white' : 'text-[#929bc9]'
              }`}
            >
              <div
                className={`${item.active ? 'text-white' : 'text-[#929bc9]'} flex h-8 items-center justify-center`}
                data-size="24px"
                data-weight={item.active ? 'fill' : 'regular'}
              >
                {item.label === 'Home' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z" />
                  </svg>
                )}
                {item.label === 'Explore' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z" />
                  </svg>
                )}
                {item.label === 'Add' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208Zm-32-80a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z" />
                  </svg>
                )}
                {item.label === 'Archive' && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                    <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,16V152h-28.7A15.86,15.86,0,0,0,168,156.69L148.69,176H107.31L88,156.69A15.86,15.86,0,0,0,76.69,152H48V48Zm0,160H48V168H76.69L96,187.31A15.86,15.86,0,0,0,107.31,192h41.38A15.86,15.86,0,0,0,160,187.31L179.31,168H208v40Z" />
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
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center gap-2 px-4 pt-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto w-full max-w-sm rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
              toast.type === 'success'
                ? 'bg-green-500/90 text-black'
                : toast.type === 'error'
                  ? 'bg-red-500/90 text-white'
                  : 'bg-[#2b4bee]/90 text-white'
            }`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RespondentFeedbackInterface;
