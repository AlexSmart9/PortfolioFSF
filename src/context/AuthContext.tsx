import {createContext, useContext, useState, useEffect, type ReactNode} from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
    userRole: string | null;
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children} : {children: ReactNode}) => {
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect (() => {
        const token = localStorage.getItem('token');
        if (token) {
            decodeAndSetUser(token);
        }
    }, [])

    const decodeAndSetUser = (token:string) => {
        try {
            const decoded: any = jwtDecode(token);
            setUserRole(decoded.data.role);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Invalid token", error)
            logout();
        }
    };

    const login = (tokem:string) => {
        localStorage.setItem('token', tokem);
        decodeAndSetUser(tokem);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUserRole(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{userRole, isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context; 
    
};