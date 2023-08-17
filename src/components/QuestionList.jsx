import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteQuestion, editQuestion, getQuestionByExam } from '../../redux/features/quiz/quizSlice';
import { useParams } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import Modal from 'react-modal';
import Spinner from './Spinner';
import { MdModeEdit } from 'react-icons/md';
import { TailSpin } from 'react-loader-spinner';

const QuestionList = () => {
    const dispatch = useDispatch()

    const { queue, isLoading } = useSelector(state => state.quiz)
    const [deleteIndex, setDeleteIndex] = useState(null);

    const { examId } = useParams()

    useEffect(() => {
        dispatch(getQuestionByExam(examId))
    }, [dispatch])

    const questionDelete = async (id, index) => {
        setDeleteIndex(index);
        await dispatch(deleteQuestion(id))
        dispatch(getQuestionByExam(examId))
        setDeleteIndex(null);
    }

    const [editQuestionModalIndex, setEditQuestionModalIndex] = useState(null)

    const initialState = {
        name: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    }
    const [questionForm, setQuestionForm] = useState(initialState)
    const { name } = questionForm
    const [selectedCorrectOption, setSelectedCorrectOption] = useState('option1');
    const [optionTextInputs, setOptionTextInputs] = useState([...initialState.option1, ...initialState.option2, ...initialState.option3, ...initialState.option4]);

    const handleOptionChange = (id) => {
        setSelectedCorrectOption(id);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setQuestionForm({ ...questionForm, [name]: value })
    }

    const handleOptionTextChange = (e, optionIndex) => {
        const newOptionTextInputs = [...optionTextInputs];
        newOptionTextInputs[optionIndex] = e.target.value;
        setOptionTextInputs(newOptionTextInputs);
    };

    const openModal = (index) => {
        const questionData = queue[index];
        const correctOption = questionData.options.find(option => option.isCorrect);

        setQuestionForm({
            name: questionData.name,
        });
        setSelectedCorrectOption(correctOption ? correctOption._id : 'option1');

        const optionTexts = questionData.options.map(option => option.text);
        setOptionTextInputs(optionTexts);

        setEditQuestionModalIndex(index);
    }

    function closeModal() {
        setEditQuestionModalIndex(null);
    }

    const editExamForm = async (e, questionId, index) => {
        e.preventDefault();

        const questionData = {
            name,
            options: [
                { text: optionTextInputs[0], isCorrect: selectedCorrectOption === queue[index].options[0]._id },
                { text: optionTextInputs[1], isCorrect: selectedCorrectOption === queue[index].options[1]._id },
                { text: optionTextInputs[2], isCorrect: selectedCorrectOption === queue[index].options[2]._id },
                { text: optionTextInputs[3], isCorrect: selectedCorrectOption === queue[index].options[3]._id },
            ],
        };

        if (name && optionTextInputs.every(text => text !== '')) {
            const addQuestionData = await dispatch(editQuestion({ questionId, questionData }));

            if (addQuestionData.type !== "quiz/addExam/rejected") {
                closeModal();
                dispatch(getQuestionByExam(examId));
            }
        } else {
            // Add your error handling here
        }
    };

    return (
        <div className='px-[20px]'>
            {queue && queue.map((question, index) => (
                <div key={question._id} className="mb-4">
                    <div className='flex gap-2'>
                        <p className="font-medium">Sual {index + 1}:</p>
                        {isLoading && index === deleteIndex ? (
                            <TailSpin
                                height="20"
                                width="20"
                                color="#FF0000"
                                ariaLabel="tail-spin-loading"
                                radius="1"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            />
                        ) : (
                            <button onClick={() => questionDelete(question._id, index)} className='text-[red] text-[20px]'><AiFillDelete /></button>
                        )}

                        <button onClick={() => openModal(index)} className='text-[orange] text-[20px]'><MdModeEdit /></button>
                    </div>
                    <p className='my-3'>{question.name}</p>
                    <div className="grid md:grid-cols-2 gap-3">
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
            {queue && queue.map((question, index) => (
                <Modal
                    key={`modal_${question._id}`}
                    className={"z-[10000] max-w-[1200px] px-4"}
                    isOpen={editQuestionModalIndex === index}
                    onRequestClose={closeModal}
                    contentLabel="Example Modal"
                    style={{
                        content: {
                            position:"relative",
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                        },
                    }}
                >
                    <div className="w-full max-w-[1240px] bg-white p-8 rounded-md shadow-md">
                        <form onSubmit={(e) => editExamForm(e, question._id, index)}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                                    Sual:
                                </label>
                                <textarea
                                    value={name}
                                    onChange={handleInputChange}
                                    type="text"
                                    name='name'
                                    id="name"
                                    className="mt-1 block w-full border-gray-300 outline-none border px-2 py-1 shadow-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="passingMarks">
                                    Seçimlər:
                                </label>
                                <div className='grid md:grid-cols-2 gap-3'>
                                    {question.options.map((option, optionIndex) => (
                                        <div key={optionIndex} className={`flex items-center`}>
                                            <input
                                                checked={selectedCorrectOption === option._id}
                                                onChange={() => handleOptionChange(option._id)}
                                                type="radio"
                                                name={`option_${optionIndex}`}
                                                id={`option_${optionIndex}`}
                                                className="hidden mr-2 text-[40px]"
                                            />
                                            <label htmlFor={`option_${optionIndex}`} className={`${selectedCorrectOption === option._id ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                                <input
                                                    value={optionTextInputs[optionIndex]}
                                                    onChange={(e) => handleOptionTextChange(e, optionIndex)}
                                                    type="text"
                                                    name={`option${optionIndex}`}
                                                    id={`option${optionIndex}`}
                                                    className={`${selectedCorrectOption === option._id ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                                />
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {isLoading ? (
                                <button className="bg-[#6dabe4] w-[120px] flex justify-center text-white py-2 px-4 rounded-md text-sm" disabled>
                                    <Spinner />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    Edit Question
                                </button>
                            )}
                        </form>
                    </div>
                </Modal>
            ))}
        </div>
    )
}

export default QuestionList;
