import Cookies from "js-cookie";
const URL = process.env.SERVER_URL;

export async function getApplications() {    
    const response = await fetch(`${URL}/api/admin/view-all-applications`,{
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    });
    if(!response.ok){
        if(response.status == 401){
            Cookies.remove('accessToken')
            throw  Error('Unauthorized');
        }
        throw Error('Failed to fetch applications')
    } 
    const jsonData = await response.json();
    
    return [response,jsonData]
}
export async function getApplicationStats() {    
    const response = await fetch(`${URL}/api/admin/view-appplication-stats`,{
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
    });
    if(!response.ok){
        if(response.status == 401){
            Cookies.remove('accessToken')
            throw  Error('Unauthorized');
        }
        throw Error('Failed to fetch application stats')
    } 
    const jsonData = await response.json();
    
    return [response,jsonData]
}

export default {getApplications , getApplicationStats}