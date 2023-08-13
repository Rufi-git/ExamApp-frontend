import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionByExam } from '../../redux/features/quiz/quizSlice';
import { useParams } from 'react-router-dom';

const QuestionList = () => {
    const dispatch = useDispatch()

    const { queue } = useSelector(state => state.quiz)

    const { examId } = useParams()

    useEffect(() => {
        dispatch(getQuestionByExam(examId))
    }, [dispatch])

    return (
        <div>
            {queue && queue.map((question) => (
                <div key={question._id} className="mb-4">
                    <p className="font-medium">Sual {index + 1}:</p>
                    <p className='my-3'>{question.name}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {question.options.map((option, optionIndex) => (
                            <div key={optionIndex} className={`flex items-center ${option.isCorrect ? 'border-[#1084da] border' : ''}`}>
                                <input
                                    type="radio"
                                    name={`question_${index}`}
                                    id={`question_${index}_option${optionIndex}`}
                                    className="hidden"
                                />
                                <label
                                    htmlFor={`question_${index}_option${optionIndex}`}
                                    className={`${option.isCorrect ? 'text-[#1084da]' : 'text-gray-700'
                                        } border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}
                                >
                                    {option.text}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default QuestionList