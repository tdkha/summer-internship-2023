'use client'

import NavBar from '../../components/NavBar/NavBar';
import React, { useState , useEffect} from 'react'
import { usePathname } from 'next/navigation';

export default function AuthLayout({children}) {
    const [navContent, setNavContent] = useState([['Home','/'], ['Work','/work']]);

    const pathname = usePathname();

    useEffect(() => {
        const registerNavContent = [['Home','/'], ['Work','/work'], ['Login', '/auth/login']]
        const loginNavContent = [['Home','/'], ['Work','/work'], ['Register', '/auth/register']]
        if(pathname == '/auth/login')  return setNavContent(prev => loginNavContent);
        if(pathname == '/auth/register')  return setNavContent(prev => registerNavContent);
      }, [pathname])
    //------------------------------------------
    // main component
    //------------------------------------------
    return (
        <main className='flex flex-col items-center font-Inter min-h-[100dvh] relative overflow-hidden'>
            <NavBar ColorBackground={"#13F287"} ColorText={"#040406"} MobileColorBackground={"#040406"} MobileColorText={"#13F287"} props={navContent}/>
            <section className="auth-container  flex-1 w-full h-full flex justify-center items-center">
                {children}
            </section>
        </main>
    ) 
}