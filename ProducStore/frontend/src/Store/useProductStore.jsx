import { create } from "zustand";
import axios from "axios";

const BASE = import.meta.env.MODE ==="development" ? "http://localhost:4000/api"  : "";

export const useProductStore = create((set, get) => ({
  // Product state
  products: [],
  loading: false,
  error: null,

  // form data
  formData : {
    name:"",
    price:"",
    image:"",
  },

  setFormData: ((formData) => set({ formData})),
  resetForm: () => set({ formData: {name:"", price: "", image: ""}}),


  addProduct: async(e) => {
    try {
      const {formData} = get()
      /* const res =  */await axios.post(`${BASE}/products/createProduct`, formData)
      await get().fetchProducts()
      get().resetForm()
      console.log("Product added successful")
    } catch (error) {
      console.log(error)
    }

  },

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


  //delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE}/products/deleteProduct/${id}`);
      // After successful deletion, fetch products again
      await get().fetchProducts();
    } catch (error) {
      set({ loading: false, error: getErrorMessage(error) });
    }
  }
}));

