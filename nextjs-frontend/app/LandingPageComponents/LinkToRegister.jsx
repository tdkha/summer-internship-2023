'use client'
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { MobileContext } from '../context/mobileContext';
import Button from '../../components/Buttons/Button'
export default function LinkToRegister() {
  const {isMobile} = useContext(MobileContext);
  const router = useRouter();
  const handleNavigate = (e) =>{
    e.preventDefault();
    router.push('/auth/register')
  }
  return (
    <div className="h-fit w-3/5 flex flex-col gap-8 justify-start md:py-24 text-white " >
        <h1 className="  text-neon-green w-full font-bold text-3xl md:w-4/5 lg:text-6xl  ">Want to join but do not have an account yet?</h1>
        <p className="lg:text-2xl lg:font-light grey-text  ">Fill in the registration form and waited for your application to be processes. The process might take 1-2 weeks to complete.</p>
  
        {isMobile ? (<div className="w-full flex flex-row justify-end">
            <button className="font-poppins box-border w-[100px] min-h-[40px] border-2 rounded-3xl text-white  border-white duration-500 ease-linear hover:bg-[#13F287] hover:text-black hover:border-black">
                <h3 className="text-base">Register</h3>
            </button>
        </div>) : (
          <div className="w-full flex flex-row justify-end">
            <Button
              BackGroundColor={'transparent'}
              BorderColor={'#939292'} HoverBorderColor={'#13F287'}
              HoverBackGroundColor={'#13F287'}
              TextColor={'#939292'} HoverTextColor={'black'}
              text={'Register'}
              handler={handleNavigate}
              id={'navigateButton'}
          />
        </div>
        )}
        
    
  </div>
  )
}
