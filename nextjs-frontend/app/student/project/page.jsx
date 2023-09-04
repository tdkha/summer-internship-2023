
'use client'
import React, { useEffect, useRef, useState } from 'react';
import ProjectComponent from '../components/MainDashBoard/ProjectComponent';
import GroupComponent from '../components/MainDashBoard/GroupComponent';
import ToggleButton from '../../../components/Buttons/ToggleButton';

export default function StudentProjectPage() {
    //------------------------------------------
  // TOGGLE BUTTON MANAGER
  //------------------------------------------
  const [component , setComponent] = useState('');
  const [componentIndex , setComponentIndex] = useState(0);
  const toggleRef = useRef(null);
  const componentNum = 2; // update this if you change the props in <ToggleButton/>
  useEffect(() => {
    const target = toggleRef.current;
    const targetButton = target.childNodes[componentIndex];
    setComponent(targetButton.id);
  },[])
  const handleComponentSwitch = () => {
    const target = toggleRef.current;
    if(componentIndex < (componentNum-1)){
      const index = componentIndex + 1;
      setComponentIndex(index);
      const targetButton = target.childNodes[index].id;
      setComponent(targetButton);
    }else{
      const index = componentIndex - 1;
      setComponentIndex(index);
      const targetButton = target.childNodes[index].id;
      setComponent(targetButton);
    }
  }
  //------------------------------------------
  // main component
  //------------------------------------------
  return (
    <section className='w-full  text-white  relative flex-col  min-h-screen overflow-y-auto'>
        <div className='w-full  flex items-center justify-between text-center pb-4'>
                    <h1 className='font-black text-base md:text-lg lg:text-2xl tracking-wider'>PROJECT DASHBOARD</h1>
                    <ToggleButton  props={['Project','Group']} ref={toggleRef} handler={handleComponentSwitch} />
        </div>
        <div className='w-full'>
          {component == 'Project' ? (<ProjectComponent/>) 
          : (<GroupComponent/>)}
        </div>  
    </section>
  )
}
