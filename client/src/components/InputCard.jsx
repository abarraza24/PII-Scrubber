function InputCard({
  inputText, setInputText,
  strictMode, setStrictMode,
  onScrub, onReset, isLoading,
}) {
  return (
    <section className="card bg-base-100 card-lifted anim-up">
      <div className="card-body gap-4 p-6">

        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: "var(--navy)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <rect x="2" y="3" width="14" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="8" width="10" height="2" rx="1" fill="currentColor" />
              <rect x="2" y="13" width="12" height="2" rx="1" fill="currentColor" />
            </svg>
          </div>
          <div>
            <h2 className="card-title text-lg">Input Text</h2>
            <p className="text-xs text-base-content/45 font-sans font-normal">
              Paste text containing personal data
            </p>
          </div>
          <div className="ml-auto font-mono text-xs text-base-content/30">
            {inputText.length.toLocaleString()} chars
          </div>
        </div>
        <textarea
          className="textarea textarea-bordered w-full min-h-64 sm:min-h-72
                     font-mono text-sm leading-relaxed resize-none rounded-xl
                     focus:outline-none focus:border-primary/50 transition-colors"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste text here… emails, phones, SSNs, credit cards, IPs."
          spellCheck={false}
        />
        <label
          className="flex cursor-pointer items-start gap-3 rounded-xl
                     border border-base-200 bg-base-200/50
                     px-4 py-3 hover:bg-base-200/80 transition-colors"
        >
          <input
            type="checkbox"
            className="toggle toggle-sm mt-0.5"
            style={{ "--tglbg": "var(--coral)" }}
            checked={strictMode}
            onChange={(e) => setStrictMode(e.target.checked)}
          />
          <div>
            <div className="text-sm font-semibold leading-none mb-1">Strict Mode</div>
            <div className="text-xs text-base-content/50 leading-relaxed">
              Hides even more e.g.{" "}
              <code className="font-mono bg-base-300/60 px-1 rounded">***@domain.com</code>{" "}
              vs{" "}
              <code className="font-mono bg-base-300/60 px-1 rounded">al***@domain.com</code>
            </div>
          </div>
        </label>
        <div className="flex items-center justify-between pt-1 gap-3">
          <button
            type="button"
            className="btn btn-sm btn-ghost rounded-full text-base-content/50
                       hover:text-base-content gap-1.5"
            onClick={onReset}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2 6.5a4.5 4.5 0 104.5-4.5H4M4 2L2 4l2 2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reset
          </button>

          <button
            type="button"
            className="btn btn-scrub rounded-full px-6 gap-2 font-semibold
                       text-white shadow-sm flex-1 sm:flex-none sm:min-w-35"
            style={{
              background: isLoading || !inputText.trim()
                ? undefined
                : "var(--navy)",
              borderColor: "transparent",
            }}
            onClick={onScrub}
            disabled={isLoading || !inputText.trim()}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Scrubbing…
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M2 12L5.5 8.5M5.5 8.5L10 4M5.5 8.5L4 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="11" cy="3" r="2" fill="currentColor" />
                </svg>
                Scrub PII
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}

export default InputCard;