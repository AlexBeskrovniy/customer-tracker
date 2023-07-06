import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { signInWithGoogle, auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { collection, onSnapshot, query, where, getDocs } from "firebase/firestore";
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
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [data, setData] = useState<CustomerDocs>([]);

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log(user);
                navigate('/');
                const dataQuery = query(customerColRef, where("uid", "==", user.uid));
                
                getDocs(dataQuery)
                    .then(snapshot => {
                        let customers;
                        customers = snapshot.docs.map(doc => {
                            return {
                                id: doc.id,
                                ...doc.data()
                            }
                        });
                        console.log(customers);
                        setData(customers);
                    })
                    .catch(console.error);
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
        <AuthContext.Provider value={{ user, data, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
