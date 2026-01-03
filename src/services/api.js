import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5500/api/contacts";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all contacts
export const getContacts = async (sortByName = false) => {
  try {
    const url = sortByName ? "?sort=name" : "";
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Create contact
export const createContact = async (contactData) => {
  try {
    const response = await api.post("", contactData);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Delete contact
export const deleteContact = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
