import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

type AuthContextType = {
  isLoggedIn: boolean;
  username: string;
  logIn: () => void;
  logOut: () => void;
  isAdmin: boolean
};

type JwtPayLoad = {
  login:string
  exp: number
  role: boolean
}
export const AuthContext = createContext<AuthContextType | null>(null);
AuthContext.displayName = "AuthContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error(
      "Komponent nie został umieszczony w AuthContext"
    );
  }
  return context;
};


const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [username, setuserName ] = useState ("");
    const [expiration, setExpiration] = useState(0);
    const logIn = () => {
      const token = localStorage.getItem('jwtToken');
      if(token != null){
        setIsLoggedIn(true);
        const decodedToken = jwtDecode<JwtPayLoad>(token);
        console.log(decodedToken);
        setuserName(decodedToken.login)
        setExpiration(decodedToken.exp)
        if(decodedToken.role){
          setIsAdmin(true)
        }
      }
    }
    const logOut = () => {
      setIsLoggedIn(false);
      setuserName("");
      setExpiration(0)
      localStorage.removeItem('jwtToken');
      window.location.href = '/';
    }
    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token != null) {
          setIsLoggedIn(true);
          const decodedToken = jwtDecode<JwtPayLoad>(token);
          setuserName(decodedToken.login)
          setExpiration(decodedToken.exp)
          if(decodedToken.role){
            setIsAdmin(true)
          }
        }
    }, []);
    useEffect(() => {
      const interval = setInterval(() => {
        if(expiration != 0){
          console.log(Math.floor(Date.now() / 1000))
         if(( expiration < Math.floor(Date.now() / 1000))){
          console.log("Automatyczne wylogowanie")
          logOut()
         }
        }
      }, 6000);

      return () => clearInterval(interval);
    }, [expiration]);
    return { isLoggedIn, username,logIn, logOut,isAdmin };
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, username, logIn, logOut,isAdmin } = useAuth();
  return (
    <AuthContext.Provider value={{ isLoggedIn,username, logIn, logOut, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};