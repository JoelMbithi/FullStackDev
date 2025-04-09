import { create } from "zustand";
import axios from "axios";

const BASE = "http://localhost:4000/api";

export const useProductStore = create((set, get) => ({
  // Product state
  products: [],
  loading: false,
  error: null,

  // Fetch products function
  fetchProducts: async () => {
    set({ loading: true, error: null }); 
    try {
      const res = await axios.get(`${BASE}/products/getAllProducts`);
      set({ products: res.data.data, loading: false }); 
    } catch (error) {
      set({ loading: false }); // Stop loading
      if (error.response && error.response.status === 429) {
        set({ error: "Rate Limiting" }); // Handle rate limiting error
      } else {
        set({ error: "Something went wrong" }); // Generic error handling
      }
    }
  },
}));
