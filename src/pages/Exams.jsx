import { useEffect, useState } from 'react'
import { HiUsers } from "react-icons/hi"
import { BiSolidUserCheck, BiUserMinus, BiUserX } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import PageMenu from '../components/PageMenu'
import Categories from "../components/Categories"
import ExamList from "../components/ExamList"


import useRedirectLoggedOutUser from '../customHook/useRedirectLoggedOutUser'
import { Link, useParams } from 'react-router-dom'
import { AdminTeacherLink } from '../components/protect/hiddenLink'

const Exams = () => {
    useRedirectLoggedOutUser("/login")
    const { id } = useParams()
    return (
        <div className="bg-gray-50">
            <div className="mx-auto max-w-screen-2xl px-2 py-10">
                <PageMenu />
                <div className='w-full'>
                    <AdminTeacherLink>
                        <Link to={`/examAdd/${id}`} className='bg-[#1084da] border text-white px-6 py-2 rounded-sm ml-auto flex w-[130px] mb-5'>Add Exam</Link>
                    </AdminTeacherLink>
                    <div>
                        <ExamList />
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Exams;