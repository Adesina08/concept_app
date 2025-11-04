import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitConcept } from '../api/concepts';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['image/', 'video/', 'application/pdf'];

const ClientConceptSubmission = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assets, setAssets] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const makeFileKey = (file) => `${file.name}-${file.lastModified}-${Math.random().toString(36).slice(2, 11)}`;

  const handleFiles = (files) => {
    if (!files?.length) {
      return;
    }

    const newAssets = Array.from(files).map((file) => ({
      file,
      key: makeFileKey(file),
    }));

    setAssets((prev) => [...prev, ...newAssets]);
    setUploadProgress((prev) => ({
      ...prev,
      ...Object.fromEntries(newAssets.map((asset) => [asset.key, 0])),
    }));
  };

  const handleFileChange = (event) => {
    handleFiles(event.target.files);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    handleFiles(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setAssets([]);
    setUploadProgress({});
    setErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validate = () => {
    const validationErrors = {};

    if (!title.trim()) {
      validationErrors.title = 'Concept title is required.';
    }

    if (!description.trim()) {
      validationErrors.description = 'Concept description is required.';
    }

    if (!assets.length) {
      validationErrors.assets = 'Upload at least one supporting asset.';
    } else {
      const invalidType = assets.find(({ file }) => !ALLOWED_FILE_TYPES.some((type) => file.type.startsWith(type)));
      if (invalidType) {
        validationErrors.assets = 'One or more files have an unsupported type.';
      }

      const oversized = assets.find(({ file }) => file.size > MAX_FILE_SIZE);
      if (oversized) {
        validationErrors.assets = `File "${oversized.file.name}" exceeds the 10 MB limit.`;
      }
    }

    return validationErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    setUploadProgress((prev) => ({
      ...prev,
      ...Object.fromEntries(assets.map(({ key }) => [key, 25])),
    }));

    try {
      await submitConcept({
        title: title.trim(),
        description: description.trim(),
        assets: assets.map(({ file }) => file),
      });

      setUploadProgress((prev) => ({
        ...prev,
        ...Object.fromEntries(assets.map(({ key }) => [key, 100])),
      }));

      resetForm();
      navigate('/client/dashboard', { replace: true });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error?.message || 'Unable to submit concept right now.',
      }));
      setUploadProgress((prev) => ({
        ...prev,
        ...Object.fromEntries(assets.map(({ key }) => [key, 0])),
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasAssets = assets.length > 0;

  const renderFileProgress = useMemo(
    () =>
      assets.map(({ file, key }) => {
        const progress = uploadProgress[key] ?? 0;
        return (
          <div key={key} className="w-full text-white">
            <div className="flex items-center justify-between text-sm leading-tight">
              <span className="truncate" title={file.name}>
                {file.name}
              </span>
              <span>{progress}%</span>
            </div>
            <div className="mt-1 h-2 w-full rounded-full bg-[#232948]">
              <div
                className="h-2 rounded-full bg-[#2b4bee] transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      }),
    [assets, uploadProgress],
  );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-[#111422]"
      style={{ fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
          <div className="text-white flex size-12 shrink-0 items-center" data-icon="ArrowLeft" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Submit</h2>
        </div>
        <h1 className="px-4 pb-3 pt-5 text-left text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Submit your concept</h1>
        <div className="flex max-w-[480px] flex-wrap items-end gap-2 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <input
              placeholder="Concept Title"
              className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              aria-invalid={Boolean(errors.title)}
            />
          </label>
          {errors.title && <p className="w-full text-sm font-medium text-red-400">{errors.title}</p>}
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-2 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <textarea
              placeholder="Concept Description"
              className="form-input flex min-h-36 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              aria-invalid={Boolean(errors.description)}
            />
          </label>
          {errors.description && <p className="w-full text-sm font-medium text-red-400">{errors.description}</p>}
        </div>
        <h3 className="px-4 pb-2 pt-4 text-lg font-bold leading-tight tracking-[-0.015em] text-white">Upload Assets</h3>
        <div className="flex flex-col gap-4 p-4">
          <div
            className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#323b67] px-6 py-14"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="max-w-[480px] text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Drag and drop or browse</p>
              <p className="max-w-[480px] text-center text-sm font-normal leading-normal text-white">
                Upload images, documents, or other files related to your concept.
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept={ALLOWED_FILE_TYPES.map((type) => `${type === 'application/pdf' ? '.pdf' : `${type}*`}`).join(',')}
              className="hidden"
              onChange={handleFileChange}
            />
            <button
              type="button"
              onClick={handleBrowseClick}
              className="flex h-10 min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#232948] px-4 text-sm font-bold leading-normal tracking-[0.015em] text-white hover:bg-[#2b4bee]"
            >
              <span className="truncate">Browse Files</span>
            </button>
            {hasAssets && <div className="flex w-full flex-col gap-3">{renderFileProgress}</div>}
          </div>
          {errors.assets && <p className="text-sm font-medium text-red-400">{errors.assets}</p>}
        </div>
      </div>
      <div>
        {errors.submit && (
          <div className="px-4 pb-2">
            <p className="rounded-lg bg-red-500/10 p-3 text-sm font-medium text-red-300">{errors.submit}</p>
          </div>
        )}
        <div className="flex px-4 py-3">
          <button
            type="submit"
            className="flex h-12 min-w-[84px] flex-1 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-[#2b4bee] px-5 text-base font-bold leading-normal tracking-[0.015em] text-white disabled:cursor-not-allowed disabled:opacity-50"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            <span className="truncate">{isSubmitting ? 'Submitting...' : 'Submit'}</span>
          </button>
        </div>
        <div className="flex gap-2 border-t border-[#232948] bg-[#191e33] px-4 pb-3 pt-2">
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 rounded-full text-white" href="#">
            <div className="text-white flex h-8 items-center justify-center" data-icon="Plus" data-size="24px" data-weight="fill">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-white">Submit</p>
          </a>
          <a className="just flex flex-1 flex-col items-center justify-end gap-1 text-[#929bc9]" href="#">
            <div className="text-[#929bc9] flex h-8 items-center justify-center" data-icon="House" data-size="24px" data-weight="regular">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z" />
              </svg>
            </div>
            <p className="text-xs font-medium leading-normal tracking-[0.015em] text-[#929bc9]">Dashboard</p>
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
    </form>
  );
};

export default ClientConceptSubmission;
