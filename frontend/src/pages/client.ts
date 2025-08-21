// src/pages/client.ts
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function apiGet<T>(path: string, params?: Record<string, any>): Promise<T> {
  const url = new URL(`${API_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}

export async function apiDownload(path: string, params?: Record<string, any>) {
  const url = new URL(`${API_URL}${path}`);
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
  });
  const res = await fetch(url);
  if (!res.ok) throw new Error("Descarga fallida");
  const blob = await res.blob();
  return blob;
}

export async function apiJson<T>(path: string, method: string, body?: any): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error((await res.json()).error || res.statusText);
  return res.json();
}
