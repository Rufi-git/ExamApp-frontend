import axios from "axios"

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
export const API_URL = `${BACKEND_URL}/api/quiz/`

//Get Tags
const getTags = async () => {
    const response = await axios.get(API_URL + "getTags")
    return response.data
}

//Get Exams
const getExamsByTag = async (id) => {
    const response = await axios.get(API_URL + "getExamsByTag/" + id)
    return response.data
}

//Add Exam
const addExam = async (examData) => {
    const response = await axios.post(API_URL + "addExam", examData)
    return response.data
}

//Get Exam
const getExam = async (id) => {
    const response = await axios.get(API_URL + "getExam/" + id)
    return response.data
}

//Get Tag
const getTag = async (id) => {
    const response = await axios.get(API_URL + "getTag/" + id)
    return response.data
}
//Add Tag
const addTag = async (tagData) => {
    const response = await axios.post(API_URL + "addTag", tagData)
    return response.data
}

//Edit Exam
const editExam = async (examData, examId) => {
    const response = await axios.patch(API_URL + "editExam/" + examId, examData)
    return response.data.message
}

//Delete Exam
const deleteExam = async (examId) => {
    const response = await axios.delete(API_URL + "deleteExam/" + examId)
    return response.data.message
}

//Add Question
const addQuestion = async (examId, questionData) => {
    const response = await axios.post(API_URL + "addQuestion/" + examId, questionData)
    return response.data
}

//Edit Tag
const editTag = async (tagId, tagData) => {
    const response = await axios.patch(API_URL + "editTag/" + tagId, tagData)
    return response.data.message
}

//Get Question
const getQuestionByExam = async (examId) => {
    const response = await axios.get(API_URL + "getQuestionsByExam/" + examId)
    return response.data
}

//Add Result
const addResult = async (examId, resultData) => {
    const response = await axios.post(API_URL + "addResult/" + examId, resultData)
    return response.data.message
}

//Get Results By User
const getResultsByUser = async () => {
    const response = await axios.get(API_URL + "getResultsByUser")
    return response.data
}

//Get Results By User
const getResultsByUserByExam = async (examId) => {
    const response = await axios.get(API_URL + "getResultsByUserByExam/" + examId)
    return response.data
}

//Add Exam to User
const addExamToUser = async (examId, token) => {
    const response = await axios.post(API_URL + "addExamToUser/" + examId + "?token=" + token)
    return response.data
}

//Get Exams By User
const getExamsByUser = async () => {
    const response = await axios.get(API_URL + "getExamsByUser")
    return response.data
}

//Review Result
const reviewResult = async (resultId) => {
    const response = await axios.get(API_URL + "reviewByResult/" + resultId)
    return response.data
}

//Delete My Exam
const deleteMyExam = async (examId) => {
    const response = await axios.delete(API_URL + "deleteMyExam/" + examId)
    return response.data.message
}

//Delete Question
const deleteQuestion = async (questionId) => {
    const response = await axios.delete(API_URL + "deleteQuestion/" + questionId)
    return response.data.message
}

//Edit Question
const editQuestion = async (questionId, questionData) => {
    const response = await axios.patch(API_URL + "editQuestion/" + questionId, questionData)
    return response.data.message
}



const quizService = {
    getTags,
    getExamsByTag,
    addExam,
    getTag,
    addTag,
    getExam,
    editExam,
    deleteExam,
    addQuestion,
    editTag,
    getQuestionByExam,
    addResult,
    getResultsByUser,
    getResultsByUserByExam,
    addExamToUser,
    getExamsByUser,
    reviewResult,
    deleteMyExam,
    deleteQuestion,
    editQuestion
}

export default quizService