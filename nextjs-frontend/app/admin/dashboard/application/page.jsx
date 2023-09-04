'use client'
import React, {useState , useEffect , useRef, useContext} from 'react';
import {getApplications ,getApplicationStats} from '../../../../lib/useApplication'
import { useRouter } from 'next/navigation';
import {FaCheckCircle , FaTimesCircle } from "react-icons/fa";
import DoughNut from './components/DoughNut'
import { MobileContext } from '../../../context/mobileContext';
import Button from '../../../../components/Buttons/Button';

export default function AdminApplicationPage() {  
    const [applications, setApplications] = useState([]);
    const [countAll , setCountAll] = useState(0);
    const [countOutsider , setCountOutsider] = useState(0);
    const [countInsider , setCountInsider] = useState(0);
    const [chartData, setChartData] = useState({
        labels: [],
        label: [],
        data: []
    });
    // applicant info
    const [ firstName , setFirstName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ studentNumber, setStudentNumber ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone] = useState('');
    const [ address , setAddress ] = useState('');
    const [ appliedDate , setAppliedDate ] =useState('');

    const [openProfile , setOpenProfile] = useState(false);
    const [errMsg , setErrMsg] = useState('');

    const errRef = useRef();
    const router = useRouter();

    const {isMobile} = useContext(MobileContext);
    //-----------------------------------------------
    // OPEN & CLOSE profile overlay
    //-----------------------------------------------
    const handleOpenProfile = (e , value) => {
        e.preventDefault();
        setFirstName(value.firstname);
        setLastName(value.lastname);
        setStudentNumber(value.student_number);
        setEmail(value.email);
        setPhone(value.phone);
        setAddress(value.address);
        setAppliedDate(value.applied_date);
        
        setOpenProfile(true)
        document.getElementById('mainContainer').style.overflow ='hidden'
    }
    const handleCloseProfile = (e) => {
        e.preventDefault();
        document.getElementById('mainContainer').style.overflow ='scroll'
        setOpenProfile(false);
    }
    //-----------------------------------------------
    // APPROVE & DENY
    //-----------------------------------------------
    const handleApprove = (e) => {
        e.preventDefault();
    }
    const handleDeny = (e) => {
        e.preventDefault();
    }

    useEffect( () =>{
        const fetchAllApplications = async () => {
            try{
                const [response ,jsonData] = await getApplications();
                setApplications(prev => jsonData);
            }catch(err){
                if(err.message == 'Unauthorized') return router.replace('/auth/login');
                return setErrMsg(err.message)
            }
        };
        const fetchApplicationStats = async () => {
            try{
                const [reponse, jsonData] = await getApplicationStats();
                const [all , outsiders , insiders] = jsonData;
                setCountAll(all['countAll']);
                setCountOutsider(outsiders['countOutsider']);
                setCountInsider(insiders['countInsider']);
            }catch(err){
                if(err.message == 'Unauthorized') return router.replace('/auth/login');
                return setErrMsg(err.message)
            }
        };  
        fetchAllApplications();
        fetchApplicationStats();   
    },[]);
    useEffect( () => {
        const setChart = () => {
            const newData = {
                labels: ['outsider', 'insider'],
                label: '# of students',
                data: [countOutsider, countInsider],
            };
            setChartData(prev => newData);
        }   
        setChart()
    },[countInsider , countOutsider])
    return (

             <section className='w-full  text-black relative flex-col  min-h-screen overflow-y-auto ' id='mainContainer'>
                <div className='w-full  flex items-center justify-between text-center pb-4'>
                    <h1 className=' text-2xl 2xl:text-2xl tracking-widest '>Application Dashboard</h1>           
                </div>
                <div className='w-full
                        flex flex-col flex-wrap
                        md:grid  md:grid-cols-3 md:auto-cols-[1fr]
                        gap-4  pb-4  
                        ms-auto me-auto  '>

                    <div className='w-full  py-4 px-8 rounded-lg flex flex-row flex-wrap justify-start gap-4 md:gap-2  bg-white dark:bg-custom-black   '>
                        <div>
                            {countInsider ? <p className='font-black  text-5xl lg:text-6xl'>{countInsider < 10 && '0'}{countInsider} </p> :  <></> }
                        </div>
                        <div className='flex flex-col justify-end tracking-wide'>
                            {countInsider ? 
                                <div className='md:font-semibold flex flex-col justify-center tracking-wide'>
                                    <p>Internal</p>
                                    <p>students</p>
                                </div>  
                            :  <p>None</p>}
                        </div>
                    </div>

                    <div className='w-full  py-4 px-8 rounded-lg flex flex-row flex-wrap justify-start gap-4 md:gap-2 bg-white dark:bg-custom-black   '>
                        <div>
                            {countOutsider ? <p className='font-black  text-5xl lg:text-6xl'>{countOutsider < 10 && '0'}{countOutsider} </p> :  <></>}
                        </div>
                        <div className='md:font-semibold flex flex-col justify-center tracking-wide'>
                            {countOutsider ? 
                                <div>
                                    <p>External</p>
                                    <p>students</p>
                                </div>  
                            :  <p>None</p>}
                        </div>
                    </div>

                    <div className='w-full py-4 px-8 rounded-lg flex flex-row flex-wrap justify-start gap-4 md:gap-2  bg-white dark:bg-custom-black   '>
                        <div>
                            {countAll ? <p className='font-black  text-5xl lg:text-6xl'>{countAll < 10 && '0'}{countAll} </p> : <></>}
                        </div>
                        <div className='md:font-semibold flex flex-col justify-center tracking-wide'>
                            {countAll ? 
                                <div>
                                    <p>Total</p>
                                    <p>students</p>
                                </div>  
                            :  <p>None</p>}
                        </div>
                    </div>

                    <div className='w-full  md:col-span-2 md:row-span-2 p-8 rounded-lg bg-white dark:bg-custom-black  text-cenrer flex flex-col justify-center items-center'>
                        <h2 className='pb-2'>Completion rate</h2>
                    </div>

                    <div className='w-full p-8 rounded-lg bg-white dark:bg-custom-black  text-cenrer flex flex-col justify-center items-center'>
                        <h2 className='pb-2'>Participant percentage</h2>
                        {chartData.data[0] !== 0 && chartData.data[1] !== 0  
                            && <DoughNut props={chartData}/> 
                        }
                    </div>
                    <div className='w-full bg-white dark:bg-custom-black  md:col-span-3 md:row-span-4  py-4 rounded-lg '>
                        <div className='w-full py-2 grid grid-cols-3 md:grid-cols-4 auto-cols-[1fr] ms-auto me-auto   text-center border-b-2 border-custom-blur-white'>
                            <h2>Firstname</h2>
                            <h2>Lastname</h2>
                            <h2 className='invisible md:visible'>LAB student</h2>
                        </div>
                        <div className=' w-full flex-col justify-between'>
                        {
                            applications.length !=0 ? 
                                applications.map( application => 
                                    <div key={application.id} id={`application-${application.id}`} className='text-center py-2 grid grid-cols-3 md:grid-cols-4 auto-cols-[1fr] font-light text-base text-custom-main-gray hover:opacity-100'>
                                        <p>{application.firstname}</p>
                                        <p>{application.lastname}</p>
                                        {!isMobile && <p className='self-center justify-self-center'>
                                            {application.student_number ? (
                                                <FaCheckCircle size={20} color='#13F287' />
                                            ) : (
                                                <FaTimesCircle size={20} />
                                            )}
                                        </p> } 
                                        <p className='cursor-pointer text-neon-green ' onClick={ (e) => handleOpenProfile(e , application)}>View</p>
                                    </div>
                                )  :  <p className='w-full text-center pt-4'>Refresh if nothing appears</p>
                        }
                            <div className={``}></div>
                        </div>

                        
                    </div>

                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"
                    >{errMsg}</p>
                </div> 

                {openProfile && 
                    <div className='w-full min-h-screen top-0 right-0 fixed   bg-white dark:bg-custom-black py-4 md:px-[10%] 2xl:px-[20%]  z-50' id='profileOverlay'>
                        <h1 className='w-full tracking-widest font-bold  text-4xl text-center pb-4 md:pb-8'>Application</h1>
                        <div className='w-full flex flex-col flex-wrap justify-center gap-4'>
                            <div className='w-full '>
                                <h2 className=' px-4 py-2 tracking-wide font-semibold text-lg lg:text-xl border-b-2 border-custom-main-gray'>Personal Information</h2>
                                <div className='px-4  w-full flex flex-col py-4 gap-2 '>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Firstname:</h3>
                                        <p className='text-neon-green'>{firstName}</p>
                                    </div>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Lastname:</h3>
                                        <p className='text-neon-green'>{lastName}</p>
                                    </div>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Student Number:</h3>
                                        <p className='text-neon-green'>{studentNumber || 'None'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full'>
                                <h2 className='px-4  py-2 tracking-wide font-semibold text-lg lg:text-xl border-b-2 border-custom-main-gray'>Contact Information</h2>
                                <div className='px-4  w-full flex flex-col py-4 gap-2'>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Email:</h3>
                                        <p className='text-neon-green'>{email}</p>
                                    </div>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Phone Number:</h3>
                                        <p className='text-neon-green'>{phone}</p>
                                    </div>
                                    <div className=' flex flex-row justify-between'>
                                        <h3 className=' lg:text-xl'>Address:</h3>
                                        <p className='text-neon-green'>{address || 'None'}</p>
                                    </div>
                                </div>                       
                            </div>
                            <div className='w-full flex justify-center gap-6 md:gap-10'>
                                <Button
                                    BackGroundColor={'#7D7D7D'}
                                    TextColor={'#111111'}
                                    text={'Cancle'}
                                    handler={handleCloseProfile}
                                    id={'cancleButton'}
                                />
                                <Button
                                    BackGroundColor={'#f87171'}
                                    TextColor={'#991b1b'}
                                    text={'Deny'}
                                    handler={handleCloseProfile}
                                    id={'denyButton'}
                                />
                                <Button
                                    BackGroundColor={'#86efac'}
                                    TextColor={'#166534'}
                                    text={'Approve'}
                                    id={'approveButton'}
                                />
                            </div>
                        </div>
                    </div>
                }
            </section>

       
      )
}
