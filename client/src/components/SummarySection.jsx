function SummarySection({summary, riskScore, totalFindings}){
    const summaryEntries = Object.entries(summary ?? {});
    return(
        <section className="mt-8">
            <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
                <div className="stat rounded-box bg-base-100 shadow">
                    <div className="stat-title">Total Findings</div>
                    <div className="stat-value text-primary">{totalFindings}</div>
                </div>

                <div className="stat rounded-box bg-base-100 shadow">
                    <div className="stat-title">Risk Score</div>
                    <div className="stat-value text-secondary">{riskScore}</div>
                </div>

                {summaryEntries.map(([type, count]) =>{
                    <div key={type} className="stat rounded-bx bg-base-100 shadow">
                        <div className="stat-title">{type}</div> 
                        <div className="stat-value text-accent">{count}</div> 
                    </div>
                    
                })}
            </div>
        </section>
    );
}

export default SummarySection;