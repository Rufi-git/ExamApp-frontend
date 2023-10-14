import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Questions from '../../components/Questions';
import { RESET_QUIZ, getExam, moveNextQuestion, movePrevQuestion } from '../../../redux/features/quiz/quizSlice';
import { RESET_RESULT, addResult, pushResultAction } from '../../../redux/features/quiz/resultSlice';
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/helper';
import { useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';
import Spinner from '../../components/Spinner';

const Quiz = () => {
    const { queue, trace, singleExam } = useSelector((state) => state.quiz);
    const { result, isLoading } = useSelector((state) => state.result);
    const [counter, setCounter] = useState(localStorage.getItem('quizCountdown') || singleExam.duration);
    const [aboutToEnd, setAboutToEnd] = useState(false)
    const [checked, setChecked] = useState(-1);
    const { examId } = useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getExam(examId))
    }, [dispatch])

    const movePrev = (e) => {
        e.preventDefault();
        if (trace > 0) {
            dispatch(movePrevQuestion());
        }

        if (checked !== -1 && result.length <= trace) {
            dispatch(pushResultAction(checked));
        }
    }

    const moveNext = (e) => {
        e.preventDefault()

        if (trace < queue.length) {
            dispatch(moveNextQuestion())
            if (result.length <= trace) {
                dispatch(pushResultAction(checked))
            }
        }
        setChecked(-1)
    }

    const isLastQuestion = queue.length === trace + 1

    const calculateResultData = (newResult) => {
        const totalPoints = singleExam.passingMarks;
        const attempts = attempts_Number(newResult);
        const earnPoints = earnPoints_Number(newResult, singleExam.totalMarks, queue);
        const flag = flagResult(totalPoints, earnPoints);

        return {
            attempts,
            earnPoints: Math.floor(earnPoints),
            isPassed: flag,
            userAnswers: newResult.map((checkedAnswer, index) => {
                if (index < queue.length) {
                    return {
                        questionId: queue[index]._id,
                        selectedOptionIndex: Number(checkedAnswer),
                    };
                }
                return null;
            }).filter(answer => answer !== null),
        };
    };


    const finishExam = async () => {
        if (checked !== -1) {
            await dispatch(pushResultAction(checked));
        }

        const newResult = checked !== -1 ? [...result, checked] : result;

        const resultData = calculateResultData(newResult)

        await dispatch(addResult({ examId, resultData }));

        localStorage.removeItem('quizCountdown');

        dispatch(RESET_QUIZ())
        dispatch(RESET_RESULT())

        navigate(`/exam/${examId}/result`);
    }

    const onChecked = (check) => {
        setChecked(check)
    }

    const calculateRemainingTime = () => {
        const minutes = Math.floor(counter / 60);
        const seconds = counter % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        localStorage.setItem('quizCountdown', counter);

        if (counter == 0) {
            finishExam()
        }
        if (counter <= 10) setAboutToEnd(true)
    }, [counter]);

    return (
        singleExam &&

        <div className="flex flex-col items-center justify-center h-screen md:bg-gray-100">
            <div className="md:shadow-lg rounded-lg p-6 px-6 py-8 w-full max-w-2xl mx-auto">
                <div className='flex justify-between mb-8'>
                    <h1 className="text-3xl font-semibold">{trace + 1}/{queue.length}</h1>

                    <h1 className={`text-3xl font-semibold ${aboutToEnd && "text-[red]"}`}>
                        {calculateRemainingTime()}
                    </h1>
                </div>
                <div className="w-full">
                    <Questions onChecked={onChecked} />
                </div>
                <div className="flex justify-between mt-6">
                    {trace > 0 ?
                        <button
                            onClick={movePrev}
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            <FaChevronLeft className="w-6 h-6 mr-2 inline" /> Geri
                        </button> :
                        <div></div>}
                    {!isLastQuestion ?
                        <button
                            onClick={moveNext}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            İrəli <FaChevronRight className="w-6 h-6 ml-2 inline" />
                        </button>
                        :


                        isLoading ?
                            <button className="bg-orange-500 w-[100px] flex justify-center text-white py-2 px-4 rounded-md text-sm" disabled><Spinner /></button>
                            :
                            <button
                                onClick={finishExam}
                                className="bg-orange-500 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                            >
                                Finish <FaCheckCircle className="w-6 h-6 ml-2 inline" /></button>


                    }
                </div>
            </div>
        </div>
    );
};

export default Quiz;
