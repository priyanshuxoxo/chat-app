import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
export const useAuthStore = create((set) => ({
  authUser: null,

  isSigningUp: false,
  isLogginIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = axiosInstance.get("/auth/check");
      set({ authUser: (await res).data });
    } catch (error) {
      console.log("error in check auth", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },
  signup: async (data) => {
    try {
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  login: async (data) => {
    set({ isLogginIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged In Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLogginIn: false });
    }
  },
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Updated Successfully");
    } catch (error) {
      console.log("Error in Updating Profile: ", error);
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
