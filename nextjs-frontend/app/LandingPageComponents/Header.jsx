'use client'
import NavBar from "../../components/NavBar/NavBar"
import Image from 'next/image'
import Codingbro from '../../public/img/Coding-bro.svg'

export default function HeaderContainer() {
    const NavContent = [
      ['Home','/'] , ['Work','/work'] ,['Login','/auth/login'],['Register','/auth/register']
    ]

    return (
      <div className="bg-white text-custom-black h-fit   w-full flex flex-col  gap-[20px] lg:gap-[5vh] ">
        <NavBar props={NavContent} ColorBackground={'white'} ColorText={"black"} MobileColorBackground={"black"} MobileColorText={"#F6F7D4"} />

        <div className="w-full relative ">
          <div className="px-[10%] py-[5vh] black-text" >
            <p className=" font-medium text-2xl md:text-4xl mb-5"> Are you looking for a <span className="bg-neon-green">summer</span> internship to advance your CV? </p>
            <p className=" font-light text-sm md:text-2xl " >Our technology department offer a wide range of reality-based projects that guarantee a memorable summer with hard work yet exciting.</p>
          </div> 
        </div>
        <div className="header-bg w-full border-t-8 border-slate-950 ">
            <div className="w-[60%] mx-[20%] md:w-[40%] md:mx-[30%] ">
                <Image 
                  src={Codingbro}
                  alt="coding"
                />
              </div>
          </div>
      </div>
    )
  }