"use client";
import React , {useState}from "react";
import Button from "../../../../components/Buttons/Button";

export default function page() {
  const [searchResult, setSearchResult] = useState([]);
  const handleSearch = (value) => {
    //if (!value) return setSearchResult(projects); // set back to default

    // const filtered = projects.filter((project) =>
    //   project.name.toLowerCase().includes(value.toLowerCase())
    // );

    setSearchResult(value);
  };
  const handleAddUser = (value) => {
    
  }

  return (
    <section className="w-full relative flex-col justify-center items-center text-black">
      <div className="w-full  flex items-center justify-between text-center pb-4">
        <h1 className=" text-2xl 2xl:text-2xl tracking-widest ">
          User Dashboard
        </h1>
      </div>
      <div className="w-full  flex items-center justify-between text-center pb-4">
        <form className="flex gap-2 justify-center-center text-black  rounded-3xl px-4 border-2 border-custom-main-gray  ">
          <div className="self-center">
            <svg
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
              color="#939292"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
              ></path>
            </svg>
          </div>

          <input
            className=" 
                          block outline-none appearance-none          
                          h-[35px] md:h-[40px] min-w-[200px] w-full                      
                        bg-custom-blur-white   
                        placeholder-custom-main-gray  focus:border-custom-main-gray 
                          "
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="search"
          />
        </form>

        <div className="">
          <Button
            id={"add-user-button"}
            text={"+ Add user"}
            BorderColor={"transparent"}
            TextColor={"white"}
            BackGroundColor={"#0ea5e9"}
          />
        </div>
      </div>
    </section>
  );
}
