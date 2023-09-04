"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import Button from "../../../../components/Buttons/Button";
import {
  getOngoingProjects,
  getRegisteredProjects,
  getCompletedProjects,
  addProjects,
  removeProject,
} from "../../../../lib/useProject";
import BadgeIT from "../../../../public/img/IT_badge.png";
import BagdeMEC from "../../../../public/img/MEC_badge.png";

export default function ProjectComponent() {
  //------------------------------------------
  // useState hooks
  //------------------------------------------
  // --------------------------PROJECTS--------------------------
  const [projects, setProjects] = useState([]);
  // --------------------------REGISTERED PROJECT--------------------------
  const [registeredProjects, setRegisteredProjects] = useState([]);
  // --------------------------COMPLETED PROJECT--------------------------
  const [completedProjects, setCompletedProjects] = useState([]);
  //--------------------------NEW ENROLLMENT--------------------------
  const [newEnroll, setNewEnroll] = useState([]);
  const [selectedNewEnroll, setSelectedNewEnroll] = useState([]); // maintaining the value of selected value from buttons
  const [selectedNewEnrollSelector, setSelectedNewEnrollSelector] = useState(
    []
  ); // maintaining style of selected buttons
  //--------------------------PROJECT INFO--------------------------
  const [filteredSearchResult, setFilterSearchResult] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  //--------------------------REMOVE PROJECT BUTTON --------------------------
  const [removedProject, setRemovedProject] = useState("");
  //-------------------------- ERROR MESSAGES--------------------------
  const [errMsg, setErrMsg] = useState("");
  //-------------------------- Menu open --------------------------
  const [openCompletedProject, setOpenCompletedProject] = useState(false);
  const [openEnrolledProject, setOpenEnrolledProject] = useState(false);
  const [openNewEnrollment, setOpenNewEnrollment] = useState(false);
  const [openProjectInfo, setOpenProjectInfo] = useState(true);
  //------------------------------------------
  // cookies
  //------------------------------------------
  //const cookies = Cookies.get('accessToken');
  //------------------------------------------
  // useRouter hooks
  //------------------------------------------
  const router = useRouter();
  //------------------------------------------
  // handlers
  //------------------------------------------
  const handleOpenCompletedProject = (e) => {
    e.preventDefault();
    setOpenCompletedProject(!openCompletedProject);
  };
  const handleOpenEnrolledProject = (e) => {
    e.preventDefault();
    setOpenEnrolledProject(!openEnrolledProject);
  };
  const handleOpenNewEnrollment = (e) => {
    e.preventDefault();
    setOpenNewEnrollment(!openNewEnrollment);
  };
  const handleOpenProjectInfo = (e) => {
    e.preventDefault();
    setOpenProjectInfo(!openProjectInfo);
  };

  const handleSearch = (value) => {
    if (!value) return setSearchResult(projects); // set back to default

    const filtered = projects.filter((project) =>
      project.name.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResult(filtered);
  };

  const handleSelect = (e) => {
    e.preventDefault();
    const target = e.target;
    const parentEle = target.parentNode;
    const title = parentEle.querySelector("p").innerText;

    target.innerHTML = "Selected";
    target.style.color = "black";
    target.style.background = "#13F287";
    target.disabled = true;
    setSelectedNewEnroll([...selectedNewEnroll, title]);
    setSelectedNewEnrollSelector([...selectedNewEnrollSelector, target]);
  };
  const handlePreRemove = async (e, value) => {
    e.preventDefault();
    setRemovedProject(value);
    const ele = document.getElementById("preremoveConfirmation");
    ele.style.paddingTop = "2rem";
    ele.style.paddingBottom = "2rem";
    ele.style.visibility = "visible";
  };
  const handleRemove = async (e) => {
    const removeContainer = document.getElementById("removeConfirmation");
    removeContainer.style.visibility = "visible";

    try {
      if (!removedProject) return setErrMsg("No projects selected");
      const response = await removeProject(removedProject);
      if (response.ok) {
        const jsonData = await getRegisteredProjects();
        setRegisteredProjects((prev) => jsonData);
        setTimeout(
          () =>
            (document.getElementById("preremoveConfirmation").style.visibility =
              "hidden"),
          2000
        );
        setTimeout(() => (removeContainer.style.visibility = "hidden"), 2000);
        return window.location.reload();
      }
    } catch (err) {
      console.log(err);
      setTimeout(() => setErrMsg("Oops! Something went wrong."), 2000);
      setTimeout(() => window.location.reload(), 5000);
    }
  };
  const handleClear = (e) => {
    e.preventDefault();
    for (const target of selectedNewEnrollSelector) {
      target.innerHTML = "Add";
      target.style.color = "#757166";
      target.style.borderColor = "#757166";
      target.style.background = "transparent";
      target.disabled = false;
    }
    setSelectedNewEnroll([]);
    setSelectedNewEnrollSelector([]);
  };
  const handlePreSubmit = (e) => {
    e.preventDefault();
    const ele = document.getElementById("submitConfirmation");
    ele.style.paddingTop = "2rem";
    ele.style.paddingBottom = "2rem";
    ele.style.visibility = "visible";
  };
  const handleSubmit = (e) => {
    //e.preventDefault();
    const Submmit = async () => {
      try {
        if (selectedNewEnroll.length == 0)
          return setErrMsg("Please add at least one project");
        const response = addProjects(selectedNewEnroll);
        if (response.ok == false) {
          setErrMsg("Oops! Something went wrong.");
          window.location.reload();
        }
        setErrMsg("");
        window.location.reload();
      } catch (err) {
        setErrMsg("Oops! Something went wrong. Please try again");
        console.log(err);
        window.location.reload();
      }
    };
    return Submmit();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    const submit = document.getElementById("submitConfirmation");
    const remove = document.getElementById("preremoveConfirmation");
    submit.style.visibility = "hidden";
    remove.style.visibility = "hidden";
    setErrMsg("");
  };
  //------------------------------------------
  // useEffetct hooks
  //------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ongoing = await getOngoingProjects();
        const registered = await getRegisteredProjects();
        const completed = await getCompletedProjects();
        //---------------------------------Filtering out intersecting options -------------------------------------------
        // destructing an array of objects into an array of elements
        const destructed_projects = ongoing.map((ele) => ele.name); // all projects
        const destructed_registredProjects = registered.map((ele) => ele.name); // registered projects

        const availableOptionArray = destructed_projects.filter(
          (element) => !destructed_registredProjects.includes(element)
        );
        const reformattedOptions = ongoing.filter((element) =>
          availableOptionArray.includes(element.name)
        );
        //---------------------------------useState Setters --------------------------------------------------------------
        setProjects(ongoing);
        setRegisteredProjects(registered);
        setNewEnroll(reformattedOptions);
        setCompletedProjects(completed); // completed project section
        setSearchResult(ongoing); // project info section
      } catch (err) {
        if (err.message == "Unauthorized") return router.replace("/auth/login");
        return window.location.reload(); // error while retrieving (e.g server overload)
      }
    };
    fetchData();
  }, []);

  return (
    <section className="w-full h-full overflow-hidden" id="mainContainer">
      <section className="w-full  ">
        <div
          className="w-full flex flex-col flex-wrap
                    gap-4 pb-4  
                    ms-auto me-auto        
          "
        >
          {/* ----------------------------------------------------- */}
          <div className="w-full md:flex md:flex-row flex flex-col gap-4">
            <div
              className={`w-full h-fit  ${
                openCompletedProject ? "" : "pb-0"
              }  rounded-xl   md:text-white  bg-scroll overflow-y-auto border border-custom-blur-black `}
            >
              <div
                id="enrolledProjectContainer"
                className="  w-full flex flex-row justify-between items-center text-white  md:bg-custom-dim-black py-4   font-semibold  md:text-xl   px-6 tracking-wide"
              >
                <p className="">Enrolled projects</p>
                <div
                  onClick={(e) => handleOpenEnrolledProject(e)}
                  className="cursor-pointer"
                >
                  <FaCaretDown />
                </div>
              </div>
              <div
                className={`${
                  openEnrolledProject && registeredProjects
                    ? "visible opacity-100 flex flex-col gap-4 "
                    : " invisible opacity-0"
                } transition-all duration-700 ease-linear`}
              >
                {openEnrolledProject && registeredProjects && (
                  <div className=" py-4 px-6  flex flex-row flex-wrap justify-start gap-4 md:gap-2 text-white  border-y border-custom-blur-black">
                    <div>
                      <p className="font-black  text-5xl lg:text-6xl">
                        {registeredProjects.length < 10 && "0"}
                        {registeredProjects.length}{" "}
                      </p>
                    </div>
                    <div className="md:font-semibold flex flex-col justify-center tracking-wide">
                      <p>enrolled </p>
                      <p>projects</p>
                    </div>
                  </div>
                )}
                <div className="h-max max-h-[400px] bg-scroll overflow-y-auto">
                  {openEnrolledProject && registeredProjects ? (
                    registeredProjects.map((project) => (
                      <div
                        key={`registeredProject${project.id}`}
                        className={`flex justify-between items-center py-4 px-6 gap-2  text-custom-main-gray hover:bg-custom-light-black  hover:text-neon-green `}
                      >
                        <p className="font-light text-base  ">{project.name}</p>
                        <Button
                          id={`removeProject${project.id}`}
                          BackGroundColor={"transparent"}
                          HoverBackGroundColor={"#f87171"}
                          TextColor={"#757166"}
                          HoverTextColor={"#991b1b"}
                          BorderColor={"#757166"}
                          HoverBorderColor={"#f87171"}
                          handler={(e) => handlePreRemove(e, project.name)}
                          text={"Remove"}
                          TextSize={"xs"}
                        />
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>

                <section
                  className="bg-custom-light-black text-white   w-full h-screen  flex flex-col gap-12 justify-center items-center fixed top-0 left-0  px-8 z-50 invisible"
                  id="preremoveConfirmation"
                >
                  <p className="font-bold text-2xl md:text-3xl">
                    Please check your selection again before deleting
                  </p>
                  {/* ----------------------------------------------------- */}
                  <div className="font-medium text-base md:text-lg py-4 border-t-2 border-b-2 border-custom-main-gray">
                    <p className="py-2">- {removedProject}</p>
                  </div>
                  <div className="w-full py-4">
                    <p
                      className={`${errMsg ? "errmsg" : "offscreen"} z-50`}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                  </div>
                  {/* ----------------------------------------------------- */}
                  <div className="w-full flex justify-center gap-10">
                    <Button
                      BackGroundColor={"#f87171"}
                      TextColor={"#991b1b"}
                      text={"Decline"}
                      handler={handleCancel}
                      id={"cancelButton1"}
                    />
                    <Button
                      BackGroundColor={"#86efac"}
                      TextColor={"#166534"}
                      text={"Continue"}
                      handler={handleRemove}
                      id={"submitRemoveButton"}
                    />
                  </div>
                </section>
                <section
                  className="fixed text-custom-black bg-red-300 black-text w-full h-screen flex flex-col justify-center items-center  top-0 left-0  py-24 px-8  overflow-y-auto invisible z-50"
                  id="removeConfirmation"
                >
                  <h1 className="font-bold text-3xl">
                    Project is being removed
                  </h1>
                  <h2 className="font-light text-lg mb-10">
                    ...Please wait...
                  </h2>
                  <div>
                    <p
                      className={errMsg ? "errmsg" : "offscreen"}
                      aria-live="assertive"
                    >
                      {errMsg}
                    </p>
                  </div>
                </section>
              </div>
            </div>
            {/* ----------------------------------------------------- */}
            <div
              className={`w-full h-fit  ${
                openCompletedProject ? "" : "pb-0"
              } rounded-xl   md:text-white  bg-scroll overflow-y-auto border border-custom-blur-black `}
            >
              <div
                id="completedProjectContainer"
                className="w-full flex flex-row justify-between items-center  text-white  md:md:bg-custom-dim-black py-4   font-semibold  md:text-xl   px-6 tracking-wide"
              >
                <p className="">Completed projects</p>

                <div
                  onClick={(e) => handleOpenCompletedProject(e)}
                  className="cursor-pointer"
                >
                  <FaCaretDown />
                </div>
              </div>

              <div
                className={` ${
                  openCompletedProject
                    ? "visible opacity-100 flex flex-col gap-4"
                    : "invisible opacity-0"
                } transition-all duration-700 ease-linear`}
              >
                {openCompletedProject ? (
                  <div className="py-4 px-6  flex flex-row flex-wrap justify-start gap-4 md:gap-2   border-y border-custom-blur-black">
                    <div>
                      <p className="font-black  text-5xl lg:text-6xl">
                        {completedProjects.length < 10 && "0"}
                        {completedProjects.length}{" "}
                      </p>
                    </div>
                    <div className="md:font-semibold flex flex-col justify-center tracking-wide">
                      <p>completed</p>
                      <p>projects</p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="max-h-[400px] bg-scroll overflow-y-auto">
                  {openCompletedProject && completedProjects.length != 0 ? (
                    completedProjects.map((project) => (
                      <div
                        key={`completedProject${project.id}`}
                        className="hover:bg-custom-light-black"
                      >
                        <p className="font-light text-base py-4 px-6 text-custom-main-gray hover:text-neon-green ">
                          <span className="inline-block relative top-[2px] pr-2">
                            <FaCheckCircle />
                          </span>
                          {project.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Second container */}
        <div className="w-full h-fit rounded-xl black-text bg-scroll overflow-y-auto border  border-custom-blur-black mb-4">
          <div
            className={`w-full ${
              openNewEnrollment ? "border-b border-custom-blur-black" : ""
            } flex flex-row justify-between items-center text-white  md:bg-custom-dim-black py-4   font-semibold  md:text-xl   px-6 tracking-wide`}
          >
            <p className="">New enrollment</p>
            <div
              onClick={(e) => handleOpenNewEnrollment(e)}
              className="cursor-pointer"
            >
              <FaCaretDown />
            </div>
          </div>

          {/* ----------------------------------------------------- */}
          <div
            className={` ${
              openNewEnrollment && newEnroll
                ? "visible opacity-100 flex flex-col gap-4"
                : "invisible opacity-0"
            } transition-all duration-700 ease-linear`}
          >
            {(openNewEnrollment &&
              newEnroll &&
              newEnroll.map((project) => {
                return (
                  <div
                    key={`projectOption${project.id}`}
                    className="  font-light w-full flex justify-between items-center py-1 px-6 hover:bg-custom-light-black text-custom-main-gray hover:text-neon-green"
                  >
                    <p className="text-base py-4 ">{project.name}</p>
                    <Button
                      id={`addProject${project.id}`}
                      BackGroundColor={"transparent"}
                      HoverBackGroundColor={"#13F287"}
                      TextColor={"#757166"}
                      HoverTextColor={"black"}
                      BorderColor={"#757166"}
                      HoverBorderColor={"#13F287"}
                      handler={handleSelect}
                      text={"Add"}
                      TextSize={"xs"}
                    />
                  </div>
                );
              })) || <></>}
            {openNewEnrollment && newEnroll && (
              <div className="flex flex-col gap-4 md:flex-row py-4 px-6 justify-between items-center border-t border-custom-blur-black">
                <p className="text-sm font-light tracking-wider">
                  <span className="text-neon-green">Note:</span> Please add all
                  projects before submitting
                </p>
                <div className="flex gap-4">
                  <Button
                    BackGroundColor={"#f87171"}
                    TextColor={"#991b1b"}
                    text={"Clear"}
                    handler={handleClear}
                    id={"clearButton"}
                  />
                  <Button
                    id={"submitButton"}
                    BackGroundColor={"#13F287"}
                    TextColor={"#166534"}
                    handler={handlePreSubmit}
                    text={"Submit"}
                  />
                </div>
              </div>
            )}
          </div>

          {/* After-submitting component */}
          <section
            className="bg-custom-light-black text-white   w-full h-screen  flex flex-col gap-12 justify-center items-center fixed top-0 left-0  px-8  invisible z-50"
            id="submitConfirmation"
          >
            <p className="font-bold text-2xl md:text-3xl">
              Please check your selection again before submitting
            </p>
            {/* ----------------------------------------------------- */}
            <div className="font-medium text-base md:text-lg py-4 border-t-2 border-b-2 border-custom-main-gray">
              {selectedNewEnroll.map((selected) => (
                <p key={selected} className="py-2">
                  - {selected}
                </p>
              ))}
            </div>
            {/* ----------------------------------------------------- */}
            <div className="w-full py-4">
              <p
                className={`${errMsg ? "errmsg" : "offscreen"} z-50`}
                aria-live="assertive"
              >
                {errMsg}
              </p>
            </div>
            {/* ----------------------------------------------------- */}
            <div className="w-full flex justify-center gap-10">
              <Button
                BackGroundColor={"#f87171"}
                TextColor={"#991b1b"}
                text={"Decline"}
                handler={handleCancel}
                id={"cancelButton2"}
              />
              <Button
                BackGroundColor={"#86efac"}
                TextColor={"#166534"}
                text={"Continue"}
                handler={handleSubmit}
                id={"submitButton2"}
              />
            </div>
          </section>
          {/* ----------------------------------------------------- */}
        </div>
        {/* Third container */}
        <div className="w-full h-fit rounded-xl  bg-scroll overflow-y-auto border  border-custom-blur-black">
          <div
            className={`w-full ${
              openProjectInfo ? "border-b border-custom-blur-black" : ""
            } flex flex-row justify-between items-center text-white  md:bg-custom-dim-black py-4   font-semibold  md:text-xl   px-6 tracking-wide`}
          >
            <p className="">Project information</p>
            <div
              onClick={(e) => handleOpenProjectInfo(e)}
              className="cursor-pointer"
            >
              <FaCaretDown />
            </div>
          </div>
          <div
            className={` ${
              openProjectInfo
                ? "w-full visible opacity-100 flex-flex-col gap-2 justify-center items-center"
                : "invisible opacity-0"
            }  transition-all duration-700 ease-linear`}
          >
            {openProjectInfo && (
              <form className="w-full px-10 pt-6 flex flex-col gap-4 justify-center-center text-white">
                <input
                  className=" 
                          block outline-none appearance-none
                          h-[35px] md:h-[40px] min-w-[200px] w-2/5
                          rounded-3xl px-8 
                        bg-custom-light-black   border border-custom-blur-black
                        placeholder-custom-main-gray  focus:border-custom-main-gray 
                          "
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="search"
                />
                <div className="project_tags">
                  <h2>Tags:</h2>
                </div>
              </form>
            )}
            {openProjectInfo && (
              <div
                className="w-full 
                  p-6
                  flex flex-col
                  md:grid md:grid-cols-2 md:auto-cols-fr 
                  lg:grid-cols-3 lg:auto-cols-fr 
                  2xl:grid-cols-4 :auto-cols-fr 
                  gap-4"
              >
                {openProjectInfo &&
                  searchResult &&
                  searchResult.map((project) => {
                    const { id, name, field, type } = project;
                    const imgSource = field == "IT" ? BadgeIT : BagdeMEC;

                    return (
                      <div
                        key={id}
                        className={`project-card 
                          group
                          p-4
                          bg-custom-light-black md:bg-transparent
                          rounded-xl hover:bg-custom-light-black `}
                      >
                        <div className="relative w-full h-[150px]  bg-custom-light-black rounded-xl mb-5 ">
                          <Image
                            src={imgSource}
                            alt={`${field}_badge`}
                            fill
                            className="w-full h-full py-2 top-0 left-0 object-contain rounded-2xl"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <p className="text-sm text-white">{name}</p>
                          <div className="text-custom-main-gray inline-flex flex-wrap  gap-2 items-center text-sm">
                            <h2 className="text-base mr-2">Description:</h2>
                            <p className="py-[2px] px-2 bg-custom-blur-black  md:bg-custom-light-black  group-hover:bg-custom-blur-black hover:text-white cursor-pointer rounded-sm">
                              {field}
                            </p>
                            <p className="py-[2px] px-2 bg-custom-blur-black  md:bg-custom-light-black  group-hover:bg-custom-blur-black hover:text-white  cursor-pointer rounded-sm">
                              {type}
                            </p>
                          </div>
                          <div className="text-sm text-neon-green cursor-pointer inline-flex gap-1 items-center">
                            Details{" "}
                            <span>
                              <FiExternalLink />
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- */}
    </section>
  );
}
