import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import myAxios from "../../api/axios";
import { IUserInfo } from "../../types";
import { AxiosError } from "axios";

interface IAuthState {
    user: IUserInfo | null;
    token: string | null;
    isLoading: boolean;
    isProfileChecked: boolean;
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
    token: null,
    isLoading: false,
    isProfileChecked: false,
    emailErrTxt: null,
    passwordErrTxt: null,
};

const registerUser = createAsyncThunk<
    IAuthUserResponse,
    IAuthUserArgs,
    { rejectValue: Record<string, string> }
>("auth/registerUser", async ({ email, password }, { rejectWithValue }) => {
    try {
        const res = await myAxios.post<IAuthUserResponse>("/auth/register", {
            email,
            password,
        });
        if (res.data.token) {
            window.localStorage.setItem("tokenAutovibe", res.data.token);
        }
        return res.data;
    } catch (err: unknown) {
        console.error("register user error", err);
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
        const res = await myAxios.post<IAuthUserResponse>("/auth/login", {
            email,
            password,
        });
        if (res.data.token) {
            window.localStorage.setItem("tokenAutovibe", res.data.token);
        }
        return res.data;
    } catch (err: unknown) {
        console.error("login user error", err);
        let generalError = { general: "Login failed. Please try later" };
        if (err instanceof AxiosError) {
            generalError = err.response?.data?.errors || generalError;
        }
        return rejectWithValue(generalError);
    }
});

const getProfile = createAsyncThunk<
    IAuthUserResponse,
    //Вторым типом передаётся void, означает: этот thunk НЕ ожидает аргументов при вызове
    void,
    { rejectValue: string }
>("auth/getProfile", async (_, { rejectWithValue }) => {
    try {
        const res = await myAxios.get<IAuthUserResponse>("/auth/profile");
        console.log("get profile", res.data);
        return res.data;
    } catch (err: unknown) {
        console.error("get profile error", err);
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
            state.isProfileChecked = true;
            state.user = null;
            state.token = null;
        },
        setAuthToken: (state, action: PayloadAction<{ token: string }>) => {
            console.log("setAuthToken***", action.payload);
            state.token = action.payload.token;
        },
        setProfileChecked(state) {
            state.isProfileChecked = true;
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
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.token = action.payload.token;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false;
                state.emailErrTxt = action.payload?.email || null;
            })
            //LOGIN
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.emailErrTxt = null;
                state.passwordErrTxt = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.token = action.payload.token;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.emailErrTxt = action.payload?.email || null;
                state.passwordErrTxt = action.payload?.password || null;
            })
            //GETPROFILE
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload.userInfo;
                state.isProfileChecked = true;
            })
            .addCase(getProfile.rejected, (state) => {
                state.isLoading = false;
                state.isProfileChecked = true;
                state.user = null;
                state.token = null;
            });
    },
});

export const {
    logout,
    setProfileChecked,
    setAuthToken,
    resetEmailError,
    resetPasswordError,
} = authSlice.actions;
export { registerUser, loginUser, getProfile };
export default authSlice.reducer;
