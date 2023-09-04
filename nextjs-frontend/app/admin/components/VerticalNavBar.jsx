"use client";

import { useState, useContext, useEffect } from "react";
import { FaUser } from "react-icons/fa";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { MobileContext } from "../../context/mobileContext";
import { useLogout } from "../../../lib/useAuth";
import Image from "next/image";
import LAB_logo from "../../../public/img/LAB_Logo.png";

export default function VerticalNavBar({ props }) {
  const { isMobile } = useContext(MobileContext);

  const [openMenu, setOpenMenu] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const router = useRouter();
  const pathName = usePathname();
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleLogOut = async (e) => {
    e.preventDefault();
    await useLogout();
    localStorage.clear();
    return router.replace("/auth/login");
  };
  useEffect(() => {
    const getName = localStorage.getItem("fullName");
    const getEmail = localStorage.getItem("email");
    const getRole = pathName.split("/")[1];
    const reformattedRole = getRole.charAt(0).toUpperCase() + getRole.slice(1);
    setFullName(getName);
    setEmail(getEmail);
    setRole(reformattedRole);
  }, []);
  return (
    <nav
      className={`lg:text-xl text-custom-main-gray  z-50 min-h-screen min-w-[250px] overflow-hidden
                ${
                  isMobile
                    ? "bg-transparent w-min"
                    : "bg-white w-[20%]   border-r-[1px] border-r-custom-blur-white dark:border-r-custom-blur-black"
                }`}
      id="navigationbar"
    >
      <section className="h-full flex flex-col items-center justify-between gap-8 lg:font-light py-8">
        <a
          href="/"
          className="w-full  font-bold text-base flex flex-row pl-[15%]  items-center gap-2  min-w-[150px]  cursor-pointer "
        >
          <Image src={LAB_logo} height={38} alt="logo" />
          <div className="text-black">
            <p>Lab University</p>
            <p>Of Applied Sciences</p>
          </div>
        </a>

        <div className="flex flex-col w-full justify-center items-center font-normal  text-base 2xl:text-lg">
          {/* <home> menu component */}
          <Link
            href={"/"}
            className="w-full flex item-center gap-4  px-[15%]  hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V9.75025L12.0002 4.75024L4.75024 9.75025V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
              ></path>
            </svg>

            <h1 className=" text-center transition-all ease-out duration-500  ">
              Home
            </h1>
          </Link>
          {/* <dashboard> menu component */}
          <Link
            href={"/admin/dashboard"}
            className="w-full flex item-center gap-4 px-[15%]  hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.75 8.75V19"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 8.25H19"
              ></path>
            </svg>
            <h1 className=" text-center transition-all ease-out duration-500  ">
              Dashboard
            </h1>
          </Link>
          {/* <dashboard> content component */}
          <div className="w-full">
            <Link
              href={"/admin/dashboard/application"}
              className="w-full flex item-center gap-4 pl-[25%]    hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9 6.75H7.75C6.64543 6.75 5.75 7.64543 5.75 8.75V17.25C5.75 18.3546 6.64543 19.25 7.75 19.25H16.25C17.3546 19.25 18.25 18.3546 18.25 17.25V8.75C18.25 7.64543 17.3546 6.75 16.25 6.75H15"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14 8.25H10C9.44772 8.25 9 7.80228 9 7.25V5.75C9 5.19772 9.44772 4.75 10 4.75H14C14.5523 4.75 15 5.19772 15 5.75V7.25C15 7.80228 14.5523 8.25 14 8.25Z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.75 12.25H14.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M9.75 15.25H14.25"
                ></path>
              </svg>

              <h2 className=" text-center transition-all ease-out duration-500  ">
                Application
              </h2>
            </Link>
            <Link
              href={"/admin/dashboard/project"}
              className="w-full flex item-center gap-4 pl-[25%]    hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M4.75 9.75C4.75 8.64543 5.64543 7.75 6.75 7.75H17.25C18.3546 7.75 19.25 8.64543 19.25 9.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V9.75Z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8.75 7.5V6.75C8.75 5.64543 9.64543 4.75 10.75 4.75H13.25C14.3546 4.75 15.25 5.64543 15.25 6.75V7.5"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5 13.25H19"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M8.75 11.75V14.25"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.25 11.75V14.25"
                ></path>
              </svg>

              <h2 className=" text-center transition-all ease-out duration-500  ">
                Project
              </h2>
            </Link>

            <Link
              href={"/admin/dashboard/user"}
              className="w-full flex item-center gap-4 pl-[25%]    hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M5.78168 19.25H13.2183C13.7828 19.25 14.227 18.7817 14.1145 18.2285C13.804 16.7012 12.7897 14 9.5 14C6.21031 14 5.19605 16.7012 4.88549 18.2285C4.773 18.7817 5.21718 19.25 5.78168 19.25Z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15.75 14C17.8288 14 18.6802 16.1479 19.0239 17.696C19.2095 18.532 18.5333 19.25 17.6769 19.25H16.75"
                ></path>
                <circle
                  cx="9.5"
                  cy="7.5"
                  r="2.75"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></circle>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M14.75 10.25C16.2688 10.25 17.25 9.01878 17.25 7.5C17.25 5.98122 16.2688 4.75 14.75 4.75"
                ></path>
              </svg>

              <h2 className=" text-center transition-all ease-out duration-500  ">
                Users
              </h2>
            </Link>
          </div>
          {/* setting component*/}
          <div className="w-full flex item-center gap-4 px-[15%]  hover:bg-custom-light-black  py-4  hover:text-custom-blur-white ">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4.75 6.75C4.75 5.64543 5.64543 4.75 6.75 4.75H17.25C18.3546 4.75 19.25 5.64543 19.25 6.75V17.25C19.25 18.3546 18.3546 19.25 17.25 19.25H6.75C5.64543 19.25 4.75 18.3546 4.75 17.25V6.75Z"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M9.75 8.75V19"
              ></path>
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M5 8.25H19"
              ></path>
            </svg>
            <h1 className=" text-center transition-all ease-out duration-500  ">
              Setting
            </h1>
          </div>
          {/* <dashboard> content component */}
          <div className="w-full">
            <div className="w-full flex item-center gap-4 pl-[25%]    hover:bg-custom-light-black  py-4 cursor-pointer hover:text-custom-blur-white">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M18.25 15.7499C17.2352 16.2904 16.23 16.25 15 16.25C10.9959 16.25 7.75 13.0041 7.75 9.00001C7.75 7.77001 7.70951 6.76474 8.25 5.74994C5.96125 6.96891 4.75 9.2259 4.75 12C4.75 16.004 7.99594 19.25 12 19.25C14.7741 19.25 17.031 18.0387 18.25 15.7499Z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M16 4.75C16 6.95914 14.9591 9 12.75 9C14.9591 9 16 11.0409 16 13.25C16 11.0409 17.0409 9 19.25 9C17.0409 9 16 6.95914 16 4.75Z"
                ></path>
              </svg>

              <h2 className=" text-center transition-all ease-out duration-500  ">
                Dark Mode
              </h2>
            </div>
          </div>
        </div>

        <div className="w-full py-4 px-8">
          <div className="w-full  flex flex-col gap-4 justify-evenly items-center">
            <div className="w-full flex flex-row flex-wrap gap-4 items-center relative">
              <div className="w-[30px] h-[30px] md:w-[35px] md:h-[35px] rounded-full bg-black relative cursor-pointer">
                <FaUser
                  size={"50%"}
                  color="white"
                  className="cursor-pointer absolute top-0 left-0 translate-x-[50%] translate-y-[50%]"
                />
                <div className="w-[15px] h-[15px] bg-neon-green rounded-full absolute bottom-0 right-0 border-2 border-custom-black"></div>
              </div>

              <div className="text-black">
                <h2 className="text-sm font-semibold">{fullname}</h2>
                <p className="text-xs text-custom-main-gray cursor-pointer">
                  {email}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogOut}
              className="w-full h-fit   py-2 px-4 text-center text-base tracking-widest border-2 border-custom-main-gray text-custom-main-gray rounded-2xl ransition-all   ease-linear duration-200  hover:bg-red-400 hover:text-red-800 "
            >
              Logout
            </button>
          </div>
        </div>
      </section>
    </nav>
  );
}
