import apiClient from "@/lib/apiClient";
import type { LoginFormData, RegisterFormData } from "@/pages/auth/types";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
};

export const registerUser = createAsyncThunk("auth/register",
    async (formData: RegisterFormData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/v1/auth/register", formData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || { message: "Registration failed" });
        }
    }
);

export const loginUser = createAsyncThunk("auth/login",
    async (formData: LoginFormData, { rejectWithValue }) => {
        try {
            const response = await apiClient.post("/api/v1/auth/login", formData);
            return response.data;
        } catch (error: unknown) {
            const err = error as { response?: { data?: unknown } };
            return rejectWithValue(err.response?.data || { message: "Login failed" });
        }
    }
);

export const userInfo = createAsyncThunk("auth/user-info",
    async () => {
        const response = await apiClient.get("/api/v1/auth/user-info", {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
            }
        });
        return response.data;
    }
);

export const logoutUser = createAsyncThunk("auth/logout",
    async () => {
        const response = await apiClient.post("/api/v1/auth/logout", {});
        return response.data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetAuth: (state) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.user = null;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(registerUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            }).addCase(registerUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            }).addCase(loginUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
            }).addCase(loginUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
            }).addCase(userInfo.pending, (state) => {
                state.isLoading = true;
            }).addCase(userInfo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuthenticated = true;
                state.user = action.payload.data;
            }).addCase(userInfo.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            }).addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            }).addCase(logoutUser.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            }).addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isAuthenticated = false;
                state.user = null;
            });
    },
});

export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
