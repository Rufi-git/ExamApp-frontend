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
        <div className='container mx-auto max-w-[1240px] py-14 px-5'>
            <div className='bg-white p-10 rounded-lg shadow-md'>
                <h1 className='text-2xl font-bold text-center mb-6'>
                    Instructions for the {singleExam?.name}
                </h1>
                <div className='flex justify-center'>
                    <ul className='list-disc pl-6 space-y-2 text-left'>
                        <li>Exam must be completed in {`${Math.floor(singleExam?.duration / 60)} minutes ${singleExam?.duration % 60} seconds`}</li>
                        <li>Total Marks: {singleExam?.totalMarks}</li>
                        <li>Passing Marks: {singleExam?.passingMarks}</li>
                        <li>Total Questions: {singleExam?.questions.length}</li>
                        <li>Each question carries {Math.floor(singleExam?.totalMarks / singleExam?.questions.length)} Marks</li>
                        <li>You can review your answers before submitting</li>
                        <li>Once submitted, you can review your answers</li>
                        <li>Once submitted, you can retake the exam</li>
                    </ul>
                </div>
                <div className='flex justify-center mt-6'>
                    <div onClick={startExam}>
                        <Link className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
                            Start Exam
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamInstructions;
