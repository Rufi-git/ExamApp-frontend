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
          </Routes>
        </GoogleOAuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App
