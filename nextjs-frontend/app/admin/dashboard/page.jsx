"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef, useContext } from "react";
import { FaSquare } from "react-icons/fa";
import TextLoading from "../components/TextLoading";
export default function AdminDashBoardPage() {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      const fullName = localStorage.getItem("fullName");
      setName(fullName);
    };

    const timer = setTimeout(() => {
      fetchData();
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timeout when the component unmounts
  }, []);

  return (
    <section className="w-full relative flex-col justify-center items-center text-black">
      <div className="text-center py-4">
        <h1 className="text-3xl tracking-widest">Welcome back, {name}</h1>
      </div>

      <div className="w-full text-black font-medium py-4 flex flex-col gap-4 md:grid md:grid-cols-2 md:auto-cols-fr">
        <div className="w-full md:col-span-2 md:w-1/3 xl:w-1/4 2xl:w-1/5 bg-black text-white text-center tracking-widest  p-4 ">
          <h2 className="text-2xl 2xl:text-2xl ">&lt; Dashboard &gt;</h2>
        </div>
        <div className="w-full  bg-transparent border-2 border-custom-main-gray hover:border-black  tracking-widest py-4 px-6">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-center text-xl 2xl:text-2xl ">Application</h2>
            <div className="w-full flex flex-col gap-4 justify-start items-center font-light text-sm py-4">
              {!isLoading ? (
                <>
                  <p className="w-full inline-flex items-center  gap-2 md:gap-4 ">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    View statistics
                  </p>
                  <p className="w-full inline-flex items-center  gap-2 md:gap-4 ">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Validate student's information
                  </p>
                  <p className="w-full inline-flex items-center  gap-2 md:gap-4 ">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Making an approval or a decline
                  </p>
                </>
              ) : (
                <>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                </>
              )}
            </div>
            <Link
              href={"/admin/dashboard/application"}
              className="
                bg-transparent hover:bg-black 
                w-fit text-center text-custom-main-gray hover:text-neon-green
                border-2 border-custom-main-gray  hover:border-black 
                px-4 py-2"
            >
              Navigate
            </Link>
          </div>
        </div>
        <div className="w-full   bg-transparent  border-2 border-custom-main-gray hover:border-black  tracking-widest  py-4 px-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-center text-xl 2xl:text-2xl ">Users</h2>
            <div className="w-full flex flex-col gap-4 justify-start items-center font-light text-sm py-4">
              {!isLoading ? (
                <>
                  <p className="w-full  inline-flex items-center gap-2 md:gap-4 ">
                    <span className="font-medium pr-2 border-r-2 border-custom-main-gray">
                      Note{" "}
                    </span>
                    Hosts or company represenatives are responsible for
                    company's hosted projects. Because of that, keeping their
                    contact information is crucial
                  </p>
                  <p className="w-full inline-flex items-center gap-2 md:gap-4 ">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Consist of students and hosts
                  </p>
                  <p className="w-full inline-flex items-center gap-4">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    View student basic information
                  </p>
                  <p className="w-full inline-flex items-center gap-4">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Edit host's contact information
                  </p>
                </>
              ) : (
                <>
                  <h3 className="w-full shine h-[30px] "></h3>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                </>
              )}
            </div>
            <Link
              href={"/admin/dashboard/user"}
              className="
                bg-transparent hover:bg-black 
                w-fit text-center text-custom-main-gray hover:text-cyan-300 
                border-2 border-custom-main-gray  hover:border-black 
                px-4 py-2"
            >
              Navigate
            </Link>
          </div>
        </div>
        <div className="w-full  bg-transparent  border-2 border-custom-main-gray hover:border-black tracking-widest  py-4 px-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-center text-xl 2xl:text-2xl ">Project</h2>
            <div className="w-full flex flex-col gap-4 justify-start items-center  text-sm py-4 font-light ">
              {!isLoading ? (
                <>
                  <p className="w-full inline-flex items-center gap-2 md:gap-4 ">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Edit project information
                  </p>
                  <p className="w-full inline-flex items-center gap-4">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Manage previous and ongoing projects
                  </p>
                  <p className="w-full inline-flex items-center gap-4">
                    <span>
                      <FaSquare size={8} />
                    </span>
                    Post new completed projects to the landing page to showcase
                    work
                  </p>
                </>
              ) : (
                <>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                  <p className="w-full shine h-[20px] "></p>
                </>
              )}
            </div>
            <Link
              href={"/admin/dashboard/project"}
              className="
                bg-transparent hover:bg-black 
                w-fit text-center text-custom-main-gray hover:text-custom-main-yellow 
                border-2 border-custom-main-gray  hover:border-black 
                px-4 py-2"
            >
              Navigate
            </Link>
          </div>
        </div>
        <div className="w-full  bg-transparent  border-2 border-custom-main-gray hover:border-black tracking-widest  py-4 px-8">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-center text-xl 2xl:text-2xl ">Notification</h2>
            <div className="w-full flex flex-col gap-4 justify-start items-center  text-sm py-4 font-light ">
              <p className="w-full inline-flex items-center gap-2 md:gap-4 ">
                <span>
                  <FaSquare size={8} />
                </span>
                Currently Unavailable
              </p>
            </div>
            <Link
              href={"/admin/dashboard/"}
              className="
                bg-transparent hover:bg-black 
                w-fit text-center text-custom-main-gray hover:text-rose-400
                border-2 border-custom-main-gray  hover:border-black 
                px-4 py-2"
            >
              Navigate
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
