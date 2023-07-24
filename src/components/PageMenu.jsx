import { Link, NavLink } from "react-router-dom"
import { AdminTeacherLink } from "./protect/hiddenLink"
const PageMenu = () => {
    return (
        <div className="bg-[#1084da] py-2 mb-10">
            <ul className="text-white flex justify-around">
                <NavLink to={"/profile"} className="text-[20px]">
                    <li>Profile</li>
                </NavLink>
                <NavLink to={"/changePassword"} className="text-[20px]">
                    <li>Change Password</li>
                </NavLink>
                <AdminTeacherLink>
                    <NavLink to={"/users"} className="text-[20px]">
                        <li>Users</li>
                    </NavLink>
                </AdminTeacherLink>
            </ul>
        </div>
    )
}

export default PageMenu