function FooterNote() {
    return(
        <footer className="mt-10 rounded-box bg-base-100 p-6 shadow">
            <h3 className="font-semibold">Educational Note</h3>
            <p className="mt-2 text-sm text-base-content/70">
                This project is an educational privacy artifact. It demonstrates data
                minimization and redaction using regex-based  pattern matching, but it is
                not a perfect a professional PII detection system. 
            </p>
        </footer>
    )
}

export default FooterNote;