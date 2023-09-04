'use client'
import React, { useRef, useState , useEffect, useContext} from 'react'
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useRouter, redirect } from 'next/navigation';
import Button from '../../../components/Buttons/Button';
import { MobileContext } from '../../context/mobileContext';
import { useLogin, usePersistLogin } from '../../../lib/useAuth'

export default function LoginComponent() {
  //------------------------------------------
  // useContext hooks
  //------------------------------------------
  const {isMobile} = useContext(MobileContext);
  //------------------------------------------
  // navigation
  //------------------------------------------
  const router = useRouter();
  //------------------------------------------
  // useState hooks
  //------------------------------------------
  const [username , setUsername] = useState('');
  const [pwd , setPwd ] = useState('');
  const [errMsg , setErrMsg] = useState('');
  const [success , setSuccess] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  //------------------------------------------
  // useRef hooks
  //------------------------------------------
  const userRef = useRef();
  const errRef = useRef();
  const successRef = useRef();
  //------------------------------------------
  // useEffetct hooks
  //------------------------------------------
  useEffect(  () => {
    const persistLogin = async () => {
      const directPath = await usePersistLogin();
      if(directPath) return router.push(`${directPath}/dashboard`);
    }
    persistLogin()
    userRef.current.focus()
  },[]);

  useEffect(() => {
    setErrMsg('')
  }, [username, pwd]);
  //------------------------------------------
  // handlers hooks
  //------------------------------------------
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(username.trim() == '' || pwd.trim() == ''){
      setErrMsg('Missing information');
      return null
    }
    
    setIsLoading(true);
    try{
      const [response,jsonData] = await useLogin( username, pwd );
      const path = jsonData.directPath;
      if(response.ok && jsonData.length !==0){
        for (const element in jsonData){
          if(element !== "directPath"){
            localStorage.setItem(element,jsonData[element])
          } 
        }     
      }
      setTimeout( () =>  setIsLoading(false),2000)
      setTimeout( () => setSuccess(!success),3000)
      setTimeout( () => router.push(`${path}/dashboard`),3000)
    }catch(err){
      setIsLoading(false);
      setErrMsg(err.message);
    }
  } 
  //------------------------------------------
  // main component
  //------------------------------------------
  return (
    <section className={`  flex flex-col justify-center items-center w-full text-white  h-full `}>
      <div className={`bg-custom-dim-black   w-fit flex-col  border-2 border-[#404042] border-opacity-50 flex-wrap py-12 px-24 ${!isMobile  && 'rounded-xl'}`}>
        <form className='flex flex-col justify-center items-center gap-6  rounded-xl w-full gray-bg '>
            <p className='font-semibold pb-2 tracking-wide'>SIGN IN TO YOUR ACCOUNT</p>
            {isLoading && (<p>...Loading...</p>)}
            <div className='rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
              <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black '>Username</label>
              <input 
                type="text" 
                className='w-full bg-transparent  h-[20px] border-none outline-none md:h-[25px] ' 
                ref={userRef}
                onChange={ (e) => setUsername(e.target.value)}
              />
            </div>          
            <div className='h-max rounded-xl border-2 border-white border-opacity-50 relative px-4 hover:border-[#13F287]'>
              <label className='text-sm  z-10 relative -top-4 left-0  bg-custom-black '>Password</label>
              <input 
                type="password" 
                className='w-full bg-transparent h-[20px] border-none outline-none md:h-[25px] ' 
                onChange={ (e) => setPwd(e.target.value)}
              />
            </div>
            
            <p
              ref={errRef}
              className={errMsg ? "errmsg text-sm" : "offscreen"} aria-live="assertive"
            >{errMsg}</p>

            <div className='w-full text-center relative translate-x-16 md:translate-x-20'>
              <p className='text-xs '><a href="/">Forgot Password?</a></p>
            </div>
            
            <Button 
              id={'loginSubmitButton'}
              handler={handleSubmit} text={'Continue'}
              TextColor={'#757166'}  HoverTextColor={'#040406'}
              BorderColor={'#757166'} HoverBorderColor={'#13F287'} 
              BackGroundColor={'transparent'} HoverBackGroundColor={'#13F287'} 
            />
            <p className=' mt-4'>Do not have an account? <span><a href="/auth/register" className='text-neon-green'>Register</a></span></p> 
          </form>    
      </div>

      <div className={success ? "top-0 left-0  bg-custom-blur-black  w-full h-screen absolute opacity-80 z-20" : "offscreen"}></div>
        <div
          className= {success ? "top-[50%] left-0 -translate-y-[50%]  bg-neon-green z-40 w-full h-[50vh] absolute text-center text-custom-black  py-20 px-4" : "offscreen"}
          ref={successRef}
        >
          <h1 className='font-bold text-3xl'>Successfully Logged In</h1>
          <h2 className='font-light text-lg mb-10'>...Please wait...</h2>
          <LoadingSpinner/>
        </div>
    </section>
  )
}