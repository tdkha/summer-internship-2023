'use client'

import {  useState , useContext, useEffect} from 'react';
import { FaUser , FaCaretDown } from "react-icons/fa";
import Link from 'next/link'
import { useRouter , usePathname  } from 'next/navigation';
import { MobileContext } from '../../app/context/mobileContext';
import { useLogout } from '../../lib/useAuth';

export default function VerticalNavBar({props}) {
    const {isMobile} = useContext(MobileContext);

    const [openMenu, setOpenMenu] = useState(false);
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [ role , setRole ] = useState('');

    const router = useRouter();
    const pathName = usePathname()
    const handleMenu = () => {
        setOpenMenu(!openMenu);
    };
    const handleLogOut = async(e) => {
        e.preventDefault();
        await useLogout();
        localStorage.clear();
        return router.replace('/auth/login');
    }
    useEffect( () => {  
        const getName = localStorage.getItem('fullName')
        const getEmail = localStorage.getItem('email')
        const getRole = pathName.split('/')[1]
        const reformattedRole = getRole.charAt(0).toUpperCase() + getRole.slice(1);
        setFullName(getName);
        setEmail(getEmail);
        setRole(reformattedRole)
    },[])
  return (
    <nav className={`lg:text-xl text-white  z-50 min-h-screen min-w-[250px] overflow-hidden
                ${isMobile ? 'bg-transparent w-min' : 'bg-custom-black w-[25%]   border-r-[1px] border-r-custom-blur-black'}`} 
        id='navigationbar'
    >   
            <section className='h-full flex flex-col items-center justify-between gap-8 lg:font-light py-4' >
                <div className=' font-bold text-sm flex flex-col items-center justify-center min-w-[150px]  cursor-pointer '>
                    <a href="/" className='text-center'>
                        <span ><span className='text-main'>LAB</span> UNIVERSITY</span> 
                        <br />
                        <span>OF APPLIED SCIENCES</span>
                    </a>
                </div>

                <div className="flex flex-col w-full justify-center items-center font-medium text-base 2xl:text-xl">
                    {props.map (element => {
                        const name = element[0];
                        const link = element[1];
                        return <div key={name} className='w-full px-[20%] xl:px-[30%] text-center transition-all ease-out duration-500  hover:bg-custom-light-black  py-4 cursor-pointer'><Link href={link}>{name}</Link></div>      
                    })}
                    
                </div> 
       
                <div className='w-full px-2 2xl:px-4 '>
                    <div className='w-full py-4 lg:py-6 px-4  2xl:px-8 bg-custom-black  rounded-xl border border-custom-blur-black flex flex-col gap-4 justify-evenly items-center'>
                       <div className='w-full flex flex-row flex-wrap gap-4 items-center relative'>
                            <div className=' 2xl:visible invisible text-black font-semibold absolute top-0 -right-4 text-xs bg-gradient-to-r from-neon-green to-neon-green px-2 py-1 rounded-lg tracking-wider'>
                                {role}
                            </div>
                            <div className='w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full bg-white relative cursor-pointer'>          
                                <FaUser 
                                    size={'50%'}
                                    color='black'
                                    className='cursor-pointer absolute top-0 left-0 translate-x-[50%] translate-y-[50%]'
                                />    
                                <div className='w-[15px] h-[15px] bg-neon-green rounded-full absolute bottom-0 right-0 border-2 border-custom-black'></div>   
                            </div>
                            
                            <div className=''>
                                <h2 className='text-sm font-semibold'>{fullname}</h2>
                                <p className='text-xs text-custom-main-gray cursor-pointer'>{email}</p>
                            </div>
                       </div>

                        <button
                            onClick={handleLogOut}
                            className='w-full h-fit   py-2 px-4 text-center text-base tracking-widest border-2 border-custom-blur-black rounded-2xl text-red-400 transition-all   ease-linear duration-200  hover:bg-red-400 hover:text-red-800 '> 
                            Logout
                        </button>
                    </div>
                    
                </div>
            </section>
       </nav>
  )
}
