import axios from "axios";

//const api = axios.create({
    //baseURL: import.meta.env.VITE_API_URL || "http://localhost:3001/api"
//});
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD ? "/api" : "http://localhost:3001/api");

const api = axios.create({ baseURL });

export async function scrubPII(payload) {
  const response = await api.post("/scrub", payload);
  return response.data;
}