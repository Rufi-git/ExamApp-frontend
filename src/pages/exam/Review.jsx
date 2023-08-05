import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { reviewResult } from '../../../redux/features/quiz/resultSlice';
import { getQuestionByExam } from '../../../redux/features/quiz/quizSlice';
import Loader from '../../components/Loader';

const Review = () => {
  const dispatch = useDispatch();

  const { review, isLoading } = useSelector(state => state.result);

  const { resultId } = useParams();

  useEffect(() => {
    dispatch(reviewResult(resultId));
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='max-w-[1440px] px-4 mx-auto py-10'>
      {review.examId?.questions &&
        review.examId?.questions.map((question, index) => (
          <div key={index} className='mb-4'>
            <p className='font-medium'>Sual {index + 1}:</p>
            <p className='my-3'>{question.name}</p>
            <div className='grid grid-cols-2 gap-3'>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`flex items-center ${
                    option.isCorrect
                      ? 'border-green-500 border'
                      : ''
                  } ${
                    review.userAnswers &&
                    review.userAnswers[index]?.selectedOptionIndex ===
                      optionIndex &&
                    option.isCorrect
                      ? 'border-green-500'
                      : review.userAnswers[index]?.selectedOptionIndex ===
                        optionIndex
                      ? 'border-red-500'
                      : ''
                  }`}
                >
                  <input
                    type='radio'
                    name={`question_${index}`}
                    id={`question_${index}_option${optionIndex}`}
                    className='hidden'
                  />
                  <label
                    htmlFor={`question_${index}_option${optionIndex}`}
                    className={`${
                      option.isCorrect ? 'text-green-500' : 'text-gray-700'
                    } ${
                      review.userAnswers &&
                      review.userAnswers[index]?.selectedOptionIndex ===
                        optionIndex &&
                      option.isCorrect
                        ? 'text-green-500'
                        : review.userAnswers[index]?.selectedOptionIndex ===
                          optionIndex
                        ? 'text-red-500 border-red-500'
                        : ''
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
  );
};

export default Review;
