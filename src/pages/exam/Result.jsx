import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResultTable from '../../components/ResultTable'
import { useDispatch, useSelector } from 'react-redux'

// import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from '../../components/Loader'
import { RESET_QUIZ, getExam } from '../../../redux/features/quiz/quizSlice'
import { RESET_RESULT, addResult, getResultsByUserByExam } from '../../../redux/features/quiz/resultSlice'
import { attempts_Number, earnPoints_Number, flagResult } from '../../helper/helper'

const Result = () => {
    const { examId } = useParams()
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { queue, singleExam } = useSelector(state => state.quiz)
    const { result, resultByExam, isLoading } = useSelector(state => state.result)

    const totalPoints = queue.length * 10
    const attempts = attempts_Number(result)
    const earnPoints = earnPoints_Number(result, 10, queue)
    const flag = flagResult(totalPoints, earnPoints)

    useEffect(() => {
        dispatch(getResultsByUserByExam(examId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getExam(examId));
    }, [dispatch, examId])

    const getLastResult = () => {
        if (!resultByExam || resultByExam.length === 0) return null;
        return resultByExam[resultByExam.length - 1];
    };

    const lastResult = getLastResult();


    
    const onRestart = () => {
        dispatch(RESET_QUIZ())
        dispatch(RESET_RESULT())
    }
    
    if (isLoading) {
        return <Loader />
    }

    return (
        <div className='px-8 max-w-[768px] mx-auto'>
            <h1 className='font-bold my-5 text-[30px]'>Quiz Result</h1>
            <div className=''>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Username</span>
                    <span className='font-bold'>{user?.name}</span>
                </div>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Total Quiz Points:</span>
                    <span className='font-bold'>{singleExam?.totalMarks || 0}</span>
                </div>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Total Question</span>
                    <span className='font-bold'>{singleExam?.questions.length || 0}</span>
                </div>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Total Attempts</span>
                    <span className='font-bold'>{lastResult?.attempts || 0}</span>
                </div>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Total Earn Points</span>
                    <span className='font-bold'>{lastResult?.earnPoints || 0}</span>
                </div>
                <div className='flex w-full justify-between border px-3 py-2'>
                    <span>Quiz Result</span>
                    <span className='font-bold'>{lastResult?.isPassed ?
                        <span className='text-[green] font-bold'>Passed</span> :
                        <span className='text-[red] font-bold'>Failed</span>}
                    </span>
                </div>
            </div>
            <div className='flex items-center'>
                <div className='w-full my-10 text-center' onClick={onRestart}><Link to={`/exam/details/${examId}`} className='bg-orange-500 text-white px-4 py-2'>Restart</Link></div>
                <div className='w-full my-10 text-center' onClick={onRestart}><Link to={`/myResults`} className='bg-[#1084da] text-white px-4 py-2'>My Results</Link></div>
            </div>
            <ResultTable results={resultByExam} />

        </div>
    )
}

export default Result