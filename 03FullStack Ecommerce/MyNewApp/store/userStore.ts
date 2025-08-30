import { create } from 'zustand';
import axiosInstance from '../utils/axiosInstance.ts';
import { Alert } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const userStore = create((set) => ({
  user: null,
  loading: false,
  isAuth: false,

  //  Get logged-in user profile
  getUser: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/user/me");

      set({ 
        user: data.user, 
        isAuth: true,
      });
    } catch (error) {
      console.log(error?.response?.data?.message || "Failed to fetch user")
      set({ isAuth: false, user: null });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  //  Register user
  register: async (formData,navigation) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/register", formData);
   Alert.alert(
      "Success",
      "Registration successful, please verify your email",
      [
        {
          text: "OK",
          onPress: () => navigation.navigate("VerifyEmail"),
        },
      ]
    );
      return data;
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "Registration failed");
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  //  Login user
  login: async (formData) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/login", formData);


// Save token & user in local storage
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));



      set({
        user: data.user,
        isAuth: true,
      });

      Alert.alert("Login Successful");
      return data;
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "Login failed");
      set({ isAuth: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },


initAuth : async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const storedUser = await AsyncStorage.getItem("user");

    if (token && storedUser) {
      set({
        user: JSON.parse(storedUser),
        isAuth: true,
      });
    }
  } catch (error) {
    console.log("Auth init error:", error);
  }
},

//forgot password
forgot: async (email,navigation) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/forgot", email);
   Alert.alert(
      "Success",
      "Please verify your email",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Reset"),
        },
      ]
    );
      return data;
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "Forgot failed");
      set({ isAuth: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

//reset key
reset: async (code,navigation) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/verify", code);
Alert.alert(
      "Success",
      "verified successfully",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("NewPassword",code),
        },
      ]
    );
      return data;
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "Reset failed");
      set({ isAuth: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },




// In your userStore.ts - Fix the Verify function
Verify: async (code, navigation) => {
  try {
    set({ loading: true });
    
    // Send the code in the request body properly
    const { data } = await axiosInstance.post("/user/verifyEmail", code);
    
    //  Save token & user in AsyncStorage
    await AsyncStorage.setItem("token", data.token);
    await AsyncStorage.setItem("user", JSON.stringify(data.user));
    
    // Update state
    set({ 
      user: data.user, 
      isAuth: true 
    });
    // Show success alert and navigate
    Alert.alert(
      "Success",
      "Email verified successfully!",
      [
        {
          text: "OK",
          onPress: () => {
            console.log("Navigating to Home");
            navigation.navigate('Home');
          }
        },
      ]
    );
    
    return data;
  } catch (error) {
    console.log("Verification error:", error);
    Alert.alert("Error", error?.response?.data?.message || "Verification failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},







//sendNew password
newPassword: async (password,code,navigation) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/user/newpassword", {password,code});
Alert.alert(
      "Success",
      "Change successfully",
      [
        {
          text: "OK",
          onPress: () => navigation.replace("Login"),
        },
      ]
    );
      return data;
    } catch (error) {
      Alert.alert(error?.response?.data?.message || "NewPassword failed");
      set({ isAuth: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },










  //  Logout user
  logout: async () => {
    try {
      set({ loading: true });
      await axiosInstance.get("/user/logout", { withCredentials: true });
  
      await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");

      set({
        user: null,
        isAuth: false,
      });

      Alert.alert("Logout Successful");
    } catch (error: any) {
      console.error("Logout error:", error);
      Alert.alert(error?.response?.data?.message || "Logout failed");
      set({ user: null, isAuth: false });
    } finally {
      set({ loading: false });
    }
  },



addAddresses: async (address) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.post("/user/addresses",{address});
    
    Alert.alert("Success", "Address added successful");
    return data;
  } catch (error) {
    Alert.alert(error?.response?.data?.message || "Address added failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},


getAddresses: async () => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.get("/user/getAddresses");
    return data.addresses;
  } catch (error) {
    console.log(error?.response?.data?.message || "Address geting failed")
    throw error;
  } finally {
    set({ loading: false });
  }
},

delAddress: async (Id) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.delete(`/user/address/${Id}`);
     Alert.alert("Success", "Address deleted successfully")
    return data;
  } catch (error) {
    Alert.alert("Error", error?.response?.data?.message || "Failed to delete address")
    throw error;
  } finally {
    set({ loading: false });
  }
},





addOrders: async (orderData) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.post("/order/orders",orderData);
    return data;
  } catch (error) {
    Alert.alert(error?.response?.data?.message || "Order created failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},





getOrders: async () => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.get("/order/getOrders");
    return data.orders;
  } catch (error) {
    Alert.alert(error?.response?.data?.message || "Order get failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},


getUsers: async () => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.get("/user/getUsers");
    return data.users;
  } catch (error) {
    Alert.alert(error?.response?.data?.message || "Users get failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},



deleteOrder: async (orderId) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.delete(`/order/order/${orderId}`);
     Alert.alert("Success", "Order deleted successfully")
    return data;
  } catch (error) {
    Alert.alert("Error", error?.response?.data?.message || "Failed to delete order")
    throw error;
  } finally {
    set({ loading: false });
  }
},



//  Change Status via Dropdown
updateStatus : async (orderId,newStatus) => {
  try {
    set({ loading: true });
    const {data} = await axiosInstance.put(`/order/order/${orderId}`, { status: newStatus });
      Alert.alert("Success", `Status updated to ${newStatus}`);
    return data;
  } catch (error) {
     Alert.alert("Error", error?.response?.data?.message || "Failed to update status");
   throw error;
  } finally {
    set({ loading: false });
  }
},


getAllOrders: async () => {
   try {
    set({ loading: true });
    const { data } = await axiosInstance.get("/order/AllOrders");
    return data.orders;
  } catch (error) {
    Alert.alert(error?.response?.data?.message || "Users get failed");
    throw error;
  } finally {
    set({ loading: false });
  }
},





deleteUser: async (userId) => {
  try {
    set({ loading: true });
    const { data } = await axiosInstance.delete(`/user/users/${userId}`);
     Alert.alert("Success", "User deleted successfully")
    return data;
  } catch (error) {
    Alert.alert("Error", error?.response?.data?.message || "Failed to delete user")
    throw error;
  } finally {
    set({ loading: false });
  }
},






}));





export default userStore;
