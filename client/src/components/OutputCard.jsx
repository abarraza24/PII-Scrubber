function OutputCard({
    result,
    errorMessage,
    copyMessage,
    onCopy,
    onDownload
}){
    return(
        <section className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <div className="flex items-center justify-between gap-2">
                    <h2 className="card-title">Redacted Output</h2>
                    {result && (
                        <div className="flex gap-2">
                            <button type="button" className="btn btn-sm btn-outline " onClick={onCopy}>
                                Copy
                            </button>
                            <button type="button" className="btn btn-sm btn-secondary" onClick={onDownload}>
                                Download
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {copyMessage && <div className="alert alert-success"><span>{copyMessage}</span></div>}
            {errorMessage && <div className="alert alert-error"><span>{errorMessage}</span></div>}

            {!result && !errorMessage && (
                <div className="flex min-h-80 items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-200 p-6 text-center text-base-content/60">
                    Run the scrubber to  see redacted text and the detection report
                </div>
            )}

            {result && (
                <pre className="min-h-80 overflow-auto whitespace-pre-wrap rounded-xl bg-neutral p-4 font-mono text-sm text-neutral-content">
                    {result.redactedText}
                </pre>
            )}
        </section>
    );
}

export default OutputCard;