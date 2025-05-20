import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import myAxios from "../../api/axios";
import { AxiosError } from "axios";
import { logout } from "../auth/authSlice";
import { AppDispatch } from "../store";

interface ICommentResponse {
    _id: string;
    title: string;
    text: string;
    imgUrl: string;
    views: number;
    authorId: string;
    comments: unknown[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface ICommentsResponse {
    comments: ICommentResponse[];
}

interface ICommentsState {
    comments: ICommentsResponse[];
    isLoading: boolean;
    commentsErrTxt: string | null;
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
    ICommentResponse,
    FormData,
    { rejectValue: string; dispatch: AppDispatch }
>("post/createPost", async (formData, { rejectWithValue, dispatch }) => {
    try {
        const res = await myAxios.post<ICommentResponse>(
            "/post/create-post",
            formData
        );
        return res.data;
    } catch (err: unknown) {
        console.error("create post error", err);
        const errorMessage = "Failed to create post. Please try again later";
        return rejectWithValue(handleError(err, errorMessage, dispatch));
    }
});

const getComments = createAsyncThunk<
    ICommentsResponse,
    void,
    { rejectValue: string }
>("post/getPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await myAxios.get("/post/posts");
        console.log("get posts", res.data);
        return res.data;
    } catch (err: unknown) {
        console.error("get posts error", err);
        const errorMessage = "Get posts failed. Please try to later";
        return rejectWithValue(handleError(err, errorMessage));
    }
});

const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //CREATE COMMENT
            .addCase(createComment.pending, (state) => {
                state.isLoading = true;
                state.commentsErrTxt = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = [...state.posts, action.payload];
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
                state.posts = action.payload.posts;
            })
            .addCase(getComments.rejected, (state, action) => {
                state.isLoading = false;
                state.commentsErrTxt = action.payload || null;
            });
    },
});

export { createComment, getComments };
export default commentSlice.reducer;
