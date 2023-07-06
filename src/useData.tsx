import { useState, useEffect } from 'react';
import { updateDoc, collection, addDoc, onSnapshot, doc, query, where, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useAuthContext } from './AuthProvider';

interface CustomerDoc {
    id: string,
    date?: string,
    customer?: string,
    price?: string,
    notes?: string,
    uid?: string
}

type CustomerDocs = CustomerDoc[] | []

const customerColRef = collection(db, "customers");

export const useGetData = async () => {
    const [data, setData] = useState<CustomerDocs>([]);
    const { user } = useAuthContext();

    if (user) {
        const dataQuery = query(customerColRef, where("uid", "==", user.uid));

        const querySnapshot = await getDocs(dataQuery);
        console.log(querySnapshot);
        // const result = querySnapshot.forEach(doc => {
        //     return {
        //         id: doc.id,
        //         ...doc.data()
        //     }
        // })
        // setData(result);
    }

    // useEffect(() => {
    //         const dataQuery = query(customerColRef, where("uid", "==", uid));
    //         onSnapshot(dataQuery, snapshot => {
    //             const result = snapshot.docs.map(doc => {
    //                 return {
    //                     id: doc.id,
    //                     ...doc.data()
    //                 }
    //             });
    
    //             setData(result);
    //         });
    // }, [db]);

    return [data];
};