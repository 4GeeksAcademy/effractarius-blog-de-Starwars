// src/services/swapi.js
const API_BASE = "https://www.swapi.tech/api";

export async function fetchPeople(page = 1) {
  const res = await fetch(`${API_BASE}/people?page=${page}&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch people");
  return res.json();
}

export async function fetchVehicles(page = 1) {
  const res = await fetch(`${API_BASE}/vehicles?page=${page}&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
}

export async function fetchPlanets(page = 1) {
  const res = await fetch(`${API_BASE}/planets?page=${page}&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch planets");
  return res.json();
}