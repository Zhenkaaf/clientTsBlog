import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../api/axios";
import { AxiosError } from "axios";

const initialState = {
    isLoading: false,
};

const sendResetCode = createAsyncThunk<
    { message: string },
    { email: string },
    { rejectValue: string }
>("resetPassword/sendCode", async ({ email }, { rejectWithValue }) => {
    try {
        /* "http://localhost:5000/api/reset-password/reset-password", */
        /*   "https://serverexpresstsblog.onrender.com/api/reset-password/reset-password", */
        const res = await myAxios.post<{ message: string }>(
            "/reset-password/reset-password",
            {
                email,
            }
        );
        console.log("Response from sendResetCode:", res.data);
        return res.data;
    } catch (err: unknown) {
        console.error("Send reset code error", err);
        let errorMessage = "Failed to send reset code. Please try again later";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const verifyCode = createAsyncThunk<
    { message: string; resetToken: string },
    { code: string; email: string },
    { rejectValue: string }
>("resetPassword/verifyCode", async ({ code, email }, { rejectWithValue }) => {
    try {
        const res = await myAxios.post<{ message: string; resetToken: string }>(
            "/reset-password/verify-code",
            {
                code,
                email,
            }
        );
        return res.data;
    } catch (err: unknown) {
        console.error("Verify code error", err);
        let errorMessage = "Failed to verify the code. Please try again";
        if (err instanceof AxiosError) {
            errorMessage = err.response?.data?.message || errorMessage;
        }
        return rejectWithValue(errorMessage);
    }
});

const createNewPassword = createAsyncThunk<
    { message: string },
    { newPassword: string; resetToken: string },
    { rejectValue: string }
>(
    "resetPassword/createNewPassword",
    async ({ newPassword, resetToken }, { rejectWithValue }) => {
        try {
            const res = await myAxios.post<{ message: string }>(
                "/reset-password/create-new-password",
                {
                    newPassword,
                    resetToken,
                }
            );
            return res.data;
        } catch (err: unknown) {
            console.error("Create new password error", err);
            let errorMessage =
                "Failed to create new password. Please try again";
            if (err instanceof AxiosError) {
                errorMessage = err.response?.data?.message || errorMessage;
            }
            return rejectWithValue(errorMessage);
        }
    }
);

const resetPasswordSlice = createSlice({
    name: "resetPassword",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //sendResetCode
            .addCase(sendResetCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendResetCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(sendResetCode.rejected, (state) => {
                state.isLoading = false;
            })
            //verifyCode
            .addCase(verifyCode.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(verifyCode.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(verifyCode.rejected, (state) => {
                state.isLoading = false;
            })
            //createNewPassword
            .addCase(createNewPassword.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createNewPassword.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createNewPassword.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

//export const {} = resetPasswordSlice.actions;
export { sendResetCode, verifyCode, createNewPassword };
export default resetPasswordSlice.reducer;
