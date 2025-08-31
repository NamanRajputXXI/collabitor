import { create } from "zustand";
import axios from "axios";
import API_BASE_URL from "../config/api";

let parsedUser = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser && storedUser !== "undefined") {
    parsedUser = JSON.parse(storedUser);
  }
} catch (e) {
  parsedUser = null;
}

const useAuthStore = create((set, get) => ({
  user: parsedUser,
  token: localStorage.getItem("token") || null,
  projects: [],

  login: (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    set({ user: userData, token });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  fetchProjects: async () => {
    try {
      const { token } = get();
      const response = await axios.get(`${API_BASE_URL}/project/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ projects: response.data.projects });
    } catch (error) {
      console.error("Error fetching projects:", error);
      set({ projects: [] });
    }
  },
  createProject: async (projectData) => {
    try {
      const { token } = get();
      const response = await axios.post(
        `${API_BASE_URL}/project/create`,
        projectData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        projects: [...state.projects, response.data.project],
      }));
      return response.data.project;
    } catch (error) {
      console.error("Error creating project:", error);
      throw error;
    }
  },
  updateProject: async (projectId, updatedData) => {
    try {
      const { token } = get();
      const response = await axios.put(
        `${API_BASE_URL}/project/edit/${projectId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set((state) => ({
        projects: state.projects.map((proj) =>
          proj._id === projectId ? response.data.project : proj
        ),
      }));
      return response.data.project;
    } catch (error) {
      console.error("Error updating project:", error);
      throw error;
    }
  },
  deleteProject: async (projectId) => {
    try {
      const { token } = get();
      await axios.delete(`${API_BASE_URL}/project/delete/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        projects: state.projects.filter((proj) => proj._id !== projectId),
      }));
    } catch (error) {
      console.error("Error deleting project:", error);
      throw error;
    }
  },
}));

export default useAuthStore;
