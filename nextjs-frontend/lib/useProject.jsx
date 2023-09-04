import Cookies from "js-cookie";

const URL = process.env.SERVER_URL;

// -------------------------------------------------------------------------------
// GET projects by <year>
// -------------------------------------------------------------------------------
export async function getOngoingProjects() {
    const date = new Date()
    const year = date.getFullYear();
    const response = await fetch(`${URL}/web-content/ongoing-projects?year=${year}`);

    if(!response.ok) throw Error('Failed to fetch ongoing projects')
    const ongoingProjects = await response.json();
    return ongoingProjects;
}
export async function getProjectsByYear(year) {
  const response = await fetch(`${URL}/web-content/ongoing-projects?year=${year}`);

  if(!response.ok) throw Error(`Failed to fetch project by year ${year}`)
  const projects = await response.json();

  return projects;
}
// -------------------------------------------------------------------------------
//  GET completed projects
// -------------------------------------------------------------------------------
export async function getCompletedProjects() {
    const response = await fetch(`${URL}/api/student/completed-projects`,{
        //method: 'GET',
        credentials: 'include',
        headers: {
          //'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }     
      });

    if(!response.ok){
      if(response.status == 401){
        Cookies.remove('accessToken')
        throw  Error('Unauthorized');
      }
        throw  Error('Failed to fetch registered projects');
    } 
    const completedProjects = await response.json();
    return completedProjects;
}
// -------------------------------------------------------------------------------
//  GET all registered projects
// -------------------------------------------------------------------------------
export async function getRegisteredProjects() {
    const response = await fetch(`${URL}/api/student/registered-projects`,{
        credentials: 'include',
        headers: {
          //'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }     
      });
      
    if(!response.ok){
      if(response.status == 401){
         Cookies.remove('accessToken')
        throw Error('Unauthorized');
      }
        throw  Error('Failed to fetch registered projects');
    } 
    const registeredProjects = await response.json();
    return registeredProjects;
}
// -------------------------------------------------------------------------------
//  ADD & REMOVE projects
// -------------------------------------------------------------------------------
export async function addProjects( projects) {
    const response = await fetch(`${URL}/api/student/add-projects`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify({projects : projects})    
      });

    if(!response.ok){
        if(response.status == 401) throw  Error('Unauthorized');
        throw Error('Failed to add projects');
    } 

    return response;
}
export async function removeProject( project) {
    const response = await fetch(`${URL}/api/student/remove-project`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          //'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        },
        body: JSON.stringify({project : project})    
      });

    if(!response.ok){
        if(response.status == 401) throw  Error('Unauthorized');
        throw Error('Failed to remove projects');
    } 

    return response;
}

export default {
    getOngoingProjects , getProjectsByYear , 
     getCompletedProjects, getRegisteredProjects,
    addProjects , removeProject
}