const TYPE_META = {
  EMAIL:{ emoji: "✉",  label: "Email" },
  PHONE:{ emoji: "📞", label: "Phone" },
  SSN:{ emoji: "🪪", label: "SSN" },
  CREDIT_CARD:{ emoji: "💳", label: "Card" },
  IPV4:{ emoji: "🌐", label: "IPv4" },
};

function RiskRing({ score }) {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const filled = Math.min(score / 100, 1) * circ;

  const riskClass = score <= 30 ? "risk-low" : score <= 65 ? "risk-medium" : "risk-high";
  const riskColor = score <= 30 ? "#22a06b" : score <= 65 ? "#d97706" : "#E8572A";
  const riskLabel = score <= 30 ? "Low" : score <= 65 ? "Medium" : "High";
  const accentBorder = score > 65 ? "var(--coral)" : "var(--navy)";

  return (
    <div
      className={`stat rounded-2xl bg-base-100 shadow-sm border border-base-200 anim-scale ${riskClass}`}
      style={{ borderTop: `3px solid ${accentBorder}` }}
    >
      <div className="stat-title text-xs font-semibold uppercase tracking-wider opacity-55">
        Risk Score
      </div>
      <div className="flex items-center gap-4 mt-2">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r={r} fill="none"
                  stroke="currentColor" strokeOpacity="0.1" strokeWidth="7"/>
          <circle cx="36" cy="36" r={r} fill="none"
                  stroke={riskColor} strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={`${filled} ${circ}`}
                  strokeDashoffset={circ * 0.25}
                  style={{ transition: "stroke-dasharray 0.7s cubic-bezier(0.22,1,0.36,1)" }}/>
          <text x="36" y="40" textAnchor="middle" fontSize="15" fontWeight="700"
                fontFamily="Fraunces, Georgia, serif" fill={riskColor}>
            {score}
          </text>
        </svg>
        <div>
          <div className="text-xl font-bold leading-none" style={{ color: riskColor, fontFamily: "'Fraunces', Georgia, serif" }}>
            {riskLabel}
          </div>
          <div className="text-xs text-base-content/45 mt-1">privacy risk</div>
        </div>
      </div>
    </div>
  );
}

function SummarySection({ summary, riskScore, totalFindings }) {
  const entries = Object.entries(summary ?? {});

  return (
    <section className="anim-up d2">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="text-xl" style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700 }}>
          Summary
        </h2>
        <span className="badge badge-sm rounded-full font-mono font-medium"
              style={{ background: "var(--navy)", color: "#fff", border: "none" }}>
          {totalFindings} found
        </span>
      </div>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        <RiskRing score={riskScore} />

        <div className="stat rounded-2xl bg-base-100 shadow-sm border border-base-200 anim-scale d1"
             style={{ borderTop: "3px solid var(--navy)" }}>
          <div className="stat-title text-xs font-semibold uppercase tracking-wider opacity-55">
            Total
          </div>
          <div className="stat-value text-3xl mt-1" style={{ color: "var(--navy)", fontFamily: "'Fraunces', Georgia, serif" }}>
            {totalFindings}
          </div>
          <div className="stat-desc mt-0.5">detected</div>
        </div>

        {entries.map(([type, count], i) => {
          const meta = TYPE_META[type] ?? { emoji: "?", label: type };
          return (
            <div
              key={type}
              className="stat rounded-2xl bg-base-100 shadow-sm border border-base-200 anim-scale"
              style={{
                animationDelay: `${0.08 + i * 0.05}s`,
                borderTop: "3px solid var(--coral)",
              }}
            >
              <div className="stat-title text-xs font-semibold uppercase tracking-wider opacity-55">
                {meta.label}
              </div>
              <div className="flex items-end gap-1.5 mt-1">
                <div className="stat-value text-3xl" style={{ color: "var(--coral)", fontFamily: "'Fraunces', Georgia, serif" }}>
                  {count}
                </div>
                <span className="text-lg mb-1">{meta.emoji}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SummarySection;