import { Link } from "react-router-dom"

const InfoBox = ({ bgColor, title, count, icon }) => {
    return (
        
                <Link to="" class={`flex gap-5 flex-col items-center px-4 ${bgColor} border border-gray-200 rounded-lg shadow md:flex-row max-w-[400px]  dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700`}>
                    <div className='text-[30px]'>
                        {icon}
                    </div>
                    <div class="flex flex-col justify-between py-2 leading-normal">
                        <h5 class="mb-1 text-xl  dark:text-white">{title}</h5>
                        <p class="mb-3 font-bold text-[20px]  dark:text-gray-400">{count}</p>
                    </div>
                </Link>

    )
}

export default InfoBox