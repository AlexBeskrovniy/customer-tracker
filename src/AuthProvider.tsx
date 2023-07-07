import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { signInWithGoogle, auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

const AuthContext = createContext<any>({});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

interface CustomerDoc {
    id: string,
    date?: string,
    customer?: string,
    price?: string,
    notes?: string,
    uid?: string
}

type CustomerDocs = CustomerDoc[] | [];

const customerColRef = collection(db, "customers");

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [data, setData] = useState<CustomerDocs>([]);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log(user);
                navigate('/');
                const dataQuery = query(customerColRef, where("uid", "==", user.uid));
                
                onSnapshot(dataQuery, (querySnapshot) => {
                
                    const userData = querySnapshot.docs.map(doc => {
                        return {
                            id: doc.id,
                            ...doc.data()
                        }
                    });
                    console.log(userData);
                    setData(userData);
                });
            } else {
                setUser(null);
                setData(data);
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
        <AuthContext.Provider value={{ user, data, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
