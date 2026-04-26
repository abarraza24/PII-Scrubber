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
        // Added regex to take a plain 505-555-4444 etc
        regex: /(?<!\d)(?:\+?1[\s.-]?)?(?:\(\d{3}\)[\s.-]?|\d{3}[\s.-])\d{3}[\s.-]\d{4}(?!\d)/g,
        weight: 2,
        redact: () => "***-***-****"
    },
    {
        type: "SSN",
        regex: /\b\d{3}-\d{2}-\d{4}\b/g,
        weight:4,
        redact: () =>"***-**-****"
    },
    {
        type:"IPV4",
        regex: /\b(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\b/g,
        weight: 1,
        redact: () => "***.***.***.***"
    },
    {
        type: "CREDIT_CARD",
        regex: /\b(?:\d{4}[\s\-.]){3}\d{4}\b|\b\d{13,16}\b/g, 
        weight: 5,
        postValidate: (match) => luhnCheck(match.replace(/\D/g, "")),
        redact: (match) => {
            const digits = match.replace(/\D/g, "");
            return `****-****-****-${digits.slice(-4)}`;
        }
    },

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

export function scrubText(inputText, { strict = false } = {}) {
  const findings = [];
  let redactedText = inputText;

  for (const rule of RULES) {
    redactedText = redactedText.replace(rule.regex, (match) => {
      if (rule.postValidate && !rule.postValidate(match)) {
        return match; 
      }
      const redacted = rule.redact(match, strict);
      findings.push({ type: rule.type, original: match, redacted });
      return redacted;
    });
  }

  const summary = findings.reduce((acc, f) => {
    acc[f.type] = (acc[f.type] || 0) + 1;
    return acc;
  }, {});

  const riskScore = Math.min(
    100,
    findings.reduce((score, f) => {
      const rule = RULES.find((r) => r.type === f.type);
      return score + (rule?.weight ?? 1) * 10;
    }, 0)
  );

  return { redactedText, findings, summary, riskScore };
}