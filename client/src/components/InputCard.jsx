function InputCard({
    inputText,
    setInputText,
    strictMode,
    setStrictMode,
    onScrub,
    onReset,
    isLoading
}) {
    return(
        <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Input Data</h2>

                <p className="text-sm text-base-content/70">
                    Paste text with possible emails, phone numbers, SSNs(not your real one), credit card numbers,
                    or IPv4 addresses.
                </p>
                <textarea
                    className="textarea textarea-bordered min-h-80 w-full font-mono text-sm"
                    value={inputText}
                    onChange={(event) => setInputText(event.target.value)}
                    placeholder="Paste Text here..."
                 />

                 <label className="label cursor-pointer justify-start gap-3">
                    <input
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={strictMode}
                      onChange={(event) => setStrictMode(event.target.checked)}
                     />
                 </label>
                 <span className="label-text">Strict Mode</span>
                 <div className="card-actions justify-end">
                    <button type="button" className="btn btn-ghost" onClick={onReset}>
                        Reset
                    </button>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={onScrub}
                        disabled={isLoading} 
                    >
                        {isLoading ? "Scrubbing..." : "Scrub PII"}
                    </button>

                 </div>
            </div>
        </section>
    )
}

export default InputCard;