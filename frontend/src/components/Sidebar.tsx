import React from 'react'
import profile from "../../public/profile.jpg"
import { BsLightbulbFill } from 'react-icons/bs'
import { TbHandFinger } from 'react-icons/tb'
import { FaPen, FaPlus } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { IoMdArchive } from 'react-icons/io'
import { FaCartShopping } from 'react-icons/fa6'
function Sidebar() {
  return (
   <aside className='min-w-[20vw] shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-800 text-white p-4 flex flex-col gap-5 sticky top-14 left-0 h-[calc(100vh-56px)]'>
    <div className='flex w-full gap-5 justify-center items-center p-3 '>
        <img className='rounded-full h-16 w-16 '
        src={profile.src} alt="Profile Image"/>
        <div className='flex flex-col gap-2 py-4'>
            <p className='font-semibold'>Vikas Kurmi</p>
            <p className="italic text-sm">vkurmi307@gmail.com</p>
        </div>
    </div>
    <hr/>
    <div className='flex gap-7'>
    <section className='flex flex-col items-center justify-center gap-2 py-2'>
    <BsLightbulbFill className='text-xl'/>
    <TbHandFinger className='text-xl'/>
    </section>
    <section className='flex flex-col gap-3 py-2'>
    <h3>Notes</h3>
    <h3>Reminders</h3>
    </section>
    </div>
    <hr/>
    <div className='flex items-center justify-between'>
    <h3>Labels</h3>
    <FaPen className='text-xl '/>
    </div>
     
    <div className='flex gap-7'>
      <section className='flex flex-col gap-3 py-2 text-xl'>
      <FaCartShopping className='text-xl'/>
      <FaPlus className='text-xl'/>
      </section>
      <section className='flex flex-col gap-3 py-2'>
      <h3>Shopping List</h3>
      <h3>Create new Label</h3>
      </section>
    </div>
    <hr/>
    <div className='flex gap-7'>
      <section className='flex flex-col gap-3 text-xl py-2'>
      <IoMdArchive className='text-xl' />
      <MdDelete className='text-xl'/>
      </section>
      <section className='flex flex-col gap-3 py-2'>
      <h3>Archieve</h3>
      <h3>Trash</h3>
      </section>
    </div>
   
   </aside>
  )
}

export default Sidebar