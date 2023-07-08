import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithGoogle, auth } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import type { User } from "firebase/auth";

import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";

const AuthContext = createContext<any>({});

export const useAuthContext = () => {
    return useContext(AuthContext);
}

const customerColRef = collection(db, "customers");

const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<User | null>(null);
    const [storage, setStorage] = useState<CustomerDocs>([]);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                console.log(user);
                navigate('/');
                const dataQuery = query(customerColRef, where("uid", "==", user.uid));
                
                onSnapshot(dataQuery,
                    (querySnapshot) => {
                        const userData: CustomerDocs = querySnapshot.docs.map(doc => {
                            const { date, customer, price, notes, uid } = doc.data();
                            return {
                                id: doc.id,
                                date,
                                customer,
                                price,
                                notes,
                                uid
                                // ...doc.data()
                            }
                        });
                        setStorage(userData);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
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
        <AuthContext.Provider value={{ user, storage, login, logout }}>
            { children }
        </AuthContext.Provider>
    );
}

export default AuthProvider;
