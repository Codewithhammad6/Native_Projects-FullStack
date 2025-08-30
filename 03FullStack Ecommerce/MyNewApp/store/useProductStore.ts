import { create } from 'zustand';
import { Alert, Platform } from 'react-native';
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
      
      const productData = { ...product };
      delete productData._id;
      delete productData.id;
      
      if (productData.carouselImages && Array.isArray(productData.carouselImages)) {
        productData.carouselImages = productData.carouselImages.map(img => 
          typeof img === 'object' ? img.url : img
        );
      }
      
      const { data } = await axiosInstance.post("product/add", productData);
      
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

  // Upload image to server
  uploadImage: async (imageUri) => {
    try {
      
      const formData = new FormData();
      let filename = imageUri.split('/').pop();
      
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : 'image/jpeg';
      
      let fixedUri = imageUri;
      if (Platform.OS === 'android' && !imageUri.startsWith('file://')) {
        fixedUri = `file://${imageUri}`;
      }
      
      formData.append('image', {
        uri: fixedUri,
        type: type,
        name: filename || 'upload.jpg',
      });

      // Upload to backend
      const response = await axiosInstance.post("product/upload-image", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        transformRequest: (data) => {
          return data; // Don't transform formData
        },
      });

      if (response.data && response.data.success) {
        // Return just the URL string for compatibility with existing code
        return response.data.imageUrl;
      } else {
        throw new Error(response.data?.message || 'Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      
      let errorMessage = 'Failed to upload image';
      
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      throw new Error(errorMessage);
    }
  },

  // Add function to delete individual images
  deleteImage: async (publicId) => {
    try {
      const response = await axiosInstance.delete(`product/delete-image/${publicId}`);
      
      if (response.data && response.data.success) {
        return true;
      } else {
        throw new Error(response.data?.message || 'Image deletion failed');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw new Error('Failed to delete image');
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
      if (productData.carouselImages && Array.isArray(productData.carouselImages)) {
        productData.carouselImages = productData.carouselImages.map(img => 
          typeof img === 'object' ? img.url : img
        );
      }
      
      const { data } = await axiosInstance.put(`product/${id}`, productData);
      
      if (data && data.success) {
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