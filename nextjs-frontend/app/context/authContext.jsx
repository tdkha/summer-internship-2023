'use client'
import { createContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const router = useRouter();
    useEffect( () => {
      const checkAccessToken = () => {
        return Cookies.get('accessToken');
      }
      const cookie = checkAccessToken();
      if(!cookie) return router.replace('/auth/login');
    },[])
    return (
        <AuthProvider.Provider>
          {children}
        </AuthProvider.Provider>
      );
}