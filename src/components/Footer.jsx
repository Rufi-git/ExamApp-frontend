import React from 'react'
import logo3 from "../assets/mathlogo3.png"
import { PiPhoneCallDuotone } from "react-icons/pi"
import { HiOutlineMailOpen } from "react-icons/hi"
import { BsFacebook, BsInstagram, BsLinkedin, BsYoutube } from "react-icons/bs"

const Footer = () => {
    return (
        <div className='px-4 max-w-[1440px] mx-auto py-10'>
            <div className='grid lg:grid-cols-4 grid-cols-2 text-[#eee] gap-8 justify-center'>
                <div className='col-span-2 lg:col-span-1'>
                    <img src={logo3} alt="math logo" />
                    <p className='leading-[32px] mt-3'>Oxuyan platforması online sınaq imtahanları, yarışlar, müsabiqələr, online test bazası və suallar ilə hər kəs üçün bərabər təhsili hədəfləyir. Təhsil layihəmiz magistr, ibtidai sinif, orta məktəb, abituriyent, müəllim, xaricdə təhsil almaq və bir çox başqa növ sınaq imtahanında iştirak etmək istəyənlər üçündür.</p>
                </div>
                <div>
                    <h1 className='text-[20px] font-bold'>Servislər</h1>
                    <ul className='flex flex-col gap-2 mt-3'>
                        <li>İmtahan sistemi</li>
                        <li>Atalar sözləri</li>
                        <li>Bloq</li>
                        <li>Xəbərlər</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-[20px] font-bold'>Faydalı linklər</h1>
                    <ul className='flex flex-col gap-2 mt-3'>
                        <li>Haqqımızda</li>
                        <li>Əlaqə</li>
                    </ul>
                </div>
                <div>
                    <h1 className='text-[20px] font-bold'>Dəstək</h1>
                    <ul className='flex flex-col gap-2 mt-3'>
                        <li>İstifadəçi Razılaşması</li>
                        <li>Məxfilik Siyasəti</li>
                        <li>Ödəniş Şərtləri və Qaydaları</li>
                        <li>Partnyorluq Müqaviləsi</li>
                    </ul>
                </div>
            </div>
            <div className='text-white mt-10'>
                <div className='flex justify-around py-5 bg-[#1e1e1e]'>
                    <div className='flex items-center'>
                        <div className='lg:text-[55px] text-[35px] text-[#28e688]'><PiPhoneCallDuotone /></div>
                        <div className='ml-4'>
                            <h1 className='font-bold lg:text-[20px] text-sm'>Əlaqə Nömrəmiz</h1>
                            <p className='text-[#6a7695]'>+994 77 399 99 66</p>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <div className='lg:text-[55px] text-[35px] text-[#dac900]'><HiOutlineMailOpen /></div>
                        <div className='ml-4'>
                            <h1 className='font-bold lg:text-[20px] text-sm'>ELEKTRON ÜNVAN</h1>
                            <p className='text-[#6a7695]'>info@oxuyan.az</p>
                        </div>
                    </div>
                </div>
                <div className='mt-5 flex md:flex-row flex-col gap-3 justify-between items-center'>
                    <div className='text-[#8d8f94]'>
                        <h1 className='flex gap-2 items-center'>
                            <span className='font-bold'>Oxuyan</span>
                            <span>© 2021 Bütün hüquqlar qorunur</span>
                        </h1>
                    </div>
                    <ul className='flex gap-5 text-[20px]'>
                        <li>{<BsFacebook />}</li>
                        <li>{<BsYoutube />}</li>
                        <li>{<BsInstagram />}</li>
                        <li>{<BsLinkedin />}</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer