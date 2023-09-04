'use client'

import {  useState , useContext, useEffect} from 'react';
import { MdMenu ,MdClose } from "react-icons/md";
import { MobileContext } from '../../app/context/mobileContext';
import Link from 'next/link';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';

export default function NavBar({ ColorBackground  , ColorText  , props , MobileColorBackground, MobileColorText}) {
    const router = useRouter();
    const {isMobile} = useContext(MobileContext);
    const [openMenu, setOpenMenu] = useState(false);
    const [menuMobile, setMenuMobile] = useState(false);
    const handleLogOut = async(e) => {
        e.preventDefault();
        await useLogout();
        localStorage.clear();
        return router.replace('/auth/login');
    }
    const handleMenu = () => {
        return setOpenMenu(!openMenu);
    };
    useEffect( () => {
        document.querySelector('#navigationbar').style.backgroundColor = ColorBackground;
        document.querySelector('#navigationbar').style.color = ColorText;  
    },[])
    
    useEffect( () => {
        const menu = document.getElementById('mobilemenu') || undefined;
        if(menu){
            setMenuMobile(true)
            menu.style.backgroundColor = MobileColorBackground;
            menu.style.color = MobileColorText
        } 
    },[isMobile])
    return (
        <nav className="w-full  flex items-center gap-[28%] justify-center py-4  lg:gap-[30%] lg:text-xl " id='navigationbar'>
            {/* Left component*/}
            <div className=' font-bold text-xs flex flex-col items-center justify-center min-w-[150px]  lg:text-xl cursor-pointer '>
                <a href="/" className='text-center'>
                    <span >LAB UNIVERSITY</span> 
                    <br />
                    <span>OF APPLIED SCIENCES</span>
                </a>
                
            </div>
            
            <div className='font-medium'>
                {openMenu && isMobile ? (
                    <MdClose 
                        size={'24px'}
                        className='cursor-pointer'
                        onClick={handleMenu}
                    />
                ) : !openMenu && isMobile ?(
                    <MdMenu 
                        size={'24px'}
                        className='cursor-pointer'
                        onClick={handleMenu}
                    />
                ) : (
                    // desktop size
                    <div className='desktop-menu flex flex-row items-center justify-center gap-[25px] lg:gap-[40px] lg:font-light' >
                        {props.map (element => {
                            const name = element[0];
                            const link = element[1];
                            return <div key={name} className='cursor-pointer hover:underline'><Link href={link}>{name}</Link></div>      
                        })}
                        
                    </div>
                )} 
                   
                <section className={`w-full min-h-screen absolute left-0 mt-5 py-8 px-5 menu text-center ${menuMobile && openMenu ? 'z-50 overflow-hidden' :'offscreen'}`} id='mobilemenu'>
                    { openMenu && (     
                        <div className=' flex flex-col gap-8 text-2xl'>
                            {props.map (element => {
                                const name = element[0];
                                const link = element[1];
                                
                                return <div key={name} className='cursor-pointer hover:underline'><Link href={link}>{name}</Link></div>          
                            })}
                             <div className='w-full px-[20%] xl:px-[30%] text-center hover:bg-[#13F287] hover:text-black py-5 cursor-pointer border-t-2 border-custom-dim-gray  ' onClick={handleLogOut}>Logout</div>
                        </div>
                    )} 
                </section>
                           
            </div>
       </nav>
    )
  }