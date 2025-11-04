import React, { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createConcept } from '../api/concepts';

const selectButtonSvg = "url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2724px%27 height=%2724px%27 fill=%27rgb(146,155,201)%27 viewBox=%270 0 256 256%27%3e%3cpath d=%27M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z%27%3e%3c/path%3e%3c/svg%3e')";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
const ALLOWED_FILE_TYPES = ['image/', 'video/', 'application/pdf'];

const AdminConceptSetup = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [audience, setAudience] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
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
    setAudience('');
    setFeedbackType('');
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

    if (!audience) {
      validationErrors.audience = 'Select a target audience.';
    }

    if (!feedbackType) {
      validationErrors.feedbackType = 'Choose a feedback type.';
    }

    if (!assets.length) {
      validationErrors.assets = 'Upload at least one asset.';
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
      await createConcept({
        title: title.trim(),
        description: description.trim(),
        audience,
        feedbackType,
        assets: assets.map(({ file }) => file),
      });

      setUploadProgress((prev) => ({
        ...prev,
        ...Object.fromEntries(assets.map(({ key }) => [key, 100])),
      }));

      resetForm();
      navigate('/admin/dashboard', { replace: true });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error?.message || 'Unable to push concept for feedback.',
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
      style={{ '--select-button-svg': selectButtonSvg, fontFamily: '"Space Grotesk", "Noto Sans", sans-serif' }}
    >
      <div>
        <div className="flex items-center justify-between bg-[#111422] px-4 pb-2 pt-4">
          <div className="text-white flex size-12 shrink-0 items-center" data-icon="X" data-size="24px" data-weight="regular">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z" />
            </svg>
          </div>
          <h2 className="flex-1 pr-12 text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">New Concept</h2>
        </div>
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
        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Assets</h2>
        <div className="flex flex-col gap-4 p-4">
          <div
            className="flex flex-col items-center gap-6 rounded-lg border-2 border-dashed border-[#323b67] px-6 py-14"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex max-w-[480px] flex-col items-center gap-2">
              <p className="max-w-[480px] text-center text-lg font-bold leading-tight tracking-[-0.015em] text-white">Upload Assets</p>
              <p className="max-w-[480px] text-center text-sm font-normal leading-normal text-white">
                Drag and drop or browse to upload images or videos.
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
        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Target Audience</h2>
        <div className="flex max-w-[480px] flex-wrap items-end gap-2 px-4 py-3">
          <label className="flex min-w-40 flex-1 flex-col">
            <select
              className="form-input flex h-14 w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg border-none bg-[#232948] bg-[image:var(--select-button-svg)] p-4 text-base font-normal leading-normal text-white placeholder:text-[#929bc9] focus:border-none focus:outline-0 focus:ring-0"
              value={audience}
              onChange={(event) => setAudience(event.target.value)}
              aria-invalid={Boolean(errors.audience)}
            >
              <option value="" disabled>
                Select audience
              </option>
              <option value="general">General Audience</option>
              <option value="early-adopters">Early Adopters</option>
              <option value="investors">Investors</option>
            </select>
          </label>
          {errors.audience && <p className="w-full text-sm font-medium text-red-400">{errors.audience}</p>}
        </div>
        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight tracking-[-0.015em] text-white">Feedback Type</h2>
        <div className="flex flex-wrap gap-3 p-4">
          {[
            { value: 'survey', label: 'Survey' },
            { value: 'ab-test', label: 'A/B Test' },
          ].map(({ value, label }) => (
            <label
              key={value}
              className="text-sm font-medium leading-normal relative flex h-11 cursor-pointer items-center justify-center rounded-lg border border-[#323b67] px-4 text-white has-[:checked]:border-[3px] has-[:checked]:border-[#2b4bee] has-[:checked]:px-3.5"
            >
              {label}
              <input
                type="radio"
                name="feedback-type"
                value={value}
                checked={feedbackType === value}
                onChange={(event) => setFeedbackType(event.target.value)}
                className="invisible absolute"
              />
            </label>
          ))}
          {errors.feedbackType && <p className="w-full text-sm font-medium text-red-400">{errors.feedbackType}</p>}
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
            <span className="truncate">{isSubmitting ? 'Submitting...' : 'Push for Feedback'}</span>
          </button>
        </div>
        <div className="h-5 bg-[#111422]" />
      </div>
    </form>
  );
};

export default AdminConceptSetup;
