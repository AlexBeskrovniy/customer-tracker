import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { signInWithGoogle } from './firebase';

const AuthContext = createContext({ user: null, login: () => {}, logout: () => {} });

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<any>(null);

    // useEffect(() => {
    //     const getUser = async () => {
    //         const user = await signInWithGoogle();
    //         console.log(user);
    //         setUser(user);
    //     }

    //     getUser().catch(console.error);
        
    // }, []);

    const login = () => {
        signInWithGoogle().catch(console.error);
    }

    const logout = () => {
        console.log('logout');
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
