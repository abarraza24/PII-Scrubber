function FindingsTable({findings}){
    return(
        <section className="card mt-8 bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">Detection Report</h2>

                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Original Match</th>
                                <th>Redacted Output</th>
                            </tr>
                        </thead>
                        <tbody>
                            {findings.map((finding, index)=>(
                                <tr key={`${finding.type}-${index}`}>
                                    <td>
                                        <span className="badge badge-outline">{finding.original}</span>
                                    </td>
                                    <td className="break-all font-mono text-sm">{finding.original}</td>
                                    <td className="break-all font-mono text-sm">{finding.redacted}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default FindingsTable;