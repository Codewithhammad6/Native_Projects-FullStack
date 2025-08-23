import axiosInstance from "../utils/axiosInstance";
import { create } from 'zustand';
import { Alert } from "react-native";

interface Todo {
  _id: string;
  text: string;
  createdAt?: string;
  updatedAt?: string;
}

interface TodoState {
  todos: Todo[];
  loading: boolean;
  addTodo: (text: string) => Promise<void>;
  updateTodo: (id: string, text: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  fetchTodos: () => Promise<void>;
}
const useStore = create<TodoState>((set) => ({
  todos: [],
  loading: false,
  
  // Fetch all notes
  fetchTodos: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/get");
      set({ todos: data.todos });
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to load notes");
    } finally {
      set({ loading: false });
    }
  },

  // Add a new note
  addTodo: async (text: string) => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.post("/add", { text });
      set((state) => ({ todos: [...state.todos, data.data] }));
      Alert.alert("Note added successfully");
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to add note");
    } finally {
      set({ loading: false });
    }
  },

  // Update an existing note
  updateTodo: async (id: string, text: string) => {
    try {
      set({ loading: true });
      await axiosInstance.post("/update", { id, text });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo._id === id ? { ...todo, text } : todo
        ),
      }));
      Alert.alert("Note updated successfully");
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to update note");
    } finally {
      set({ loading: false });
    }
  },

  // Delete a note
  deleteTodo: async (id: string) => {
    try {
      set({ loading: true });
      await axiosInstance.post("/del", { id });
      set((state) => ({
        todos: state.todos.filter((todo) => todo._id !== id),
      }));
      Alert.alert("Note deleted successfully");
    } catch (error: any) {
      Alert.alert(error?.response?.data?.message || "Failed to delete note");
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
