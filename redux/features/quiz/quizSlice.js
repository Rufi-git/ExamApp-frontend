import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import quizService from "./quizService";

const initialState = {
    singleTag: null,
    singleExam: null,
    questions: null,
    tags: [],
    exams: [],
    myExams: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    queue: [],
    answers: [],
    trace: 0,
}

// Get Tags
export const getTags = createAsyncThunk(
    "quiz/getTags",
    async (_, thunkAPI) => {
        try {
            return await quizService.getTags()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get Exams By Tag
export const getExamsByTag = createAsyncThunk(
    "quiz/getExamsByTag",
    async (id, thunkAPI) => {
        try {
            return await quizService.getExamsByTag(id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Add Exam
export const addExam = createAsyncThunk(
    "quiz/addExam",
    async (examData, thunkAPI) => {
        try {
            return await quizService.addExam(examData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get Tag
export const getTag = createAsyncThunk(
    "quiz/getTag",
    async (id, thunkAPI) => {
        try {
            return await quizService.getTag(id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Add Tag
export const addTag = createAsyncThunk(
    "quiz/addTag",
    async (tagData, thunkAPI) => {
        try {
            return await quizService.addTag(tagData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

// Get Exam
export const getExam = createAsyncThunk(
    "quiz/getExam",
    async (id, thunkAPI) => {
        try {
            return await quizService.getExam(id)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Edit Exam
export const editExam = createAsyncThunk(
    "quiz/editExam",
    async ({ examData, examId }, thunkAPI) => {
        try {
            return await quizService.editExam(examData, examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete Exam
export const deleteExam = createAsyncThunk(
    "quiz/deleteExam",
    async (examId, thunkAPI) => {
        try {
            return await quizService.deleteExam(examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Add Question
export const addQuestion = createAsyncThunk(
    "quiz/addQuestion",
    async ({ examId, questionData }, thunkAPI) => {
        try {
            return await quizService.addQuestion(examId, questionData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Edit Tag
export const editTag = createAsyncThunk(
    "quiz/editTag",
    async ({ tagId, tagData }, thunkAPI) => {
        try {
            return await quizService.editTag(tagId, tagData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Question By Exam
export const getQuestionByExam = createAsyncThunk(
    "quiz/getQuestionByExam",
    async (examId, thunkAPI) => {
        try {
            return await quizService.getQuestionByExam(examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Add Exam To User
export const addExamToUser = createAsyncThunk(
    "quiz/addExamToUser",
    async (examId, thunkAPI) => {
        try {
            return await quizService.addExamToUser(examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Get Exams By User
export const getExamsByUser = createAsyncThunk(
    "quiz/getExamsByUser",
    async (_, thunkAPI) => {
        try {
            return await quizService.getExamsByUser()
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete My Exam
export const deleteMyExam = createAsyncThunk(
    "quiz/deleteMyExam",
    async (examId, thunkAPI) => {
        try {
            return await quizService.deleteMyExam(examId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Delete Question
export const deleteQuestion = createAsyncThunk(
    "quiz/deleteQuestion",
    async (questionId, thunkAPI) => {
        try {
            return await quizService.deleteQuestion(questionId)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

//Edit Question
export const editQuestion = createAsyncThunk(
    "quiz/editQuestion",
    async ({ questionId, questionData }, thunkAPI) => {
        try {
            return await quizService.editQuestion(questionId, questionData)
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)
                || error.message || error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    }
)

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        RESET_QUIZ(state) {
            state.queue = [],
                state.answers = [],
                state.trace = 0
        },
        startExamAction: (state, action) => {
            return {
                ...state,
                queue: action.payload
            }
        },
        moveNextQuestion: (state) => {
            return {
                ...state,
                trace: state.trace + 1
            }
        },
        movePrevQuestion: (state) => {
            return {
                ...state,
                trace: state.trace - 1
            }
        }
    },
    extraReducers: (builder) => {
        builder
            //Get Tags
            .addCase(getTags.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.tags = action.payload;
            })
            .addCase(getTags.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.tags = null;
                toast.error(action.payload)
            })

            //Get Exams By Tag
            .addCase(getExamsByTag.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getExamsByTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.exams = action.payload;
            })
            .addCase(getExamsByTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.exams = null;
                toast.error(action.payload)
            })

            //Add Exam
            .addCase(addExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Exam added successfully")
            })
            .addCase(addExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Get Exam
            .addCase(getTag.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.singleTag = action.payload;
            })
            .addCase(getTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.singleTag = null
                toast.error(action.payload)
            })

            //Add Tag
            .addCase(addTag.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                toast.success("Tag added successfully")
            })
            .addCase(addTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Get Exam
            .addCase(getExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.singleExam = action.payload
            })
            .addCase(getExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Edit Exam
            .addCase(editExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(editExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success(action.payload)
            })
            .addCase(editExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Delete Exam
            .addCase(deleteExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.message = action.payload;
                toast.success(action.payload)
            })
            .addCase(deleteExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Add Question
            .addCase(addQuestion.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success("Question added")
            })
            .addCase(addQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Edit Tag
            .addCase(editTag.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(editTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload)
            })
            .addCase(editTag.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Get Question By Exam
            .addCase(getQuestionByExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getQuestionByExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.queue = action.payload
            })
            .addCase(getQuestionByExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.queue = []
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Add Exam To User
            .addCase(addExamToUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addExamToUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.myExams.push(action.payload);
                toast.success("Exam bought successfully")
            })
            .addCase(addExamToUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Get Exams By User
            .addCase(getExamsByUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getExamsByUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                state.myExams = action.payload
            })
            .addCase(getExamsByUser.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Delete My Exam
            .addCase(deleteMyExam.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteMyExam.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload)
            })
            .addCase(deleteMyExam.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Delete Question
            .addCase(deleteQuestion.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(deleteQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload)
            })
            .addCase(deleteQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })

            //Edit Question
            .addCase(editQuestion.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(editQuestion.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.isError = false;
                toast.success(action.payload)
            })
            .addCase(editQuestion.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                toast.error(action.payload)
            })
    }
})

export const { RESET_QUIZ, startExamAction, moveNextQuestion, movePrevQuestion } = quizSlice.actions
export default quizSlice.reducer