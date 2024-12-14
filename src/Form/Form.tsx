import { ChangeEvent, FormEvent, useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useAuthContext } from '../AuthProvider';
import { useModalContext } from '../Modal/Modal';

import SubmitButton from './SubmitButton';
import './Form.scss';

interface FormProps {
    defaultDate: string
}
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


const Form = ({ defaultDate }: FormProps) => {
    const { user } = useAuthContext();
    const { close } = useModalContext();

    const initialFormState = { date: `${defaultDate || ''}`, customer: '', price: '', notes: '' }
    
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
            uid: user!.uid,
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
            <div className="form-date-input-wrapper">
                <span className="form-date-input-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </span>
                <input
                    className="form-input"
                    type="date"
                    name="date"
                    value={values.date}
                    onChange={handleFormStateChange('date')}
                    required
                />
            </div>
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