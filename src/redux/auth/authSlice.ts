import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../utils/axios";
import { IUserInfo } from "../../types";
import { AxiosError } from "axios";

interface IAuthState {
    user: IUserInfo | null;
    isLoading: boolean;
    status: string | null;
    emailErrTxt: string | null;
    passwordErrTxt: string | null;
}
interface IAuthUserArgs {
    email: string;
    password: string;
}

interface IAuthUserResponse {
    userInfo: IUserInfo;
    token: string;
    message: string;
}

const initialState: IAuthState = {
    user: null,
    isLoading: false,
    status: null,
    emailErrTxt: null,
    passwordErrTxt: null,
};

const registerUser = createAsyncThunk<
    IAuthUserResponse,
    IAuthUserArgs,
    { rejectValue: Record<string, string> }
>("auth/registerUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await axios.post<IAuthUserResponse>("/auth/register", {
            email,
            password,
        });
        if (res.data.token) {
            window.localStorage.setItem("tokenAutovibe", res.data.token);
        }
        return res.data;
    } catch (err: unknown) {
        console.error(err);
        let generalError = { general: "Registration failed. Please try later" };
        if (err instanceof AxiosError) {
            generalError = err.response?.data?.errors || generalError;
        }
        return rejectWithValue(generalError);
    }
});

const loginUser = createAsyncThunk<
    IAuthUserResponse,
    IAuthUserArgs,
    { rejectValue: Record<string, string> }
>("auth/loginUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await axios.post<IAuthUserResponse>("/auth/login", {
            email,
            password,
        });
        if (res.data.token) {
            window.localStorage.setItem("tokenAutovibe", res.data.token);
        }
        return res.data;
    } catch (err: unknown) {
        console.error(err);
        let generalError = { general: "Login failed. Please try later" };
        if (err instanceof AxiosError) {
            generalError = err.response?.data?.errors || generalError;
        }
        return rejectWithValue(generalError);
    }
});

const getProfile = createAsyncThunk<
    IAuthUserResponse,
    //Вторым типом передаётся void, означает: этот thunk НЕ ожидает аргументов
    void,
    { rejectValue: string }
>("auth/getProfile", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get<IAuthUserResponse>("/auth/profile");
        console.log(res.data);
        return res.data;
    } catch (err: unknown) {
        console.error(err);
        let errorMessage = "Get profile failed. Please try to login";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLoading = false;
            state.status = null;
            state.user = null;
        },
        resetEmailError: (state) => {
            state.emailErrTxt = null;
        },
        resetPasswordError: (state) => {
            state.passwordErrTxt = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //REGISTER
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.status = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.emailErrTxt = action.payload?.email || null;
                state.status = action.payload as string;
            })
            //LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.status = null;
                state.emailErrTxt = null;
                state.passwordErrTxt = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.status = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.log("*******************", action.payload);
                state.isLoading = false;
                state.emailErrTxt = action.payload?.email || null;
                state.passwordErrTxt = action.payload?.password || null;
                /* state.status = action.payload as string; */
            })
            //GETPROFILE
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
                state.status = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.status = action.payload.message;
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.status = action.payload as string;
            });
    },
});

export const { logout, resetEmailError, resetPasswordError } =
    authSlice.actions;
export { registerUser, loginUser, getProfile };
export default authSlice.reducer;
