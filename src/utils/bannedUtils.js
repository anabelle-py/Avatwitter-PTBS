import { bannedPhrases } from "../constants/bannedPhrases.js";

export function isTextOffensive(text) {
    const lower = text.toLowerCase();
    return bannedPhrases.some(phrase => lower.includes(phrase));
}