// File: src/services/ApiService.js

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL of your API
const API_BASE_URL = 'http://10.0.2.2:5124/api';

// Create an Axios instance with the base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Token management functions
const TOKEN_KEY = 'authToken';

const saveToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing token:', error);
  }
};

// Add a request interceptor to include the token in the headers of every request
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    // Do not attach token for login, signup, and guest login requests
    if (
      !config.url.endsWith('/User/login') &&
      !config.url.endsWith('/User/signup') &&
      !config.url.endsWith('/User/guest')
    ) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// API Service Object containing all the methods
const ApiService = {
  // Authentication Methods
  // ----------------------

  // Login method: sends email and password to the server to authenticate
  login: async (email, password) => {
    try {
      const response = await apiClient.post('/User/login', {
        email,
        password,
      });
      await saveToken(response.data.token); // Save the received token
      return response.data;
    } catch (error) {
      console.error('Error during login:', error.response?.data || error.message);
      throw error;
    }
  },

  // Guest login method
  guestLogin: async () => {
    try {
      const response = await apiClient.post('/User/guest');
      await saveToken(response.data.token); // Save the received token
      return response.data;
    } catch (error) {
      console.error('Error during guest login:', error.response?.data || error.message);
      throw error;
    }
  },

  // Signup method: registers a new user with email, username, and password
  signup: async (email, username, password) => {
    try {
      const response = await apiClient.post('/User/signup', {
        email,
        username,
        password,
      });
      await saveToken(response.data.token); // Save the received token
      return response.data;
    } catch (error) {
      console.error('Error during signup:', error.response?.data || error.message);
      throw error;
    }
  },

  // Logout method: removes the token from storage
  logout: async () => {
    try {
      await removeToken();
    } catch (error) {
      console.error('Error during logout:', error);
      throw error;
    }
  },


  // User Profile Methods
  // --------------------

  // Retrieves the user's profile information
  getUserProfile: async () => {
    try {
      const response = await apiClient.get("/Profile");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching user profile:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Updates the user's profile information
  updateUserProfile: async (profileData) => {
    try {
      const response = await apiClient.put("/Profile", profileData);
      return response.data;
    } catch (error) {
      console.error(
        "Error updating user profile:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Story Methods
  // -------------

  // Retrieves a list of all stories
  getStories: async () => {
    try {
      const response = await apiClient.get("/Story");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching stories:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Retrieves a single story by its ID
  getStoryById: async (id) => {
    try {
      const response = await apiClient.get(`/Story/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error fetching story with id ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Creates a new story (if supported by backend)
  createStory: async (storyData) => {
    try {
      const response = await apiClient.post("/Story", storyData);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating story:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Updates an existing story
  updateStory: async (id, storyData) => {
    try {
      const response = await apiClient.put(`/Story/${id}`, storyData);
      return response.data;
    } catch (error) {
      console.error(
        `Error updating story with id ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Deletes a story
  deleteStory: async (id) => {
    try {
      const response = await apiClient.delete(`/Story/${id}`);
      return response.data;
    } catch (error) {
      console.error(
        `Error deleting story with id ${id}:`,
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Playlist Methods
  // ----------------

  // Retrieves a list of the user's playlists
  getPlaylists: async () => {
    try {
      const response = await apiClient.get("/Playlist");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching playlists:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Creates a new playlist with the given name
  createPlaylist: async (playlistName) => {
    try {
      const response = await apiClient.post("/Playlist", {
        name: playlistName,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating playlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Adds a story to a playlist
  addToPlaylist: async (playlistId, storyId) => {
    try {
      const response = await apiClient.post(`/Playlist/${playlistId}/add`, {
        storyId,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error adding to playlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Removes a story from a playlist
  removeFromPlaylist: async (playlistId, storyId) => {
    try {
      const response = await apiClient.delete(
        `/Playlist/${playlistId}/remove/${storyId}`
      );
      return response.data;
    } catch (error) {
      console.error(
        "Error removing from playlist:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Favorites Methods
  // -----------------

  // Retrieves the user's favorite stories
  getFavorites: async () => {
    try {
      const response = await apiClient.get("/Favorites");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching favorites:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Adds a story to the user's favorites
  addToFavorites: async (storyId) => {
    try {
      const response = await apiClient.post("/Favorites", { storyId });
      return response.data;
    } catch (error) {
      console.error(
        "Error adding to favorites:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Removes a story from the user's favorites
  removeFromFavorites: async (storyId) => {
    try {
      const response = await apiClient.delete(`/Favorites/${storyId}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error removing from favorites:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Recently Played Methods
  // -----------------------

  // Retrieves the user's recently played stories
  getRecentlyPlayed: async () => {
    try {
      const response = await apiClient.get("/RecentlyPlayed");
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching recently played items:",
        error.response?.data || error.message
      );
      throw error;
    }
  },

  // Adds a story to the user's recently played list
  addToRecentlyPlayed: async (storyId) => {
    try {
      const response = await apiClient.post("/RecentlyPlayed", { storyId });
      return response.data;
    } catch (error) {
      console.error(
        "Error adding to recently played:",
        error.response?.data || error.message
      );
    }
  },
};

export default ApiService;