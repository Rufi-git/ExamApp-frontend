import { Link, NavLink } from "react-router-dom"
import { AdminTeacherLink } from "./protect/hiddenLink"
import { useSelector } from "react-redux"
const PageMenu = () => {
    const { result } = useSelector(state => state.result)
    return (
        <div className="px-4 bg-[#1084da] py-3 mb-10">
            <ul className="text-sm gap-5 text-white flex justify-around flex-wrap">
                <NavLink to={"/"} className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                    <li>Home</li>
                </NavLink>
                <NavLink to={"/profile"} className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                    <li>Profile</li>
                </NavLink>
                <NavLink to={"/myResults"} className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                    <li>My Results</li>
                </NavLink>
                <NavLink to={"/myExams"} className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                    <li>My Exams</li>
                </NavLink>
                <NavLink to={"/changePassword"} className={({ isActive }) =>
                    isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                    <li>Change Password</li>
                </NavLink>
                <AdminTeacherLink>
                    <NavLink to={"/users"} className={({ isActive }) =>
                        isActive ? "border-b-2 pb-1 border-white text-[20px] whitespace-nowrap" : "text-[20px] whitespace-nowrap"}>
                        <li>Users</li>
                    </NavLink>
                </AdminTeacherLink>
            </ul>
        </div>
    )
}

export default PageMenu