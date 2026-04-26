function FooterNote() {
  return (
    <footer className="rounded-2xl border border-base-200 bg-base-100 p-5 shadow-sm anim-up d4">
      <div className="flex gap-3 items-start">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl mt-0.5"
             style={{ background: "var(--coral-lite, #F7E8E2)", color: "var(--coral)" }}>
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
            <path d="M8.5 2L1.5 14.5h14L8.5 2Z"
                  stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
                  fill="currentColor" fillOpacity="0.12"/>
            <path d="M8.5 7v3.5M8.5 12v.5"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-sm mb-1">Educational project</h3>
          <p className="text-sm text-base-content/55 leading-relaxed">
            This tool demonstrates privacy concepts like data minimization and deidentification
            using regex-based pattern matching. It's a solid first layer of defense, but not a
            replacement for professional PII detection systems that use context-aware NLP and
            stronger validation pipelines.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default FooterNote;