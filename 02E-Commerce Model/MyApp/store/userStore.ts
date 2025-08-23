import axiosInstance from "../utils/axiosInstance.ts";
import { create } from 'zustand';
import { Alert } from "react-native";

interface User {
  _id: string;
  email: string;
  name: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  isAuth: boolean;
  loaded: boolean;
  token: string | null;
  setToken: (token: string) => void;
  getUser: () => Promise<void>;
  register: (formData: RegisterFormData) => Promise<void>;
  login: (formData: LoginFormData) => Promise<{ success: boolean; user?: User }>;
  logout: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  getProducts: () => Promise<Product[]>;
}

interface Product {
  itemName: string;
  price: string;
  userId: string;
}


const useStore = create<UserState>((set) => ({
  user: null,
  loading: false,
  isAuth: false,
  loaded: false,
  token: null,

  setToken: (token: string) => set({ token }),

  getUser: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get('/user/me');
      set({ 
        user: data.user, 
        isAuth: true,
        loaded: true 
      });
    } catch (err: any) {
      set({ 
        user: null, 
        isAuth: false,
        loaded: true 
      });
    } finally {
      set({ loading: false });
    }
  },

  register: async (formData: RegisterFormData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/register", formData);
      
      set({ 
        user: data.user, 
        isAuth: true,
        token: data.token 
      });
      Alert.alert('Registration Successful')

    } catch (error: any) {
      Alert.alert(`${error.response.data.message}`)
      // console.log(error.response.data.message)
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (formData: LoginFormData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/login", formData);
      
      set({ 
        user: data.user, 
        isAuth: true,
        token: data.token 
      });
      Alert.alert('Login Successful')

      return { success: true, user: data.user };
    } catch (err: any) {
      set({ user: null, isAuth: false });

      Alert.alert(`${err?.response?.data?.message}`)
      
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true });
      await axiosInstance.post("/user/logout");
      set({ 
        user: null, 
        isAuth: false,
        // token: null 
      });
      
      Alert.alert('Logged out successfully')

    } catch (err: any) {
      Alert.alert(`${err?.response?.data?.message}`)
    } finally {
      set({ loading: false });
    }
  },



  addProduct: async (product: Product) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/addProduct", product);
      Alert.alert("Product Added", data.message);
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to add product");
    } finally {
      set({ loading: false });
    }
  },


  getProducts: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/user/getProducts");
      return data.data; // returns array of products
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to fetch products");
      return [];
    } finally {
      set({ loading: false });
    }
  },


}));

export default useStore;