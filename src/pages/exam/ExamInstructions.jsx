import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getExam } from '../../../redux/features/quiz/quizSlice'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'

const ExamInstructions = () => {
    const { singleExam, isLoading } = useSelector(state => state.quiz)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { examId } = useParams()

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    let interval; 
    useEffect(() => {
        dispatch(getExam(examId));
        // return () => clearInterval(interval);

    }, [dispatch, examId]);

    useEffect(() => {
        if (!singleExam) return;
        const deadline = singleExam.dedline;
        const getTime = () => {
            const time = Date.parse(deadline) - Date.now();

            setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
            setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
            setMinutes(Math.floor((time / 1000 / 60) % 60));
            setSeconds(Math.floor((time / 1000) % 60));
        };

        getTime(); // Update the time immediately when the component is mounted

        interval = setInterval(() => getTime(), 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [singleExam]);
    if (isLoading) {
        return <Loader />;
    }

    const startExam = () => {
        if (!user.isVerified) {
            return toast.error("You are not verified please Verify your Email");
        }
        navigate(`/exam/${singleExam?._id}/start`);
    };

    return (
        <div className='mx-w-[1240px] px-8 mx-auto w-full'>
            <div className='p-10 w-full flex justify-center flex-col'>
                {/* <h1 className='text-center text-[20px] font-medium my-5'>Deadline: {days}:{hours}:{minutes}:{seconds}</h1> */}
                <h1 className='font-bold text-[30px] text-center pb-[20px]'>Instructions for the {singleExam?.name}</h1>
                <ul className='text-[18px] mx-auto flex flex-col list-disc'>
                    <li>Exam must be completed in 10 minutes</li>
                    <li>Total Marks: 3</li>
                    <li>Passing Marks: 2</li>
                    <li>Total Questions: 10</li>
                    <li>Each question carries 3 Marks</li>
                    <li>You can review your answers before submitting</li>
                    <li>Once submitted, you cannot review your answers</li>
                    <li>Once submitted, you cannot retake the exam</li>
                </ul>
                <div className='w-full flex justify-center pt-6'>
                    <div onClick={startExam}>
                        <Link className='p-[10px] bg-[#1084da] text-white'>Start Exam</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamInstructions;
