import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner';
import QuestionList from '../../components/QuestionList';
import { getQuestionByExam, addQuestion } from '../../../redux/features/quiz/quizSlice';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';

const QuestionAdd = () => {
    useRedirectLoggedOutUser('/login');
    const dispatch = useDispatch();

    const { examId } = useParams();
    const initialState = {
        name: "",
        options: [{ text: "", isCorrect: true }],
    };
    const [questionForm, setQuestionForm] = useState(initialState);
    const [selectedCorrectOption, setSelectedCorrectOption] = useState(0);

    const { name, options } = questionForm;

    const handleOptionChange = (e, index) => {
        const updatedOptions = [...options];
        updatedOptions[index].text = e.target.value;
        setQuestionForm({ ...questionForm, options: updatedOptions });
    };

    const handleCorrectOptionChange = (index) => {
        setSelectedCorrectOption(index);
    };

    const addNewOption = () => {
        const newOptions = [...options, { text: "", isCorrect: false }];
        setQuestionForm({ ...questionForm, options: newOptions });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionForm({ ...questionForm, [name]: value });
    };

    const resetForm = () => {
        setQuestionForm(initialState);
        setSelectedCorrectOption(0);
    };

    const addExamForm = async (e) => {
        e.preventDefault();

        const questionData = {
            name,
            options: options.map((option, index) => ({
                text: option.text,
                isCorrect: index === selectedCorrectOption,
            })),
        };

        if (name && options.every(option => option.text !== "")) {
            const addQuestionData = await dispatch(addQuestion({ examId, questionData }));

            if (addQuestionData.type !== "quiz/addExam/rejected") {
                closeModal();
                dispatch(getQuestionByExam(examId));
                resetForm();
            }
        } else {
            toast.error("All fields are required");
        }
    };

    const { isLoading } = useSelector(state => state.quiz);
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="bg-gray-50 max-w-[1440px] mx-auto p-10 my-5 relative">
            <div className='relative h-[700px] overflow-y-auto flex justify-between flex-col'>
                <button onClick={openModal} className='sticky top-0 ml-auto mr-[20px] bg-[#1084da] text-white px-4 py-2 rounded-sm'>Add Question</button>
                <QuestionList />
            </div>
            <Modal
                className={"z-[10000] max-w-[1200px] px-4 overflow-y-auto max-h-[60%]"}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={{
                    content: {
                        position: "relative",
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
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
                            <div className='grid md:grid-cols-2 gap-3'>
                                {options.map((option, index) => (
                                    <div className='flex items-center' key={index}>
                                        <input
                                            checked={selectedCorrectOption === index}
                                            onChange={() => handleCorrectOptionChange(index)}
                                            type="radio"
                                            name={`correctOption-${index}`}
                                            id={`correctOption-${index}`}
                                            className="hidden mr-2 text-[40px]"
                                        />
                                        <label htmlFor={`correctOption-${index}`} className={`${selectedCorrectOption === index ? "text-blue-500" : "text-gray-700"} border cursor-pointer bg-gray-50 flex w-full p-2 items-center`}>
                                            <input
                                                value={option.text}
                                                onChange={(e) => handleOptionChange(e, index)}
                                                type="text"
                                                name={`option-${index}`}
                                                id={`option-${index}`}
                                                className={`${selectedCorrectOption === index ? "border-[#1084da] border" : ""} block h-[40px] w-full outline-none border px-2 py-1 shadow-sm`}
                                            />
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <button onClick={addNewOption} type='button' className="mt-2 bg-gray-200 px-2 py-1 rounded-md text-sm">
                                Add Option
                            </button>
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
                                Add Question
                            </button>
                        )}
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default QuestionAdd;
