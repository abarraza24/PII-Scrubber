function OutputCard({ result, errorMessage, copyMessage, onCopy, onDownload }) {
  return (
    <section className="card bg-base-100 card-lifted anim-up d1">
      <div className="card-body gap-4 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
               style={{ background: "var(--coral-lite, #F7E8E2)", color: "var(--coral)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 2h7.5L14 4.5V16H4V2Z"
                    stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
                    fill="currentColor" fillOpacity="0.12"/>
              <path d="M11.5 2v2.5H14" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M6.5 9h5M6.5 12h3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="card-title text-lg">Redacted Output</h2>
            <p className="text-xs text-base-content/45 font-sans font-normal">
              PII replaced with safe placeholders
            </p>
          </div>
          {result && (
            <div className="flex gap-2 shrink-0 anim-fade">
              <button
                type="button"
                className="btn btn-sm rounded-full gap-1.5 font-semibold text-white"
                style={{ background: "var(--coral)", borderColor: "transparent" }}
                onClick={onCopy}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="4.5" y="4.5" width="7" height="7" rx="1.5"
                        stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M8.5 4.5V3A1.5 1.5 0 007 1.5H3A1.5 1.5 0 001.5 3v4A1.5 1.5 0 003 8.5h1.5"
                        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span className="hidden sm:inline">Copy</span>
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline rounded-full gap-1.5"
                onClick={onDownload}
              >
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 1.5v7M3.5 6l3 3 3-3"
                        stroke="currentColor" strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.5 10.5v.5A1.5 1.5 0 003 12.5h7a1.5 1.5 0 001.5-1.5v-.5"
                        stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                <span className="hidden sm:inline">Save</span>
              </button>
            </div>
          )}
        </div>
        {copyMessage && (
          <div className="alert py-2.5 rounded-xl text-sm anim-fade"
               style={{ background: "rgba(34,160,107,0.12)", color: "#166534", border: "1px solid rgba(34,160,107,0.2)" }}>
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M5 7.5l2 2 3-3.5" stroke="currentColor" strokeWidth="1.3"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {copyMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-error py-2.5 rounded-xl text-sm anim-fade">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="6.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M7.5 5v4M7.5 10.5v.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            {errorMessage}
          </div>
        )}
        {!result && !errorMessage && (
          <div className="empty-dashed flex min-h-64 sm:min-h-72 flex-col
                          items-center justify-center gap-3 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl
                            bg-base-200 text-base-content/25">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 3L4 8v7c0 6.08 4.31 11.74 10 13 5.69-1.26 10-6.92 10-13V8L14 3Z"
                      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"
                      fill="currentColor" fillOpacity="0.08"/>
                <path d="M10 14l3 3 5-5.5" stroke="currentColor" strokeWidth="1.5"
                      strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="font-semibold text-base-content/35 text-sm">No output yet</p>
              <p className="text-xs text-base-content/25 mt-1 leading-relaxed">
                Paste text on the left<br/>and hit <strong>Scrub PII</strong>
              </p>
            </div>
          </div>
        )}
        {result && (
          <pre className="output-pre min-h-64 sm:min-h-72 overflow-auto whitespace-pre-wrap
                          rounded-xl bg-base-200/50 border border-base-300/40 p-4 anim-fade">
            {result.redactedText}
          </pre>
        )}
      </div>
    </section>
  );
}

export default OutputCard;