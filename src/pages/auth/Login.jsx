import { AiTwotoneMail } from "react-icons/ai"
import { MdPassword } from "react-icons/md"
import { BsEye, BsEyeSlash } from "react-icons/bs"

import loginImg from "../../assets/login.png"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { RESET, login, loginWithGoogle, sendLoginCode } from "../../../redux/features/auth/authSlice"
import { validateEmail } from "../../../redux/features/auth/authService"
import Spinner from "../../components/Spinner"
import { GoogleLogin } from '@react-oauth/google';

const initialState = {
    email: "",
    password: "",
}

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { isLoading, isLoggedIn, isSuccess, message, isError, twoFactor } = useSelector(state => state.auth)


    const [userData, setUserData] = useState(initialState)
    const { email, password } = userData
    const [showPassword, setShowPassword] = useState(false)

    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            return toast.error("Please fill all required fields")
        }
        if (!validateEmail(email)) {
            return toast.error("Invalid email address")
        }

        const userData = {
            email, password
        }

        await dispatch(login(userData))
    }

    useEffect(() => {
        if (isSuccess && isLoggedIn) {
            navigate("/profile")
        }

        if (isError && twoFactor) {
            dispatch(sendLoginCode(email))
            navigate(`/loginWithCode/${email}`)
        }

        dispatch(RESET())
    }, [isLoggedIn, isSuccess, isError, twoFactor, email, dispatch, navigate])

    const googleLogin = async (credentialResponse) => {
        await dispatch(loginWithGoogle({ userToken: credentialResponse.credential }))
    }

    return (
        <div className="bg-[#f8f8f8] h-screen flex items-center">
            <div className="flex items-center gap-10 mx-auto px-[100px] py-[70px] shadow-md rounded-md max-w-[1240px] bg-white p-5">
                <div>
                    <img src={loginImg} alt="" />
                </div>
                <div>
                    <h1 className="font-bold text-[30px]">Daxil ol</h1>
                    <form className="mt-[55px]" onSubmit={handleLogin}>
                        <div className="pb-1 flex gap-3 items-center border-b border-black">
                            <AiTwotoneMail />
                            <input value={email} name="email" onChange={handleInputChange} className="tracking-wide focus:placeholder:text-black w-[300px] outline-none" type="email" placeholder="Your Email" />
                        </div>
                        <div className="mt-6 pb-1 flex gap-3 items-center border-b border-black">
                            <MdPassword />
                            <input value={password} name="password" onChange={handleInputChange} className="tracking-wide focus:placeholder:text-black w-[300px] outline-none" type={`${showPassword ? "text" : "password"}`} placeholder="Your Password" />
                            <div onClick={togglePassword} className="text-[20px] cursor-pointer">
                                {!showPassword
                                    ? <BsEye />
                                    : <BsEyeSlash />
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            <GoogleLogin
                                onSuccess={googleLogin}
                                onError={() => {
                                    toast.error('Login Failed');
                                }}
                            />
                        </div>

                        <div className="mt-3">
                            <Link to="/forgot" className="underline">Forgot Password</Link>
                        </div>
                        {
                            isLoading ?
                                <button className="bg-[#6dabe4] mt-6 w-[120px] flex justify-center text-white py-3 px-9 rounded-md text-sm" disabled><Spinner /></button>
                                :
                                <button className="bg-[#6dabe4] mt-6 w-[120px] text-white py-3 px-9 rounded-md text-sm hover:bg-[#1084da]" type="submit">Daxil ol</button>
                        }
                    </form>
                    <div className="mt-3">
                        <span>Don't you have an account?</span>
                        <Link to="/register" className=" underline ml-2">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login