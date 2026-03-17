function AboutPage(){
    return(
        <div className="space-y-6">
            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h1 className="card-title text-3xl">About This Project</h1>
                    <p>
                        Personally Identifiable Information (PII) is a simple privacy enhancing application that detects 
                        and redacts common personal Information from the text.
                    </p>
                    <p>
                        It was built for my intro to personal cyber security. To demonstrate privacy concepts such as data minimization,
                        de-identification, and privacy by design.
                    </p>
                </div>
            </section>

            <section className="card bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">What the program detects</h2>
                    <ul className="list-disc pl-6">
                        <li>Email Addresses</li>
                        <li>Phone Numbers</li>
                        <li>Social Security Numbers</li>
                        <li>Credit Card Patterns</li>
                        <li>IPv4 Addresses</li>
                    </ul>
                </div>
            </section>

            <section className="card card-side bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title">Important Note</h2>
                    <p>
                        This is an educational project. It is useful as first layer of defense,
                        but real privacy tools should include  stronger validation, better testing,
                        and context-aware detection.
                    </p>
                </div>
            </section>
        </div>
    )
}

export default AboutPage;