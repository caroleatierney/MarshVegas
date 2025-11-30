import { API_BASE_URL } from "./api";

export async function fetchBeaches() {
  const res = await fetch(`${API_BASE_URL}/beaches`);
  if (!res.ok) throw new Error("Failed to fetch beaches");
  return res.json();
}

// Fetch a single beach

export async function fetchBeach(id) {
  const res = await fetch(`${API_BASE_URL}/beaches/${id}`);
  if (!res.ok) throw new Error("Beach not found");
  return res.json();
}

// Create a beach
export async function createBeach(data) {
  const res = await fetch(`${API_BASE_URL}/beaches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create beach");
  return res.json();
}