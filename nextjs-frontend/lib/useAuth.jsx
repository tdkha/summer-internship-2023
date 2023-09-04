
const URL = process.env.SERVER_URL;

export async function useRegister(user_info) {
    const response = await fetch(`${URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user_info : user_info })
    });
    const jsonData = await response.json();
   
    if(!response.ok) throw new Error( jsonData.message)
    return [response,jsonData]
}

export async function useLogin(username , password) {
    const response = await fetch(`${URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username , password: password})
});
    const jsonData = await response.json();
    if(!response.ok) throw new Error( jsonData.message)
    return [response,jsonData]
}

export async function usePersistLogin() {
    // Persist Login
    const response = await fetch(`${URL}/api/auth/persist-login`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });
    
    const jsonData = await response.json();
    const directPath = jsonData.directPath || undefined
    return directPath
}
export async function useLogout() {
    const response = await fetch(`${URL}/api/auth/logout`,{
        method: 'GET',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
    });
    return response
}
export default { useRegister , useLogin ,usePersistLogin,useLogout}