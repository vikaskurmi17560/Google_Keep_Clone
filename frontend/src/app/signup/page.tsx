'use client'
import Navbar from '@/components/Navbar';
import { Signup } from '@/networks/todo_network';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

function page() {
    const [seepassword, setSeePassword] = useState<boolean>(false);
    const { register, handleSubmit } = useForm();
    const router = useRouter();
    async function handleSignUp(data: any) {
        try {

            const response = await Signup(data);
            if (response.success) {
                toast.success("Account created successfully");
                router.replace("/login");
            }
        }
        catch (error: any) {

            toast.error(error.response.message)
        }
    }
    return (
        <div className="flex flex-col w-screen bg-slate-200">
            <Navbar />

            <div className='flex  justify-center items-center w-[100%] h-screen '>

                <form onSubmit={handleSubmit(handleSignUp)} className=' flex  w-[45%] border-2 flex-col  items-center justify-center lg:gap-3 gap-2 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-slate-100 lg:p-5 md:p-3 p-2  '>

                    <div className="w-[100%] flex flex-col justify-center items-center lg:text-2xl md:text-xl text-[12px]  text-slate-900 font-bold lg:py-4 md:py-3 py-2">

                        <h1 className='text-center'>Hey User!</h1>
                        <h1  className='text-center'>Regester Your Account Here..</h1>

                    </div>

                    <div className="flex flex-col w-[100%] justify-center lg:text-xl md:text-sm text-[10px] items-center lg:gap-4 md:gap-3 gap-2 ">

                        <input {...register("name")} type='text' placeholder='Enter your name' className='w-full lg:px-4 md:px-3 px-2 text-gray-500 lg:py-3 md:py-2 py-1 border-2 rounded-md outline-none focus:ring-slate-300 focus:ring-2 ' required />

                        <input {...register("email")} type='email' placeholder='Enter email id' className='w-full lg:px-4 md:px-3 px-2 lg:py-3 md:py-2 py-1  text-gray-500  border-2 rounded-md outline-none focus:ring-slate-300 focus:ring-2' required />

                    </div >

                    <div className='w-[100%] flex flex-col justify-center  lg:text-xl md:text-sm text-[10px] items-center lg:gap-4 md:gap-3 gap-2'>
                      <div className="relative w-[100%]">
                      <input {...register("password")} type={seepassword ? "text" : "password"} placeholder='Enter password' className='w-[100%] lg:px-4 md:px-3 px-2 lg:py-3 md:py-2 py-1 text-gray-500 border-2  rounded-md outline-none focus:ring-slate-300 focus:ring-2' required />
                        <button onClick={() => setSeePassword(!seepassword)} type='button' className='absolute right-0  text-black' >
                            {
                                seepassword === true ? <FaEyeSlash /> : <IoEyeSharp />
                            }
                        </button>
                      </div>

                        <div className="relative w-[100%]">
                        <input {...register("confirm_password")} type={seepassword ? "text" : 'password'} placeholder='Enter confirm password' className='w-[100%] lg:px-4 md:px-3 px-2 lg:py-3 md:py-2 py-1 text-gray-500  border-2  rounded-md outline-none focus:ring-slate-300 focus:ring-2' required />
                        <button onClick={() => setSeePassword(!seepassword)} type='button' className='absolute right-0  text-black ' >
                            {
                                seepassword === true ? <FaEyeSlash /> : <IoEyeSharp />
                            }
                        </button>
                        </div>
                    </div>

                    <div className="flex w-full justify-between py-2 text-gray-500">
                        <Link href={"/signup"} className='lg:text-sm md:text-xs text-[8px]'>New account</Link>
                        <Link href={"/forgot"} className='lg:text-sm md:text-xs text-[8px]'>Forgot password?</Link>
                    </div>

                    <button type='submit' className='w-full font-bold lg:px-4 md:px-3 px-2 lg:py-3 md:py-2 py-1 text-white bg-slate-900 rounded-md lg:text-xl md:text-sm text-[10px] '>Submit & Login</button>

                </form>

            </div>
        </div>
    )
}

export default page