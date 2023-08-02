import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionByExam } from '../../redux/features/quiz/quizSlice';
import Loader from './Loader';
import { updateResultAction } from '../../redux/features/quiz/resultSlice';

const Questions = ({ onChecked }) => {
    const dispatch = useDispatch();
    const [checkedOption, setCheckedOption] = useState(null);
    const [checked, setChecked] = useState(undefined)
    const { queue, isLoading, isError, trace } = useSelector((state) => state.quiz);
    const { result } = useSelector((state) => state.result);
    const { examId } = useParams()

    useEffect(() => {
        dispatch(getQuestionByExam(examId))
    }, [dispatch])

    useEffect(() => {
        dispatch(updateResultAction({ trace, checked }))
    }, [checked])

    useEffect(() => {
        const previousAnswer = result[trace];
        if (previousAnswer !== undefined) {
            setCheckedOption(previousAnswer);
            onChecked(previousAnswer);
            setChecked(previousAnswer);
        } else {
            setCheckedOption(undefined);
            onChecked(undefined);
        }
    }, [trace, result]);

    const question = useSelector(
        (state) => state.quiz.queue[state.quiz.trace]
    );

    const onSelect = (optionIndex) => {
        setCheckedOption(optionIndex);
        onChecked(optionIndex)
        setChecked(optionIndex)
    }


    if (isLoading) return <Loader />

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4">{question?.name}</h2>

            <ul className="bg-white shadow rounded-lg w-full p-4">
                {question?.options?.map((option, i) => (
                    <li className="flex items-center gap-4 py-2" key={i}>
                        <input
                            type="radio"
                            checked={checkedOption === i}
                            name="options"
                            id={`q${i}-option`}
                            onChange={() => onSelect(i)}
                        />
                        <label
                            htmlFor={`q${i}-option`}
                            className="text-gray-800 cursor-pointer"
                        >
                            {option.text}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Questions;
