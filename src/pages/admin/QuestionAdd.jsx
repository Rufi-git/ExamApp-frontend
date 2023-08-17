import React, { useEffect, useState } from 'react';
import { HiUsers } from 'react-icons/hi';
import { BiSolidUserCheck, BiUserMinus, BiUserX } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import PageMenu from '../../components/PageMenu';
import Categories from '../../components/Categories';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { useDispatch, useSelector } from 'react-redux';
import { getTags, addExam, getTag, addQuestion, getQuestionByExam } from '../../../redux/features/quiz/quizSlice';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'react-modal';
import QuestionList from '../../components/QuestionList';
import Spinner from '../../components/Spinner';


const QuestionAdd = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch()

    const { isLoading, isSuccess, isError, queue } = useSelector(state => state.quiz)
    const [modalIsOpen, setIsOpen] = useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const { examId } = useParams()
    const initialState = {
        name: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
    }
    const [questionForm, setQuestionForm] = useState(initialState)
    const { name, option1, option2, option3, option4 } = questionForm

    const [selectedCorrectOption, setSelectedCorrectOption] = useState('option1');

    const handleOptionChange = (e) => {
        setSelectedCorrectOption(e.target.name);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setQuestionForm({ ...questionForm, [name]: value })
    }

    useEffect(() => {
        dispatch(getQuestionByExam(examId))
    }, [dispatch])

    const resetForm = () => {
        setQuestionForm(initialState);
        setSelectedCorrectOption('option1');
    };


    const addExamForm = async (e) => {
        e.preventDefault()

        const questionData = {
            name,
            options: [
                { text: option1, isCorrect: selectedCorrectOption === 'option1' },
                { text: option2, isCorrect: selectedCorrectOption === 'option2' },
                { text: option3, isCorrect: selectedCorrectOption === 'option3' },
                { text: option4, isCorrect: selectedCorrectOption === 'option4' },
            ],
        }

        if (name && option1 && option2 && option3 && option4) {
            const addQuestionData = await dispatch(addQuestion({ examId, questionData }))

            if (addQuestionData.type != "quiz/addExam/rejected") {
                closeModal()
                dispatch(getQuestionByExam(examId))
                resetForm()
            }
        } else {
            toast.error("All fields are required")
        }
    }
    return (
        <div className="bg-gray-50 max-w-[1440px] mx-auto p-10 my-5 relative">
            <div className='relative h-[700px] overflow-y-auto flex justify-between flex-col'>
                <button onClick={openModal} className='sticky top-0 ml-auto mr-[20px] bg-[#1084da] text-white px-4 py-2 rounded-sm'>Add Question</button>
                <QuestionList />
            </div>
            <Modal
                className={"z-[10000] max-w-[1200px] px-4 mx-auto flex mt-[300px]"}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >

                <div className="w-full max-w-[1240px] bg-white p-8 rounded-md shadow-md">
                    <form onSubmit={addExamForm}>
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
                            <div className='grid grid-cols-2 gap-3'>
                                <div className='flex items-center'>
                                    <input
                                        checked={selectedCorrectOption === 'option1'}
                                        onChange={handleOptionChange}
                                        type="radio"
                                        name="option1"
                                        id="option1"
                                        className="hidden mr-2 text-[40px]"
                                    />
                                    <label htmlFor='option1' className={`${selectedCorrectOption === 'option1' ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                        <input
                                            value={option1}
                                            onChange={handleInputChange}
                                            type="text"
                                            name='option1'
                                            id="option1"
                                            className={`${selectedCorrectOption === 'option1' ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                        />
                                    </label>
                                </div>
                                <div className='flex items-center'>
                                    <input
                                        checked={selectedCorrectOption === 'option2'}
                                        onChange={handleOptionChange}
                                        type="radio"
                                        name="option2"
                                        id="option2"
                                        className="mr-2 hidden"
                                    />
                                    <label htmlFor='option2' className={`${selectedCorrectOption === 'option2' ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                        <input
                                            value={option2}
                                            onChange={handleInputChange}
                                            type="text"
                                            name='option2'
                                            id="option2"
                                            className={`${selectedCorrectOption === 'option2' ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                        />
                                    </label>
                                </div>

                                <div className='flex items-center'>
                                    <input
                                        checked={selectedCorrectOption === 'option3'}
                                        onChange={handleOptionChange}
                                        type="radio"
                                        name="option3"
                                        id="option3"
                                        className="mr-2 hidden"
                                    />
                                    <label htmlFor='option3' className={`${selectedCorrectOption === 'option3' ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                        <input
                                            value={option3}
                                            onChange={handleInputChange}
                                            type="text"
                                            name='option3'
                                            id="option3"
                                            className={`${selectedCorrectOption === 'option3' ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                        />
                                    </label>
                                </div>

                                <div className='flex items-center'>
                                    <input
                                        checked={selectedCorrectOption === 'option4'}
                                        onChange={handleOptionChange}
                                        type="radio"
                                        name="option4"
                                        id="option4"
                                        className="mr-2 hidden"
                                    />
                                    <label htmlFor='option4' className={`${selectedCorrectOption === 'option4' ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                        <input
                                            value={option4}
                                            onChange={handleInputChange}
                                            type="text"
                                            name='option4'
                                            id="option4"
                                            className={`${selectedCorrectOption === 'option4' ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        {
                            isLoading ?
                                <button className="bg-[#6dabe4] w-[120px] flex justify-center text-white py-2 px-4 rounded-md text-sm" disabled><Spinner /></button>
                                :
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                >
                                    Add Question
                                </button>
                        }

                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default QuestionAdd;