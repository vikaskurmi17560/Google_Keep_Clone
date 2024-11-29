'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

function page() {
    const [seepassword,setSeePassword]=useState<boolean>(false);
    const {register,handleSubmit}=useForm();
    const router=useRouter();

    // async function handleLogIN(data:any){
    //     try{
    //         const response= await LogIn(data);
    //         if(response.success){
    //             toast.success("Account Login successfully");
    //             localStorage.setItem("token",response.token);
    //             localStorage.setItem("user_id",response.user._id);
    //             localStorage.setItem("user_name",response.user.name);
    //             localStorage.setItem("user_email",response.user.email);
    //             localStorage.setItem("user_image",response.user.profile);
    //             router.replace("/");
    //         }
    //     }
    //     catch(error:any){
            
    //         toast.error(error.response.message)
    //     }
    // }

    return (
        <div className="flex flex-col gap-y-32 ">
    
        <div className='flex flex-1 flex-col justify-center items-center gap-10 ' >
           
            <form  className='flex  w-[40vw] border-2 flex-col  items-center justify-center p-4 gap-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
            <div className="flex flex-col mb-10 ">
            <div className='text-2xl font-bold text-slate-600 text-center'>Hey User! </div>
            <div className='text-2xl font-bold text-slate-600'>Login to your Account </div>
            </div>
                <input {...register("email")} type='email' placeholder='Enter your email' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-slate-200 focus:ring-2' required />

               <div className='relative flex w-full items-center gap-2'>
               <input  {...register("password")} type={seepassword ? "text":"password"} 
               maxLength={16} required
               placeholder='Enter Password' className='w-full px-4 text-gray-500 py-3 border-2 rounded-md outline-none focus:ring-slate-200 focus:ring-2' />
               <button onClick={()=>setSeePassword(!seepassword)} type='button' className='absolute right-2' >see</button>
               </div>
                <div className="flex w-full justify-between mt-5 text-gray-500">
                    <Link href={"/signup"} className='text-sm  '>New account</Link>
                    <Link href={"/forget"} className='text-sm  '>Forgot password?</Link>
                </div>

                <button type='submit' className='w-full font-bold px-4 py-3 text-white text-xl bg-slate-800 rounded-md' >Login</button>
            </form>
        </div>

        </div>
    )
}

export default page
