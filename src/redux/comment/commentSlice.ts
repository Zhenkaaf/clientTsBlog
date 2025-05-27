import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../api/axios";
import { AxiosError } from "axios";
import { logout } from "../auth/authSlice";
import { AppDispatch } from "../store";
import { IComment } from "../../types";

interface ICommentsState {
    comments: IComment[];
    isLoading: boolean;
    commentsErrTxt: string | null;
}
interface ICommentPayload {
    commentText: string;
    postId: string;
}

const initialState: ICommentsState = {
    comments: [],
    isLoading: false,
    commentsErrTxt: null,
};

const handleError = (
    err: unknown,
    defaultMessage: string,
    dispatch?: AppDispatch
): string => {
    if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.message || defaultMessage;
        // Обрабатываем ошибку 403 (например, токен истёк или недействителен)
        if (err.response?.status === 403) {
            localStorage.removeItem("tokenAutovibe");
            if (dispatch) {
                dispatch(logout());
            }
        }
        return errorMessage;
    }
    return defaultMessage;
};

const createComment = createAsyncThunk<
    { message: string },
    ICommentPayload,
    { rejectValue: string; dispatch: AppDispatch }
>(
    "comment/createComment",
    async ({ commentText, postId }, { rejectWithValue, dispatch }) => {
        try {
            const res = await myAxios.post<{ message: string }>(
                "/comment/add-comment",
                {
                    commentText,
                    postId,
                }
            );

            return res.data;
        } catch (err: unknown) {
            console.error("Add comment error", err);
            const errorMessage =
                "Failed to add comment. Please try again later";
            return rejectWithValue(handleError(err, errorMessage, dispatch));
        }
    }
);

const getComments = createAsyncThunk<
    IComment[],
    string,
    { rejectValue: string; dispatch: AppDispatch }
>("comment/getComments", async (postId, { rejectWithValue }) => {
    try {
        const res = await myAxios.get<IComment[]>(
            `/comment/comments/${postId}`
        );

        return res.data;
    } catch (err: unknown) {
        console.error("Add comment error", err);
        const errorMessage = "Failed to add comment. Please try again later";
        return rejectWithValue(handleError(err, errorMessage));
    }
});

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
        clearComments: (state) => {
            state.comments = [];
        },
    },
    extraReducers: (builder) => {
        builder
            //CREATE COMMENT
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
                state.commentsErrTxt = null;
            })
            .addCase(createComment.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.isLoading = false;
                state.commentsErrTxt = action.payload || null;
            })
            //GET COMMENTS
            .addCase(getComments.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getComments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.comments = action.payload;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.commentsErrTxt = action.payload || null;
            });
    },
});

export const { clearComments } = commentSlice.actions;
export { createComment, getComments };
export default commentSlice.reducer;
