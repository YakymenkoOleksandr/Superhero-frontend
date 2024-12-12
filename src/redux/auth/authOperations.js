import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://superhero-backend-vrcc.onrender.com";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, userData, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
      
      
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/logout`, null, {
        withCredentials: true,
      });
      if (response.status === 204) return true;
      throw new Error("Logout failed");
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);