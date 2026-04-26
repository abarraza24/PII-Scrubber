const TYPE_META = {
  EMAIL:{ label: "Email",  emoji: "✉" },
  PHONE:{ label: "Phone",  emoji: "📞" },
  SSN:{label: "SSN",    emoji: "🪪" },
  CREDIT_CARD:{ label: "Card",   emoji: "💳" },
  IPV4:{ label: "IPv4",   emoji: "🌐" },
};

function FindingsTable({ findings }) {
  if (!findings?.length) return null;

  return (
    <section className="card bg-base-100 card-lifted anim-up d3">
      <div className="card-body gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
               style={{ background: "var(--coral-lite, #F7E8E2)", color: "var(--coral)" }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 5h14M2 9h10M2 13h12" stroke="currentColor"
                    strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="card-title text-lg">Detection Report</h2>
            <p className="text-xs text-base-content/45 font-sans font-normal">
              Every match original value and how it was redacted
            </p>
          </div>
          <span className="badge badge-sm rounded-full font-mono shrink-0"
                style={{ background: "var(--navy)", color: "#fff", border: "none" }}>
            {findings.length} {findings.length === 1 ? "item" : "items"}
          </span>
        </div>
        <div className="overflow-x-auto -mx-1 rounded-xl border border-base-200">
          <table className="table table-sm w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-base-content/40 bg-base-200/50">
                <th className="w-10 text-center rounded-tl-xl">#</th>
                <th className="w-28 sm:w-36">Type</th>
                <th>Original</th>
                <th>Redacted</th>
              </tr>
            </thead>
            <tbody>
              {findings.map((f, i) => {
                const meta = TYPE_META[f.type] ?? { label: f.type, emoji: "?" };
                return (
                  <tr
                    key={`${f.type}-${i}`}
                    className="finding-row hover:bg-base-200/40 transition-colors border-base-200/50"
                  >
                    <td className="text-center text-xs text-base-content/30 font-mono">{i + 1}</td>
                    <td>
                      <span className={`badge badge-sm rounded-full gap-1 font-medium badge-${f.type}`}>
                        <span className="text-xs leading-none">{meta.emoji}</span>
                        {meta.label}
                      </span>
                    </td>
                    <td className="font-mono text-xs text-base-content/60 break-all max-w-35 sm:max-w-50">
                      {f.original}
                    </td>
                    <td className="font-mono text-xs break-all max-w-35 sm:max-w-50 font-medium"
                        style={{ color: "var(--coral)" }}>
                      {f.redacted}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default FindingsTable;