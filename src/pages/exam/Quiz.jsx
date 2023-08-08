import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Questions from '../../components/Questions';
import { RESET_QUIZ, getExam, moveNextQuestion, movePrevQuestion } from '../../../redux/features/quiz/quizSlice';
import { RESET_RESULT, addResult, pushResultAction } from '../../../redux/features/quiz/resultSlice';
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/helper';
import Loader from '../../components/Loader';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCheckCircle } from 'react-icons/fa';


const Quiz = () => {
    const { queue, trace, singleExam } = useSelector((state) => state.quiz);
    const { result } = useSelector((state) => state.result);

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
                        selectedOptionIndex: checkedAnswer
                    };
                }
                return null;
            }).filter(answer => answer !== null)
        };
    };


    const finishExam = async () => {

        if (checked !== -1) {
            await dispatch(pushResultAction(checked));
        }

        const newResult = checked !== -1 ? [...result, checked] : result;

        const resultData = calculateResultData(newResult)

        await dispatch(addResult({ examId, resultData }));

        dispatch(RESET_QUIZ())
        dispatch(RESET_RESULT())

        navigate(`/exam/${examId}/result`);
    }

    const onChecked = (check) => {
        setChecked(check)
    }


    return (
        <div className="flex flex-col items-center justify-center h-screen md:bg-gray-100">
            <div className="md:shadow-lg rounded-lg p-6 px-6 py-8 w-full max-w-2xl mx-auto">
                <div className='flex justify-between mb-8'>
                    <h1 className="text-3xl font-semibold">{trace + 1}/{queue.length}</h1>
                    <h1 className="text-3xl font-bold">Timer</h1>
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
                            <FaChevronLeft className="w-6 h-6 mr-2 inline" /> Prev
                        </button> :
                        <div></div>}
                    {!isLastQuestion ?
                        <button
                            onClick={moveNext}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Next <FaChevronRight className="w-6 h-6 ml-2 inline" />
                        </button>
                        :
                        <button
                            onClick={finishExam}
                            className="bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Finish <FaCheckCircle className="w-6 h-6 ml-2 inline" /></button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Quiz;
