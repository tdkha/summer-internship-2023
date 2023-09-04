'use client'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import FileSaver from 'file-saver';
import { AiOutlineFilePdf } from "react-icons/ai";

export default function CertiDashBoard() {
    const URL = process.env.SERVER_URL;
    const [fileLink, setFileLink] = useState([]);
    const [errMsg ,setErrMsg] = useState('');
    const handleCertificate = async(e) =>{
        e.preventDefault();
        const response = await fetch(`${URL}/api/student/order-certificate`, {
        method: 'GET',
        credentials: 'include',
        
        });
        if (response.ok) {   
            const blob = await response.blob();
            const currentDate = new Date().toISOString().slice(0, 10).split("-").join("_");
            const fullname = localStorage.getItem('fullName').split(" ").join("_")
            const outputFileName = currentDate + "_"+fullname;
            FileSaver.saveAs(blob, `${outputFileName}.pdf`);
          } else {
            setErrMsg("Something went wrong.Please try again or send us a message.")
          }
    }
    const handleDownload = async (e, filename) => {
        e.preventDefault();
        const response = await fetch(`${URL }/api/student/get-certificate/${filename}`, {
                method: 'GET',
                credentials: 'include',
        });
        if (response.ok) {
          const blob = await response.blob();
          FileSaver.saveAs(blob, `${filename}.pdf`);
        } else {
          setErrMsg("Something went wrong.Please try again or send us a message.")
        }
    }
    useEffect( () =>{
        const getPdfLink = async()=>{
            const response = await fetch(`${URL}/api/student/get-certificate`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Authorization': `Bearer ${Cookies.get('accessToken')}`,
                }
            });
            const jsonData = await response.json();
            if (jsonData) return setFileLink(jsonData);
        }
        getPdfLink();
        return () => {
          setFileLink('')
          setErrMsg('')
        }
    },[]);
  return (
    <div className=' w-full min-h-screen flex flex-col gap-8 item-center   text-white  '>
                <h1 className='font-black text-base md:text-lg lg:text-2xl self-start tracking-wider'>CERTIFICATE DASHBOARD</h1>
                <div className='w-full min-h-[200px]  black-text rounded-3xl border border-custom-blur-black'>
                    <div className='w-full  pb-2 pt-4 px-8 rounded-t-3xl  border-b border-custom-blur-black'>
                        <h2 className='text-base md:text-xl font-semibold'>Transcript</h2>
                        <p className='text-sm'><span className='text-neon-green'>Note:</span> Reload the page if nothing appears</p>
                    </div>
                    
                    <div className='py-4 px-8 '>
                      { 
                        fileLink.length != 0 ? (
                          fileLink.map( file => 
                            <div className='w-full flex flex-col justify-start text-white opacity-80 hover:text-[#13F287] hover:opacity-100'>
                              <div className='inline-flex  items-center gap-2 cursor-pointer py-2' onClick={ e => handleDownload(e,file)} key={file}><span><AiOutlineFilePdf/></span> {`${file}.pdf`}</div>
                            </div>
                          )
                      ) : <p className='text-white'>No files available</p>
                      }
                    </div>
                    <div className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                    <div className='p-4 '>
                        <button className='w-[150px] text-white opacity-80 hover:text-black hover:opacity-100 border-white hover:border-[#13F287] hover:bg-[#13F287] rounded-2xl border-opacity-50 border-2 min-h-[50px]' onClick={handleCertificate}>Order a certificate</button>
                    </div>
                </div>
            </div>
  )
}
