import { ChangeEvent, FormEvent, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthContext } from '../AuthProvider';
import { useModalContext } from '../Modal/Modal';

import SubmitButton from './SubmitButton';
import './Form.scss';

interface FormState  {
    date: string,
    customer: string,
    price: string,
    notes: string
}

interface SubmitData extends FormState {
    uid: string,
    isCompleted: boolean
}

const initialFormState = { date: '', customer: '', price: '', notes: '' }

const Form = () => {
    const { user } = useAuthContext();
    const { close } = useModalContext();
    
    const [values, setValues] = useState<FormState>(initialFormState);
    const [loading, setLoading] = useState<boolean>(false);

    const handleFormStateChange = (name: string) => {
        return (e: ChangeEvent) => {
            const target = e.target as HTMLInputElement
            setValues({ ...values, [name]: target.value });
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const body: SubmitData = {
            ...values,
            uid: user.uid,
            isCompleted: false
        }
        try {
            const docRef = await addDoc(collection(db, "customers"), {
              ...body,    
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (err) {
            console.error("Error adding document: ", err);
        } finally {
            setValues(initialFormState);
            setLoading(false);
            close();
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input
                className="form-input"
                type="date"
                name="date"
                value={values.date}
                onChange={handleFormStateChange('date')}
                required
            />
            <input
                className="form-input"
                type="text"
                name="customer"
                value={values.customer}
                onChange={handleFormStateChange('customer')}
                placeholder='Name'
                required
            />
            <input
                className="form-input"
                type="number"
                name="price"
                value={values.price}
                onChange={handleFormStateChange('price')}
                placeholder='Price'    
            />
            <textarea
                className="form-textarea"
                name="notes" 
                rows={5}
                value={values.notes}
                placeholder='Notes'
                onChange={handleFormStateChange('notes')}
            >
            </textarea>

            <SubmitButton loading={loading} />
        </form>
    );
}

export default Form;