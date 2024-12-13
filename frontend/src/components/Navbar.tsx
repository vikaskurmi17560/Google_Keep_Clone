'use client'
import { SiGooglekeep } from "react-icons/si";
import { VscThreeBars } from "react-icons/vsc";
import keep from "../../public/keep.png";
import { IoMdRefresh, IoMdSettings } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { TfiViewList } from "react-icons/tfi";
import { CgMenuGridO } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Link from "next/link";

 function Navbar() {
 

  const router=useRouter();
  return (
    <main className="w-screen lg:h-20 md:h-16 h-auto border-b lg:px-7 md:px-5 lg:py-3 md:py-y  bg-gray-900   flex lg:flex-row md:flex-row flex-col items-center lg:gap-5 md:gap-3 gap-2">
      
    <div className="flex flex-row py-2  px-2 lg:w-[70%] md:w-[70%] w-[100%] h-[100%] gap-1 lg:gap-4 md:gap-3">
    <div className="flex lg:w-[15%] md:w-[15%] w-[25%] lg:h-[100%] md:h-[70%] h-[60%] flex-row gap-1 items-center  cursor-pointer"  onClick={()=>{
      router.push("/");
     }}>
     <img src={keep.src} alt="Google" className="lg:h-10 md:h-8 h-6" />
     <h1 className="lg:text-2xl md:text-xl  text-white font-medium underline">Keep</h1>
     </div>
 
      <div className="flex flex-row text-white lg:h-[100%] md:h-[70%] h-[60%]  lg:w-[75%] md:w-[75%] w-[65%] justify-center lg:text-2xl md:text-xl items-center ">
       
        <input
          className="bg-gray-600 rounded-l-md h-[90%]  py-2 px-4 w-[80%]"
          placeholder="Search"
        />
         <IoSearch className="h-[90%] bg-white text-black rounded-r-md py-2 px-4" />
      </div>
    </div>
   
      <div className="px-2  flex flex-row lg:gap-4 md:gap-3  items-center lg:justify-end md:justify-end justify-between  lg:w-[25%] md:w-[25%] w-[100%] text-white lg:text-2xl md:text-xl">
        <Link href={"/login"}>Login</Link>
        <Link href={"/signup"}>Signup</Link>
        
      </div>
      <div className="flex flex-row lg:gap-4 md:gap-3 items-center lg:justify-end md:justify-end justify-between  lg:w-[5%] md:w-[5%] px-2 w-[100%]">
      <CgMenuGridO  className="text-white lg:text-2xl md:text-xl"/>
      <IoMdSettings className="text-white lg:text-2xl md:text-xl" />
      
      </div>
      
    
    </main>
  );
}

export default Navbar;