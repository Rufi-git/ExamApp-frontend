import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Layout from "./components/Layout"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import Forgot from "./pages/auth/Forgot"
import Reset from "./pages/auth/Reset"
import LoginWithCode from "./pages/auth/LoginWithCode"
import Verify from "./pages/auth/Verify"
import Profile from "./pages/profile/Profile"
import ChangePassword from "./pages/auth/changePassword"
import UserList from "./pages/profile/UserList"
import Loader from "./components/Loader"
import axios from "axios"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "../redux/features/auth/authSlice"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Tags from "./pages/Tags"
import ExamAdd from "./pages/admin/ExamAdd"
import TagAdd from "./pages/admin/TagAdd"
import Exams from "./pages/Exams"
import ExamEdit from "./pages/admin/ExamEdit"
import QuestionAdd from "./pages/admin/QuestionAdd"
import TagEdit from "./pages/admin/TagEdit"
import ExamInstructions from "./pages/exam/ExamInstructions"
import Questions from "./components/Questions"
import Quiz from "./pages/exam/Quiz"
import Result from "./pages/exam/Result"
import MyResults from "./pages/exam/MyResults"
axios.defaults.withCredentials = true


function App() {
  const dispatch = useDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getLoginStatus())

    if (isLoggedIn && user === null) {
      dispatch(getUser())
    }

  }, [dispatch, isLoggedIn, user])

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {/* <Loader /> */}
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Routes>
            <Route index exact
              element={
                <Layout>
                  <Home />
                </Layout>
              } />

            <Route path="/login" exact
              element={
                <Login />
              } />

            <Route path="/register" exact
              element={
                <Register />
              } />

            <Route path="/forgot" exact
              element={
                <Forgot />
              } />

            <Route path="/resetPassword/:resetToken" exact
              element={
                <Reset />
              } />

            <Route path="/loginWithCode/:email" exact
              element={
                <LoginWithCode />
              } />

            <Route path="/verify/:verificationToken" exact
              element={
                <Verify />
              } />

            <Route path="/profile" exact
              element={
                <Layout>
                  <Profile />
                </Layout>
              } />

            <Route path="/changePassword" exact
              element={
                <Layout>
                  <ChangePassword />
                </Layout>
              } />

            <Route path="/users" exact
              element={
                <Layout>
                  < UserList />
                </Layout>
              } />

            <Route path="/tags" exact
              element={
                <Layout>
                  < Tags />
                </Layout>
              } />

            <Route path="/exams/:id" exact
              element={
                <Layout>
                  <Exams />
                </Layout>
              } />

            <Route path="/exam/:id" exact
              element={
                <Layout>
                  <Exams />
                </Layout>
              } />

            <Route path="/examAdd/:id" exact
              element={
                <Layout>
                  <ExamAdd />
                </Layout>
              } />

            <Route path="/tagAdd" exact
              element={
                <Layout>
                  <TagAdd />
                </Layout>
              } />

            <Route path="/exam/edit/:examId" exact
              element={
                <Layout>
                  <ExamEdit />
                </Layout>
              } />

            <Route path="/exam/:examId/addQuestion" exact
              element={
                <Layout>
                  <QuestionAdd />
                </Layout>
              } />

            <Route path="/exam/details/:examId" exact
              element={
                <Layout>
                  <ExamInstructions />
                </Layout>
              } />

            <Route path="/exam/:examId/start" exact
              element={
                <Quiz />
              } />
            <Route path="/exam/:examId/result" exact
              element={
                <Result />
              } />

            <Route path="/tag/edit/:tagId" exact
              element={
                <Layout>
                  <TagEdit />
                </Layout>
              } />

            <Route path="/myResults" exact
              element={
                <Layout>
                  <MyResults />
                </Layout>
              } />
          </Routes>
        </GoogleOAuthProvider>
      </BrowserRouter>

    </>
  )
}

export default App
