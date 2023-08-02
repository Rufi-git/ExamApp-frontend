import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import quizService from "./quizService"
import { useSelector } from "react-redux"

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    userId: null,
    result: [],
    resultByExam: []
}

//Add Result
export const addResult = createAsyncThunk(
    "result/addResult",
    async ({ examId, resultData }, thunkAPI) => {
        try {
            return await quizService.addResult(examId, resultData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Results By User
export const getResultsByUser = createAsyncThunk(
    "result/getResultsByUser",
    async (_, thunkAPI) => {
        try {
            return await quizService.getResultsByUser()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Results By User By Exam
export const getResultsByUserByExam = createAsyncThunk(
    "result/getResultsByUserByExam",
    async (examId, thunkAPI) => {
        try {
            return await quizService.getResultsByUserByExam(examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)


const resultSlice = createSlice({
    name: 'result',
    initialState,
    reducers: {
        RESET_RESULT: (state) => {
            state.result = []
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        updateResultAction: (state, action) => {
            const { trace, checked } = action.payload
            state.result.fill(checked, trace, trace + 1)
        },
        pushResultAction: (state, action) => {
            state.result.push(action.payload)
        }
    },
    extraReducers: (builder) => {
        builder
            //Add Result
            .addCase(addResult.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addResult.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success(action.payload)
            })
            .addCase(addResult.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                toast.error(action.payload)
            })

            //Get Results By User
            .addCase(getResultsByUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getResultsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.result = action.payload
            })
            .addCase(getResultsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.result = null;
                toast.error(action.payload)
            })

            //Get Results By User By Exam
            .addCase(getResultsByUserByExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getResultsByUserByExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.resultByExam = action.payload
            })
            .addCase(getResultsByUserByExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.resultByExam = null;
                toast.error(action.payload)
            })
    }
})

export const { setUserId, pushResultAction, updateResultAction, RESET_RESULT } = resultSlice.actions
export default resultSlice.reducer