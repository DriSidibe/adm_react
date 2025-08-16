// utils/api.js
import { useAuth } from "./components/context/AuthContext";

export function useApi() {
  const { token } = useAuth();

  const request = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    };

    const res = await fetch(url, { ...options, headers });

    if (!res.ok) {
      throw new Error("Request failed");
    }

    return res.json();
  };

  return { request };
}
