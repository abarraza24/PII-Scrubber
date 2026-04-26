import { useState, useMemo } from "react";
import FooterNote from "../components/FooterNote.jsx";
import InputCard from "../components/InputCard.jsx";
import OutputCard from "../components/OutputCard.jsx";
import SummarySection from "../components/SummarySection.jsx";
import FindingsTable from "../components/FindingsTable.jsx";
import { scrubPII } from "../services/api.js";
import { downloadTextFile } from "../utils/downloadTextFile.js";

const SAMPLE_TEXT = `Customer Name: Alexis Barraza
Email: alexis@example.com
Phone: (505) 555-4444
Card: 4222 1111 1111 1111
IP Address: 192.168.1.10
SSN: 123-45-6789`;

const STATS = [
  { value: "5+", label: "PII types detected" },
  { value: "100%", label: "Processed locally" },
  { value: "0", label: "Data stored" },
];

function HomePage() {
  const [inputText, setInputText]=useState(SAMPLE_TEXT);
  const [strictMode, setStrictMode]=useState(false);
  const [result, setResult]=useState(null);
  const [errorMessage, setErrorMessage]=useState("");
  const [copyMessage, setCopyMessage]=useState("");
  const [isLoading, setIsLoading]=useState(false);

  const totalFindings = useMemo(() => result?.findings?.length ?? 0, [result]);

  async function handleScrub() {
    setErrorMessage("");
    setCopyMessage("");
    setIsLoading(true);
    try {
      const data = await scrubPII({ text: inputText, strict: strictMode });
      setResult(data);
    } catch (err) {
      setResult(null);
      setErrorMessage(err?.response?.data?.message || "Unable to process text.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleReset() {
    setInputText(SAMPLE_TEXT);
    setStrictMode(false);
    setResult(null);
    setErrorMessage("");
    setCopyMessage("");
  }

  async function handleCopy() {
    if (!result?.redactedText) return;
    try {
      await navigator.clipboard.writeText(result.redactedText);
      setCopyMessage("Copied to clipboard!");
      setTimeout(() => setCopyMessage(""), 2800);
    } catch {
      setCopyMessage("Copy failed — please select text manually.");
    }
  }

  function handleDownload() {
    if (!result?.redactedText) return;
    downloadTextFile("redacted-output.txt", result.redactedText);
  }

  return (
    <div>
      <section className="hero-bg -mx-4 sm:-mx-6 lg:-mx-8 mb-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-10">

            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 mb-5
                              text-xs font-semibold uppercase tracking-widest
                              border border-white/20 text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-current inline-block animate-pulse" />
                350 Intro To Personal Computer Security.
              </div>

              <h1 className="hero-title font-fraunces text-white text-4xl sm:text-5xl lg:text-5xl
                             leading-[1.12] tracking-tight mb-5"
                  style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700 }}>
                Scrub personal data
                <br />
                <span style={{ color: "var(--coral)" }}>before it leaks.</span>
              </h1>

              <p className="text-white/65 text-base sm:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 mb-8">
                Paste any text. PII Scrubber detects and redacts emails, phones,
                SSNs, credit cards, and IP addresses instantly, in your browser.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {STATS.map(({ value, label }) => (
                  <div key={label} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white"
                         style={{ fontFamily: "'Fraunces', Georgia, serif" }}>
                      {value}
                    </div>
                    <div className="text-xs text-white/50 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex items-center justify-center shrink-0 anim-float">
              <div className="hero-pulse-ring" />
              <div className="flex h-32 w-32 sm:h-40 sm:w-40 items-center justify-center
                              rounded-full border-4 border-white/20 text-white"
                   style={{ background: "rgba(255,255,255,0.07)" }}>
                <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                  <path
                    d="M32 4L8 16V32C8 45.25 18.5 57.5 32 60C45.5 57.5 56 45.25 56 32V16L32 4Z"
                    fill="currentColor" fillOpacity="0.18"
                    stroke="currentColor" strokeWidth="2" strokeLinejoin="round"
                  />
                  <path
                    d="M22 32l7 7 13-14"
                    stroke="currentColor" strokeWidth="3.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <InputCard
            inputText={inputText}
            setInputText={setInputText}
            strictMode={strictMode}
            setStrictMode={setStrictMode}
            onScrub={handleScrub}
            onReset={handleReset}
            isLoading={isLoading}
          />
          <OutputCard
            result={result}
            errorMessage={errorMessage}
            copyMessage={copyMessage}
            onCopy={handleCopy}
            onDownload={handleDownload}
          />
        </div>

        {result && (
          <>
            <SummarySection
              summary={result.summary}
              riskScore={result.riskScore}
              totalFindings={totalFindings}
            />
            <FindingsTable findings={result.findings} />
          </>
        )}

        <FooterNote />
      </div>
    </div>
  );
}

export default HomePage;
