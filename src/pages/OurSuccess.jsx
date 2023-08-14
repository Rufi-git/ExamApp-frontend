import React, { useEffect, useState } from 'react'
import project2 from "../assets/project-2.jpg"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAchivements } from '../../redux/features/achivement/achivementSlice';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { AdminTeacherLink } from '../components/protect/hiddenLink';
import AchivementModal from '../components/AchivementModal';
import { TailSpin } from 'react-loader-spinner';

const OurSuccess = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.achivement)
  const [open, setOpen] = useState(null);

  const onOpenModal = (index) => setOpen(index);
  const onCloseModal = () => setOpen(null);

  const { achivements } = useSelector(state => state.achivement)
  useEffect(() => {
    dispatch(getAchivements())
  }, [dispatch])

  const getImageHeight = (size) => {
    if (size === 'large') return '700px';
    if (size === 'medium') return '500px';
    if (size === 'small') return '400px';
    return '600px';
  };

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  if (isLoading) {
    return <div className="flex w-full justify-center py-10">
      <TailSpin
        height="130"
        width="130"
        color="#1084da"
        ariaLabel="triangle-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
  }
  return (
    <div className='max-w-[1640px] px-4 mx-auto py-6'>
      <div className='text-center font-semibold text-[40px] py-5'>
        <h1>Naliyyətlərimiz</h1>
      </div>
      <AdminTeacherLink>
        <div className='flex justify-end my-2'>
          <button onClick={openModal} className='bg-[#1084da] text-white px-4 py-2 rounded-sm'>Add Achivement</button>
        </div>

        <AchivementModal modalIsOpen={modalIsOpen} closeModal={closeModal} />
      </AdminTeacherLink>

      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry gutter="10px">
          {achivements && achivements.map((achivement, index) => (
            <div style={{ height: getImageHeight(achivement.size) }} key={index}>
              <div onClick={() => onOpenModal(index)} className={`cursor-pointer relative group h-full`}>
                <img src={achivement.photo} alt="" className="w-full rounded-md h-full object-cover" />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 w-full h-full opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity duration-300 ease-in-out'>
                  <h1 className='text-white'>{achivement.title}</h1>
                </div>
              </div>
              <div className='w-[200px]'>
                <Modal open={open === index} onClose={onCloseModal} center>
                  <div className="modal-content">
                    <div className="modal-header">
                      <h1>{achivement.title}</h1>
                      <button type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                      <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div className="col-span-1">
                            <div className="modal_image">
                              <img src={achivement.photo} alt="" className='max-w-[300px]' />
                            </div>
                          </div>
                          <div className="col-span-1">
                            <div className="max-w-[300px]">
                              <h4 className='font-bold text-[20px]'>Project Info:</h4>
                              <p className=" break-words">{achivement.about}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Modal>

              </div>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default OurSuccess