import { create } from 'zustand';
import { Alert } from 'react-native';
import axiosInstance from '../utils/axiosInstance';

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  
// Add new product
addProduct: async (product) => {
  set({ loading: true, error: null });
  try {
    console.log("Sending product data:", product);
    
    // Ensure we're not sending any MongoDB _id field from frontend
    const productData = { ...product };
    delete productData._id;
    delete productData.id;
    
    const { data } = await axiosInstance.post("product/add", productData);
    
    // Check if the response has the expected structure
    if (data && data.success) {
      set({ 
        products: [...get().products, data.product], 
        loading: false 
      });
      Alert.alert("Success", "Product added successfully");
      return true;
    } else {
      throw new Error(data.message || "Failed to add product");
    }
  } catch (error) {
    console.log("Error details:", error.response?.data);
    
    let errorMessage = "Failed to add product";
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
      
      // Provide more specific error messages
      if (errorMessage.includes("similar details")) {
        errorMessage = "A product with similar details already exists. Please check the product title and category.";
      } else if (errorMessage.includes("required fields")) {
        errorMessage = "Please fill in all required fields: Title, Price, Category, and at least one image.";
      }
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    set({ error: errorMessage, loading: false });
    Alert.alert("Error", errorMessage);
    return false;
  }
},
  


  // Fetch all products
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.get("product/all");
      
      if (data && data.success) {
        set({ products: data.products, loading: false });
      } else {
        throw new Error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch products";
      set({ error: errorMessage, loading: false });
      console.error("Fetch products error:", error);
    }
  },
  
  // Update product
  updateProduct: async (id, productData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.put(`product/${id}`, productData);
      
      if (data && data.success) {
        // Update the product in the local state
        const updatedProducts = get().products.map(product => 
          product._id === id ? data.product : product
        );
        
        set({ products: updatedProducts, loading: false });
        Alert.alert("Success", "Product updated successfully");
        return true;
      } else {
        throw new Error(data.message || "Failed to update product");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to update product";
      set({ error: errorMessage, loading: false });
      Alert.alert("Error", errorMessage);
      return false;
    }
  },
  
  // Delete product
  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axiosInstance.delete(`product/${id}`);
      
      if (data && data.success) {
        // Remove the product from the local state
        const filteredProducts = get().products.filter(product => product._id !== id);
        set({ products: filteredProducts, loading: false });
        Alert.alert("Success", "Product deleted successfully");
        return true;
      } else {
        throw new Error(data.message || "Failed to delete product");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to delete product";
      set({ error: errorMessage, loading: false });
      Alert.alert("Error", errorMessage);
      return false;
    }
  },
  
  // Clear error
  clearError: () => set({ error: null })
}));

export default useProductStore;