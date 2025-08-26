import axios from "axios";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const API_KEY = process.env.NEXT_PUBLIC_API_KEY

export const backendless = axios.create({
    baseURL: `https://api.backendless.com/${APP_ID}/${API_KEY}`,
    headers: {
        "Content-Type": "application/json"
    }
})