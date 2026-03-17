import { useState, useMemo } from "react";
import FooterNote from "../components/FooterNote.jsx"
import InputCard from "../components/InputCard";
import OutputCard from "../components/OutputCard.jsx";
import SummarySection from "../components/SummarySection.jsx";
import FindingsTable from "../components/FindingsTable.jsx";
import { scrubPII } from "../services/api.js";
import {downloadTextFile} from "../utils/downloadTextFile.js"
const SAMPLE_TEXT = `
Customer Name: Alexis Barraza
Email: alexis@example.com
Phone: (505) 555-4444
Card: 4222 1111 1111 1111 
IP Address: 192.168.1.10
`;
function HomePage(){
    const[inputText, setInputText] = useState(SAMPLE_TEXT);
    const [strictMode, setStrictMode] = useState(false);
    const [result, setResult] = useState(null); 
    const [errorMessage, setErrorMessage] = useState("");
    const [copyMessage, setCopyMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const totalFindings = useMemo(() => result?.findings?.length ?? 0, [result]); 
    
    
    async function handleScrub() {
        setErrorMessage("");
        setCopyMessage("");
        setIsLoading(true); 

        try{
            const data = await scrubPII({
                text: inputText,
                strict: strictMode
            });
            setResult(data);
        }catch(error){
            setResult(null),
            setErrorMessage(
                error?.response?.data?.message || "Unable to process the submitted text."
            );
        }finally{setIsLoading(false);}
    }
     function handleReset(){
            setInputText(SAMPLE_TEXT);
            setStrictMode(false);
            setResult(null);
            setErrorMessage("");
            setCopyMessage("");
        }

    async function handleCopy(){
        if(!result?.redactedText) return;
        try{
            await navigator.clipboard.writeText(result.redactedText);
            setCopyMessage("Redacted output copied to clipboard.")
        }catch{
            setCopyMessage("Copy failed in this browser.");
        }
    }

    async function handleDownload(){
        if (!result?.redactedText) return;
        downloadTextFile("redacted-output.txt", result.redactedText);
    }

    return (
        <>
            <section className="mb-8">
                <h1 className="text-4xl font-bold tracking-tight">PII Scrubber</h1>
                <p className="mt-2 max-w-3xl text-base-content/70">
                   A simple privacy by design demo built with React, DaisyUI
                   and Node/Express that detects and redacts common personally identifiable information.
                </p>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
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
            </section>
            {result && (
                <>
                    <SummarySection
                        summary={result.summary}
                        riskScore={result.riskScore}
                        totalFindings={totalFindings}
                    />
                    <FindingsTable findings={result.findings}/>
                </>
            )}
            <FooterNote/>
        </>
    );
}

export default HomePage;