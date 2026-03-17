import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api"
});

export async function scrubPII(payload) {
    const response = await api.post("/scrub", payload);
    return response.data;
}