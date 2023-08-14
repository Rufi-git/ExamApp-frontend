import React, { useEffect, useState } from 'react'
import project1 from "../assets/project-1.jpg"
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { useDispatch, useSelector } from 'react-redux';
import { getAchivements } from '../../redux/features/achivement/achivementSlice';

const OurSuccess = () => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(null);

  const onOpenModal = (index) => setOpen(index);
  const onCloseModal = () => setOpen(null);

  const { achivements } = useSelector(state => state.achivement)
  useEffect(() => {
    dispatch(getAchivements())
  })

  return (
    <div className='max-w-[1640px] px-4 mx-auto py-6'>
      <div className='text-center font-semibold text-[40px] py-5'>
        <h1>Naliyyətlərimiz</h1>
      </div>
      <div className='grid grid-cols-3 justify-center gap-4'>
        {achivements && achivements.map((achivement, index) => (
          <div key={index}>
            <div onClick={() => onOpenModal(index)} className='cursor-pointer'>
              <img src={project1} alt="" className='w-full h-200px rounded-md' />
              <div>
                <h1>{achivement.title}</h1>
                <p></p>
              </div>
            </div>
            <Modal open={open === index} onClose={onCloseModal} center>
              <div>
                <div>
                  <h1>{achivement.title}</h1>
                  <button type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="flex gap-5">
                  <div className="col-md-7">
                    <div className="modal_image" >
                      <img src={project1} alt="" className='max-w-[300px]'/>
                    </div>
                  </div>
                  <div className="col-md-5">
                    <div className="">
                      <div>
                        <h4 className='font-bold text-[20px]'>Project Info:</h4>
                        <p>{achivement.about}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OurSuccess