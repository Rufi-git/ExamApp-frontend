import { Link, NavLink } from "react-router-dom"
import { AdminTeacherLink } from "./protect/hiddenLink"
import { useSelector } from "react-redux"
const PageMenu = () => {
    const { result } = useSelector(state => state.result)
    return (
        <div className="bg-[#1084da] py-2 mb-10">
            <ul className="text-white flex justify-around">
                <NavLink to={"/profile"} className="text-[20px]">
                    <li>Profile</li>
                </NavLink>
                {
                    result && result.length > 0 &&
                    <NavLink to={"/myResults"} className="text-[20px]">
                        <li>My Results</li>
                    </NavLink>
                }

                <NavLink to={"/myExams"} className="text-[20px]">
                    <li>My Exams</li>
                </NavLink>
                <NavLink to={"/changePassword"} className="text-[20px]">
                    <li>Change Password</li>
                </NavLink>
                <AdminTeacherLink>
                    <NavLink to={"/users"} className="text-[20px]">
                        <li>Users</li>
                    </NavLink>
                    <NavLink to={"/tags"} className="text-[20px]">
                        <li>Exams</li>
                    </NavLink>
                </AdminTeacherLink>
            </ul>
        </div>
    )
}

export default PageMenu