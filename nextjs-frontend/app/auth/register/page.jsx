'use client'
import React from 'react'
import { useState , useEffect , useRef , useContext} from 'react'
import { MobileContext } from '../../context/mobileContext';
import Button from '../../../components/Buttons/Button';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import {useRegister} from '../../../lib/useAuth'
export default function Register() {
    const URL = process.env.SERVER_URL;
    //------------------------------------------
    // useContext hooks
    //------------------------------------------
    const {isMobile} = useContext(MobileContext);
    //------------------------------------------
    // navigation
    //------------------------------------------
    const router = useRouter();
    //------------------------------------------
    // useRef hooks
    //------------------------------------------
    const fnameRef = useRef();
    const lnameRef = useRef();
    const studentNumRef = useRef();

    const emailRef = useRef();
    const phoneRef = useRef();
    const addressRef = useRef();

    const userRef = useRef();
    const pwdRef = useRef();
    const confirmPwdRef = useRef();
    const checkboxRef = useRef();
    const errRef = useRef();
    const successRef = useRef();
    //------------------------------------------
    // useState hooks
    //------------------------------------------
    const [firstname , setFirstname] = useState('');
    const [lastname , setLastName] = useState('');
    const [studentNum , setStudentNum] = useState(undefined);
    const [email , setEmail] = useState('');
    const [phone , setPhone] = useState('');
    const [address , setAddress] =useState('');
    const [username , setUsername] = useState('');
    const [pwd , setPwd ] = useState('');
    const [confirmPwd , setConfirmPwd] = useState('')
    const [errMsg , setErrMsg] = useState('');
    const [success , setSuccess] = useState(false);
    const [isLoading , setIsLoading] = useState(false);
    const [checkbox , setCheckbox] = useState('');
    //------------------------------------------
    // useEffect hooks
    //------------------------------------------
    useEffect( () => {
        fnameRef.current.focus()
      },[]);

    useEffect(() => {
        setErrMsg('')
      }, [username, pwd,firstname , lastname, studentNum , email ,phone, address, confirmPwd]);

    const handleChecked = (e ,value) => {
        const target = document.getElementById('studentNumContainer');
        if (value == 'yes'){     
            target.style.visibility = 'visible'
        }else{
            target.style.visibility = 'hidden'
            setStudentNum('');
        }
        return setCheckbox(value)
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!firstname){
            setErrMsg('Firstname can not be empty');
            return fnameRef.current.focus();
        }
        if(!lastname){
            setErrMsg('Lastname can not be empty');
            return lnameRef.current.focus();
        }
        if(!checkbox){
            setErrMsg('Checkbox can not be empty');
            return checkboxRef.current.focus();
        }
        if(checkbox == 'yes' ){
            if(!studentNum){
                setErrMsg('Student number can not be empty');
                return studentNumRef.current.focus();
            }     
        }else{
            setStudentNum('');
        }
        if(!email){
            setErrMsg('Email can not be empty');
            return emailRef.current.focus();
        }
        if(!phone){
            setErrMsg('Phone number can not be empty');
            return phoneRef.current.focus();
        }
        if(!address){
            setErrMsg('Address can not be empty');
            return addressRef.current.focus();
        }
        if(!username){
            setErrMsg('Username can not be empty');
            return userRef.current.focus();
        }
        if(!pwd){
            setErrMsg('Password can not be empty');
            return pwdRef.current.focus();
        }
        if(pwd !== confirmPwd){
            setErrMsg('Mismatch passwords. Please try again')
            return confirmPwdRef.current.focus();
        }
        setIsLoading(!isLoading);

        const user_info = {
            firstname: firstname,
            lastname: lastname,
            student_number: studentNum ,
            email: email,
            phone: phone,
            address: address,
            username: username,
            password: pwd
        }
        try{
            const [response] = await useRegister(user_info);
            setTimeout( () => setSuccess(!success),2800)
            setTimeout( () => router.push('/'),3800)
        }catch(err){
            setIsLoading(false)
            setErrMsg(err.message);
        }
    }
  return (
    <section className='w-full h-full text-white  flex justify-center items-center '>
        <div className={`bg-custom-dim-black  w-fit flex-col  border-2 border-[#404042] border-opacity-50  py-12 md:px-20  ${!isMobile  && 'rounded-xl'}` }>
            <form className='flex flex-col justify-center items-center gap-6  rounded-xl w-full gray-bg basis-1/3'>
                <p className='font-semibold pb-2 tracking-wide'>REGISTER YOUR ACCOUNT</p>
                {isLoading && (<p>...Loading...</p>)}
                <div className='w-full flex flex-row justify-center gap-20 flex-wrap'>
                    <div className='flex-col flex gap-6 '>
                        <div className=' border-b-2 border-white border-opacity-80 max-w-[260px] pb-2 '>
                            <h2 className='tracking-wide text-sm  '>Personal Information</h2>
                        </div>
                        <div className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Firstname</label>
                            <input 
                                autoComplete='off'
                                ref={fnameRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setFirstname(e.target.value)}
                            />
                        </div>    
                        <div className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Lastname</label>
                            <input 
                                ref={lnameRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setLastName(e.target.value)}
                            />
                        </div>   

                        <div ref={checkboxRef} className='max-w-[260px] h-fit rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287] flex flex-col py-2'>
                            <label className='text-xs'>Are you a student at LAB University of Applied Sciences?</label>
                            <div className='w-full flex gap-8 py-2'>
                                <label><input className='w-4 h-4' type="radio" name='radioButton' onClick={ (e) => handleChecked(e,'yes')}/><span> Yes</span></label>
                                <label><input className='w-4 h-4' type="radio" name='radioButton' onClick={ (e) => handleChecked(e,'no')}/><span> No</span></label>
                            </div>
                            
                        </div> 

                        <div id='studentNumContainer' className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287] invisible'> 
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Student Number</label>
                            <input 
                                ref={studentNumRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setStudentNum(e.target.value)}
                            />
                        </div> 
                    </div>

                    <div className='flex-col flex gap-6'>
                        <div className=' border-b-2 border-white border-opacity-80 max-w-[260px] pb-2 '>
                            <h2 className='tracking-wide text-sm  '>Contact Information</h2>
                        </div>
                        <div className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Email</label>
                            <input 
                                ref={emailRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setEmail(e.target.value)}
                            />
                        </div>   
                        <div className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Phone Number</label>
                            <input 
                                ref={phoneRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setPhone(e.target.value)}
                            />
                        </div>    
                        <div className='max-w-[260px] max-h-[50px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Address</label>
                            <input 
                                ref={addressRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='flex-col flex gap-6'>
                    <div className=' border-b-2 border-white border-opacity-80 max-w-[260px] pb-2'>
                            <h2 className='tracking-wide text-sm '>User Information</h2>
                        </div>
                        <div className='max-w-[260px] rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className=' z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Username</label>
                            <input 
                                ref={userRef}
                                type="text" 
                                className=' w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setUsername(e.target.value)}
                            />
                        </div>          
                        <div className='max-w-[260px] h-max rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Password</label>
                            <input 
                                ref={pwdRef}
                                type="password" 
                                className='w-full bg-transparent  h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setPwd(e.target.value)}
                            />
                        </div>
                        <div className='max-w-[260px] h-max rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
                            <label className='text-sm z-10 relative -top-4 left-0  bg-custom-black text-white opacity-95'>Confirm password</label>
                            <input 
                                ref = {confirmPwdRef}
                                type="password" 
                                className='w-full bg-transparent h-[20px] border-none outline-none md:h-[20px] ' 
                                onChange={ (e) => setConfirmPwd(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                
                <div className='w-full py-4  text-center'>
                    <p
                        ref={errRef}
                        className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive"
                        >{errMsg}</p>        
                    <Button 
                        id={'registerSubmitButton'}
                        handler={handleSubmit} text={'Submit'}
                        TextColor={'#F6F7D4'}  HoverTextColor={'#040406'}
                        BorderColor={'#F6F7D4'} HoverBorderColor={'#13F287'} 
                        BackGroundColor={'transparent'} HoverBackGroundColor={'#13F287'} 
                    />
                    <p className='grey-text mt-4'>Already have an account? <span><a href="/auth/login" className='text-neon-green'>Login</a></span></p> 
                </div>
                
            </form>    
        </div>

        <div className={success ? "top-0 left-0  black-bg z-20 w-full h-screen absolute opacity-80" : "offscreen"}></div>

        <div
            className= {success ? "top-[50%] left-0 -translate-y-[50%]  green-bg z-40 w-full h-[50vh] absolute text-center black-text font-poppins py-20 px-4" : "offscreen"}
            ref={successRef}
        >
            <h1 className='font-bold text-3xl'>Your application has been submitted</h1>
            <p className='py-2'>It usually takes one week for an application to be processed. A confirmation will be sent via email if the application is approved</p>
            <p className='font-light text-lg mb-10'>...Navigating back to the home page...</p>
            <LoadingSpinner/>
        </div>

    </section>
  )
}
