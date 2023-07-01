import { PropsWithChildren } from 'react';
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../AuthProvider";

const AuthCheck = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();

    if (!user) return <Navigate to='/login' replace />
    
    return children;
}

export default AuthCheck;