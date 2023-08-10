import { AiTwotoneMail } from "react-icons/ai"
import forgot from "../../assets/forgotPass.jpg"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { RESET, forgotPassword } from "../../../redux/features/auth/authSlice"
import { validateEmail } from "../../../redux/features/auth/authService"
import Spinner from "../../components/Spinner"

const Forgot = () => {
    const [email, setEmail] = useState("")
    const dispatch = useDispatch()
    const { isLoading } = useSelector(state => state.auth)

    const handleForgot = async (e) => {
        e.preventDefault();

        // Validation
        if (!email) {
            return toast.error("Please enter an email")
        }
        if (!validateEmail(email)) {
            return toast.error("Invalid email address")
        }

        const userData = {
            email
        }

        await dispatch(forgotPassword(userData))
        await dispatch(RESET())
    }

    return (
        <div className="bg-[#f8f8f8] h-screen flex items-center">
            <div className="flex items-center gap-14 mx-auto px-[100px] py-[70px] shadow-md rounded-md max-w-[1240px] bg-white p-5">
                <div className="w-[350px]">
                    <img src={forgot} alt="" className="w-full" />
                </div>
                <div>
                    <h1 className="font-bold text-[30px]">Forgot Password</h1>
                    <form className="mt-[45px]" onSubmit={handleForgot}>
                        <div className="pb-1 flex gap-3 items-center border-b border-black">
                            <AiTwotoneMail />
                            <input value={email} name="email" onChange={(e) => setEmail(e.target.value)} className="tracking-wide focus:placeholder:text-black w-[300px] outline-none" type="email" placeholder="Your Email" />
                        </div>
                        {
                            isLoading ?
                                <button className="bg-[#6dabe4] mt-6 w-[120px] flex justify-center text-white py-3 px-9 rounded-md text-sm" disabled><Spinner /></button>
                                :
                                <button className="bg-[#6dabe4] mt-6 text-white py-3 px-9 rounded-md text-sm hover:bg-[#1084da]" type="submit">Get Reset Email</button>
                            }
                    </form>
                    <div className="mt-3 flex justify-between">
                        <Link to="/" className=" underline ml-2">Home</Link>
                        <Link to="/login" className=" underline ml-2">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot