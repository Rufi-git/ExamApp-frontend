import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Questions from "../../components/Questions"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Loader from '../../components/Loader';
import { RESET_QUIZ, moveNextQuestion, movePrevQuestion } from '../../../redux/features/quiz/quizSlice';
import { RESET_RESULT, addResult, pushResultAction } from '../../../redux/features/quiz/resultSlice';
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/helper';

const Quiz = () => {
    const { queue, trace } = useSelector((state) => state.quiz);
    const { result } = useSelector((state) => state.result);

    const [checked, setChecked] = useState();
    const { examId } = useParams()

    const dispatch = useDispatch();
    const navigate = useNavigate()

    const movePrev = (e) => {
        e.preventDefault()
        if (trace > 0)
            dispatch(movePrevQuestion())

        if (result.length <= trace) {
            dispatch(pushResultAction(checked))
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
        setChecked(undefined)
    }

    const isLastQuestion = queue.length === trace + 1

    const calculateResultData = (newResult) => {
        const totalPoints = queue.length * 10;
        const attempts = attempts_Number(newResult);
        const earnPoints = earnPoints_Number(newResult, 10, queue);
        const flag = flagResult(totalPoints, earnPoints);

        return {
            attempts,
            earnPoints,
            isPassed: flag,
        };
    };

    const finishExam = async () => {
        await dispatch(pushResultAction(checked));

        const newResult = [...result, checked];

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
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
           
            <div className=" shadow-lg rounded-lg p-6 px-6 py-8 w-[700px]">
                <div className='flex justify-between'>
                    <h1 className="text-3xl mb-8">{trace + 1}/{queue.length}</h1>
                    <h1 className="text-3xl font-bold mb-8">Timer</h1>
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
                            Prev
                        </button> :
                        <div></div>}

                    {!isLastQuestion ?
                        <button
                            onClick={moveNext}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Next
                        </button>
                        :
                        <button
                            onClick={finishExam}
                            className="bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                        >
                            Finish</button>
                    }
                    {/* <button
                        className="bg-orange-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                    >
                        Finish
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
