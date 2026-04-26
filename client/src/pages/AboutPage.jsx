const TYPES = [
  { emoji: "✉",  label: "Email Addresses",   desc: "user@domain.com and common variants" },
  { emoji: "📞", label: "Phone Numbers",      desc: "(505) 555-4444, +1-800 formats" },
  { emoji: "🪪", label: "Social Security",    desc: "123-45-6789 pattern (SSN)" },
  { emoji: "💳", label: "Credit Cards",       desc: "Luhn-validated 13–16 digit numbers" },
  { emoji: "🌐", label: "IPv4 Addresses",     desc: "0.0.0.0 – 255.255.255.255 range" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-5">

      {/* Hero card — navy bg */}
      <section
        className="rounded-2xl p-7 sm:p-9 text-white anim-up"
        style={{ background: "var(--navy)" }}
      >
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl text-2xl"
               style={{ background: "rgba(255,255,255,0.1)" }}>
            🛡️
          </div>
          <h1 className="text-2xl sm:text-3xl text-white"
              style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700 }}>
            About PII Scrubber
          </h1>
        </div>
        <p className="text-white/70 leading-relaxed text-sm sm:text-base">
          <strong className="text-white font-semibold">PII Scrubber</strong> is a privacy-enhancing
          tool that detects and redacts personally identifiable information from plain text.
          Built as an intro to personal cybersecurity course project, it demonstrates core privacy
          concepts: <em>data minimization</em>, <em>de-identification</em>, and{" "}
          <em>privacy by design</em>.
        </p>
      </section>

      {/* What it detects */}
      <section className="card bg-base-100 card-lifted anim-up d1">
        <div className="card-body p-6 sm:p-7 gap-5">
          <h2 className="card-title text-xl">What it detects</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {TYPES.map(({ emoji, label, desc }) => (
              <div
                key={label}
                className="flex items-start gap-3 rounded-xl border border-base-200
                           bg-base-200/40 p-3.5 hover:bg-base-200/70 transition-colors"
              >
                <span className="text-xl mt-0.5 shrink-0">{emoji}</span>
                <div>
                  <div className="font-semibold text-sm leading-none mb-1">{label}</div>
                  <div className="text-xs text-base-content/50">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="card bg-base-100 card-lifted anim-up d2">
        <div className="card-body p-6 sm:p-7 gap-4">
          <h2 className="card-title text-xl">How it works</h2>
          <div className="space-y-3 text-sm text-base-content/65 leading-relaxed">
            <p>
              Each PII type is matched with a carefully crafted regular expression. They run in a
              deliberate order — phone and SSN rules run before the credit card rule — so digit-based
              patterns can't accidentally consume each other.
            </p>
            <p>
              Credit card numbers go one step further: they're validated with the{" "}
              <strong className="text-base-content">Luhn algorithm</strong> (mod-10 check)
              to filter out false positives from random digit sequences.
            </p>
            <p>
              <strong className="text-base-content">Strict Mode</strong> hides even more
              of each value, making reconstruction from the output harder.
              A <strong className="text-base-content">risk score</strong> is calculated
              from the count and sensitivity of each type found — SSNs and credit cards
              weigh more than IP addresses.
            </p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section
        className="rounded-2xl p-5 anim-up d3"
        style={{
          background: "var(--coral-lite, #F7E8E2)",
          border: "1px solid rgba(232,87,42,0.2)",
        }}
      >
        <div className="flex gap-3 items-start">
          <span className="text-xl mt-0.5 shrink-0">⚠️</span>
          <div>
            <h3 className="font-bold text-sm mb-1" style={{ color: "var(--coral)" }}>
              Educational limitations
            </h3>
            <p className="text-sm leading-relaxed text-base-content/60">
              This tool is a useful first layer but not a professional PII detection system.
              Real-world tools use context-aware NLP, entity recognition, and extensive
              validation across diverse datasets. Never use this as your only privacy safeguard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutPage;