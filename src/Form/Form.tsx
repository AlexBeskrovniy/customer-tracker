import { ChangeEvent, useState } from 'react';
import './Form.scss';

const Form = () => {
    const [values, setValues] = useState({ date: '', customer: '', price: '', notes: '' });
    // const [date, setDate] = useState('');
    // const [customer, setCustomer] = useState('');
    // const [price, setPrice] = useState(0);
    // const [notes, setNotes] = useState('');

    const handleFormStateChange = (name: string) => {
        return (e: ChangeEvent) => {
            const target = e.target as HTMLInputElement
            setValues({ ...values, [name]: target.value });
            console.log(values);
        }
    }

    return (
        <form className="form">
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
                defaultValue={values.notes}
                placeholder='Notes'
                onChange={handleFormStateChange('notes')}
            >
            </textarea>

            <button>Submit</button>
        </form>
    );
}

export default Form;