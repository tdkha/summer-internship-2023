'use client'
import { createContext, useEffect, useState } from 'react';

export const MobileContext = createContext();

export function MobileProvider({children}) {
    const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined
    });

    const [isMobile , setIsMobile] = useState(false);


    useEffect( () => {
        const handleSize = () => {
            setWindowSize({
                width : window.innerWidth,
                height : window.innerHeight
            })
        }
        // add event listener to DOM
        window.addEventListener('resize', handleSize); // get called when resizing triggered
  
        // call the function once in the "useEffect" hook when the component mounts
        handleSize();
        
        // cleanup function called when the component unmounts
        return () => {
            window.removeEventListener('resize', handleSize);
        }
    },[]);
  
    useEffect( () =>{
        if (windowSize.width < 500){
            setIsMobile(true);
        }else{
            setIsMobile(false);
        }
    },[windowSize]);
  return (
    <MobileContext.Provider value={{ isMobile }}>
      {children}
    </MobileContext.Provider>
  );
}
