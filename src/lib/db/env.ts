import axios from "axios";

const isProductionAxios = process.env.NODE_ENV === "production";

export const axiosInstance = axios.create({
  baseURL: isProductionAxios
    ? "https://clerk-wine.vercel.app/api"
    : "http://localhost:3000/api",
});

const isProduction = process.env.NODE_ENV === "production";

export const baseURL = isProduction
  ? "https://clerk-wine.vercel.app/api"
  : "http://localhost:3000/api";
