'use client'
import { useState , useRef ,useContext } from 'react';
import { MobileContext } from '../context/mobileContext';

export default function About() {
    const {isMobile} = useContext(MobileContext);
    
    const aboutContentArray = [
        ["Benefits" , "Gain hands-on experience and develop their skills in a cooperative and creative environment."],
        ["Topics" , "The main topics of the summer internship surround Mechanical and Software Engineering."],
        ["Credits" , "Credits can be accumulated through project participation with the max of 15 credits per intern."],
    ];

    return (

        <div className='bg-custom-dim-black h-fit mb-[10vh] w-full text-white  flex flex-col gap-10 justify-center items-center relative  ' id="about">

            {isMobile ? (
                    <div className='w-full'>
                        <div className=' w-full   text-white   py-4 px-4 grid grid-flow-col auto-cols-auto gap-8  overflow-x-auto  overscroll-contain snap-x ' id="carousel" >        
                            {aboutContentArray.map(element =>
                                <div  key={element[0]}  className='group snap-center  rounded-lg  w-[50vw]   flex flex-col gap-2   p-4  hover:bg-[#13F287]  min-h-[120px] ' >
                                    <div className='w-full font-medium text-base group-hover:text-black'>{element[0]}</div>
                                    <div className='text-custom-main-gray font-light text-xs group-hover:text-black'>{element[1]}</div>
                                </div>
                            )}
                        </div> 
                    </div>
                    
                ) : (
                    <div className='w-full h-min flex flex-row gap-8  justify-center items-center text-white  py-4 px-4  lg:gap-28'>
                            {aboutContentArray.map(element =>
                                <div key={element[0]} className='group w-full rounded-lg   flex flex-col gap-2 items-center justify-center p-4 max-w-[300px]  min-h-[180px] hover:bg-[#13F287] duration-500 ease-in-out'>
                                    <div className='w-full text-left font-medium text-base  group-hover:text-black md:text-xl lg:text-2xl'>{element[0]}</div>
                                    <div className='text-custom-main-gray font-light text-sm md:text-base  group-hover:text-black tracking-wide '>{element[1]}</div>
                                </div>
                            )}
                    </div>  
            )}       
                 
        </div>

    )
  }