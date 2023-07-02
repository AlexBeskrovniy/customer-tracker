import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { signInWithGoogle, auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<any>({});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }: PropsWithChildren) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log(user);
                navigate('/');
            } else {
                setUser(null);
            }
        });
    }, []);

    const login = () => {
        signInWithGoogle().catch(console.error);
    }

    const logout = () => {
        signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
