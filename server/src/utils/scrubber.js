const RULES =[
    {
        type: "EMAIL",
        regex: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
        weight: 2,
        redact: (match, strict) =>{
            const [user, domain] = match.split("@");

            if(strict){
                return `***@${domain}`;
            }

            const visible = user.length >= 2 ? user.slice(0, 2) : user.slice(0, 1);
            return `${visible}***@${domain}`;
        }
    },
    {
        type: "PHONE",
        regex: /\b(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g,
        weight:2,
        redact: () =>"***-***-****"
    },
    {
        type: "SSN",
        regex: /\b\d{3}-\d{2}-\d{4}\b/g,
        weight:4,
        redact: () =>"***-**-****"
    },
    {
        type: "CREDIT_CARD",
        regex: /(?:\d[ -]*?){13,19}\b/g,
        weight: 5,
        postValidate: (match) => luhnCheck(match.replace(/\D/g, "")),
        redact: (match) => {
            const digits = match.replace(/\D/g, "");
            return `****-****-****-${digits.slice(-4)}`;
        }
    },
    {
        type:"IPV4",
        regex: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
        weight: 1,
        redact: () => "***.***.***.***"
    }

];

//Luhn formula known as mod 10 algorithm simple check degit used to validate id numbers.
// When a person enters a number
const luhnCheck = (numStr) =>{
    
    // If the string contains any characters that are not digits
    // the function will return false. 
    if(!/^\d+$/.test(numStr)) return false

    let sum = 0;
    let shouldDouble = false;

    for (let index = numStr.length - 1; index >= 0; index -= 1){
        let digit = Number(numStr[index]);

        if(shouldDouble){
            digit *= 2;
            if(digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

export function scrubText(inputText, {strict = false} = {}){
    const findings = [];
    let transformedText = inputText;

    for (const rule of RULES){
        transformedText = transformedText.replace(rule.regex, (match) =>{
            if(rule.postValidate && !rule.postValidate(match)){
                return match;
            }

            const redacted = rule.redact(match, strict);

            findings.push({
                type: rule.type,
                original: match,
                redacted
            });

            return `[REDACTED:${rule.type}]`;
        });
    }

    console.log("Middle State", transformedText)

    let findingIndex = 0;

    const redactedText = transformedText.replace(/\[REDACTED:[A-Z_]+\]/g, () =>{
        const finding = findings[findingIndex];
        findingIndex += 1;
        return finding?.redacted ?? "[REDACTED]";
    });

    const summary = findings.reduce((accumulator, finding) =>{
        accumulator[finding.type] =(accumulator[finding.type] || 0) + 1;
        return accumulator;
    }, {});

    const riskScore = Math.min(
        100,
        findings.reduce((score, finding) =>{
            const matchingRule = RULES.find((rule) => rule.type === finding.type);
            return score + (matchingRule?.weight ?? 1) * 10;
        }, 0)
    );

    return {
        redactedText,
        findings,
        summary, 
        riskScore
    };
}