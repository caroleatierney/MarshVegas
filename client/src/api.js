// Determine base URL automatically (local vs Render)
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://marshvegas.onrender.com" // your Render backend URL
    : "http://localhost:3001";

// Generic fetch wrapper
export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, options);

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${res.status} - ${text}`);
  }

  return res.json();
}

// ---------- Specific API calls ----------

export function fetchBeaches() {
  return apiFetch("/beaches");
}

export function fetchBeach(id) {
  return apiFetch(`/beaches/${id}`);
}

export function createBeach(data) {
  return apiFetch("/beaches", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}
