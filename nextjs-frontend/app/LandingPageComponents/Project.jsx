'use client'
import { useEffect, useState, useRef   } from 'react';
import star_delimiter from '../../public/img/star_delimiter.png'
import Image from 'next/image';
import ToggleButton from '../../components/Buttons/ToggleButton';
import {getOngoingProjects} from '../../lib/useProject';

//---------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!------------------------------------
//  NOTE : since the projects per year are not LARGE enough (we had all the data from the query) =>  filtering from the client
//---------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!-------------------------------------

export default function ProjectContainer(){
    //----------------------------------------------------
    // project filter
    //----------------------------------------------------
    const [originalProjects , setOriginalProjects] = useState([]);
    const [projects , setProjects] = useState([]);
    const [field , setField] = useState([]);
    const [filter , setFilter] = useState('All');
    const [projectErrMsg, setProjectErrMsg ] = useState('')
    //----------------------------------------------------
    // handlers
    //----------------------------------------------------
    const handleProjectFilter = async(e) =>{
        e.preventDefault();
        
        const filter = e.target.innerHTML;
        if(field.includes(filter)){
            setFilter(filter)
            if (filter == "All"){
                setProjects(originalProjects)
                return null;
            }    
            const newProjects = originalProjects.filter(element => element.field == filter);
            setProjects(newProjects)
        } else {
            return null;
        }
    }
    //----------------------------------------------------
    // fetching data for project list (div)
    //----------------------------------------------------
    useEffect( () => {
        const fetchData = async () => {    
            try{
                const response = await getOngoingProjects();
                if(response.length !== 0 ){
                    setOriginalProjects(response);
                    setProjects(response);
                }
                const fieldList = new Set(response.map( element => element.field));
                let fieldArray = Array.from(fieldList);
                if (fieldArray.length !== 0 ){
                    fieldArray =["All",...fieldArray]
                    setField(fieldArray);
                }
                
            } catch(err){
                setProjectErrMsg(["No available projects"])
            }        
        }
        
        fetchData();
    },[])
    return(
        <div className='bg-custom-black w-full flex flex-col items-center justify-center py-4 '>
            <div className='w-full flex flex-row justify-center items-center text-white text-3xl md:w-4/5 lg:text-6xl  '>
                <h2><span className=''>Available</span> projects</h2>
            </div>

            <div className=' my-10 px-8  flex flex-col gap-8 '>
                <div className='flex flex-row rounded-lg bg-custom-black  h-min w-min text-white  border border-[#404042] border-opacity-50'>
                    {field.length !== 0 ? field.map(element =>
                        <div key={element}
                            onClick={handleProjectFilter}
                             className={`bg-custom-black  p-2  text-center min-w-[80px] rounded-3xl text-xs cursor-pointer ${filter == element ? 'text-black bg-neon-green': ''}`}>
                            {element}
                        </div>
                    ) : <></>}
                    
                </div>
            </div>      

            <div className='project-container w-[80%] md:w-[60%]  max-h-[400px] bg-scroll overflow-y-auto text-white  flex flex-col rounded-2xl font-light border border-[#404042] border-opacity-50'>  
                {projects ? projects.map(project =>
                    <div key={project['name']} className='text-custom-main-gray py-4 px-8 bg-custom-black hover: hover:text-black hover:bg-neon-green'>
                        <p>{project['name']}</p>
                    </div>
                ) : <></>}
                {projectErrMsg && <p className='py-4 px-8 text-white  '>{projectErrMsg}</p>}
            </div> 
            
            <div className='w-[68%] max-w-[400px] md:max-w-[400px] mt-8'>
                <Image
                    src={star_delimiter}
                    alt="star_delimiter "
                />
            </div>
        </div>
        
    )
}