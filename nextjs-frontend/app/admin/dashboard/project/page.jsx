'use client'

import React, {useState , useEffect , useRef, useContext} from 'react';
import { MobileContext } from '../../../context/mobileContext';
import Button from '../../../../components/Buttons/Button';
import { useRouter } from 'next/navigation';
import { getProjectsByYear } from '../../../../lib/useProject';

export default function AdminProjectPage() {
    const [ allProjects , setAllProjects ] = useState([]);

    useEffect( () => {
      const fetchProjects = async () => {
        const year = new Date().getFullYear();
        const projects = await getProjectsByYear(year);
        if(projects) return setAllProjects(projects)      
      }
      fetchProjects()
    },[]);


    return (

      <section className='w-full  text-white relative flex-col'>
          <div className='w-full  flex items-center justify-between text-center pb-4'>
              <h1 className='font-black text-base md:text-lg lg:text-2xl tracking-widest pb-6'>PROJECT DASHBOARD</h1>           
          </div>
          <div className='w-full grid grid-cols-3 '>
            <div className='w-full max-h-[800px] overflow-y-scroll'>
              <h2 className='md:font-semibold'>Posted projects</h2>
              {
                allProjects.map( project =>{

                  return (
                    <div key={project.id} className='py-4 px-8 flex flex-col gap-2 border border-custom-dim-gray rounded-2xl'>
                      <p className='text-custom-main-gray'>Project name</p>
                      <h2 className=' text-lg'>{project.name}</h2>
                      <p className='text-custom-main-gray'>Type</p>
                      <h2 className=' text-lg'>{project.type}</h2>
                      <p className='text-custom-main-gray'>Field</p>
                      <h2 className=' text-lg'>{project.field}</h2>
                    </div>)
                })
              }
            </div>
            <div></div>
            <div></div>
          </div>  
      </section>

      )
}

