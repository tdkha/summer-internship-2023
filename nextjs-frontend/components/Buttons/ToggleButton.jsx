'use client'
import React from 'react'
import { useState, useEffect ,forwardRef} from 'react';

const ToggleButton=  forwardRef(function ToggleButton({props , handler} , ref) {
    const [select , setSelect] = useState('');
    const handleSelect = (e) =>{
        e.preventDefault();
        const value = e.target.id;
        setSelect(value);
        return handler();
    }
    useEffect( () => {
        setSelect(props[0])
    },[])
  return (
    <div className='toggle-button-group rounded-full bg-custom-light-black w-fit font-poppins' ref={ref}>
        {props.map( element => 
            <button 
                key={element} 
                id={element}
                className={`toggle-button py-2 px-4 rounded-full text-xs font-semibold ease-linear duration-200 ${select == element ? 'bg-gradient-to-r from-neon-green to-neon-green text-custom-black' : 'black-bg text-white  opacity-30'}`} 
                onClick={e => handleSelect(e)}
            >
            {element}
            </button>
        )}
    </div>
  )
})
export default ToggleButton;
