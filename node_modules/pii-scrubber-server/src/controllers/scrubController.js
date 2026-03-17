import { scrubText } from "../utils/scrubber.js";

export function scrubTextHandler(req, res) {
    const { text, strict = false } = req.body ?? {};

    if (typeof text !== "string" || text.trim().length === 0){
        return res.status(400).json({
            message: "A non empty text field is required."
        });
    }
    const result = scrubText(text, { strict });
    return res.status(200).json(result);
}