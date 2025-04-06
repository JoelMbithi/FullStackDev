import { toast } from "react-toastify";
import newRequest from "../utils/newRequest.js";

export const addToCart = async (e, productId) => {
  e?.stopPropagation();
  e?.preventDefault();

  try {
    // 1. Get user data more reliably
    const userData = JSON.parse(localStorage.getItem("User") || '{}');
    
    // 2. More comprehensive auth check
    if (!userData) {
      toast.error("Please log in to add items to your cart");
      return { success: false, message: "No token found" };
    }

    // 3. Verify token is still valid
    const res = await newRequest.post(
      "/addProductToCart/addToCart",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
        validateStatus: (status) => status < 500, // Don't throw error for 4xx
      }
    );

    // 4. Handle different response scenarios
    if (res.status === 401) { // Unauthorized
      toast.error("Session expired. Please login again");
      localStorage.removeItem("User");
      window.dispatchEvent(new Event("authChange"));
      return { success: false };
    }

    if (!res.data.success) {
      toast.error(res.data.message || "Failed to add to cart");
      return { success: false };
    }

    toast.success(res.data.message);
    window.dispatchEvent(new CustomEvent("cartUpdated", {
      detail: { count: res.data.count }
    }));
    return res.data;

  } catch (error) {
    console.error("Add to cart error:", error);
    
    // 5. Specific error handling
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again");
      localStorage.removeItem("User");
      window.dispatchEvent(new Event("authChange"));
    } else {
      toast.error(error.response?.data?.message || "Failed to add to cart");
    }
    
    return { success: false };
  }
};