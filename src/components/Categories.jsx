import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import { LuSchool2 } from "react-icons/lu"

const Categories = () => {
    const [tags, setTags] = useState([]);
    return (
        <div className="bg-[#f7f8fc] my-10">
            <div className="px-[30px] sm:px-[100px] md:px-[150px] lg:px-[200px] max-w-[1240px] mx-auto py-10">
                <div className="text-center flex items-center flex-col">
                    <p className="uppercase text-[#1084da]">Ən çox işlənənlər</p>
                    <h1 className="font-extrabold text-[35px] mt-3 mb-1 text-[#373d46]">İmtahan Kateqoriyaları</h1>
                    <div className="h-[3px] w-[70px] bg-[#1084da] mb-12"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                    <Link className="bg-white border py-7 px-2 flex flex-col items-center justify-center">
                        <div className="flex justify-center items-center w-[50px] h-[50px] bg-gradient-to-tr from-[#2084da] to-[#44d8b1] rounded-full">
                            <LuSchool2 className="text-white  fa-solid fa-school text-[24px]" />
                        </div>
                        <h1 className="font-extrabold text-[17px] mt-2 text-[#373d46] text-center">Ibtidai sinif</h1>
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Categories