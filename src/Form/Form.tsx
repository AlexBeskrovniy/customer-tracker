import './Form.scss';

const Form = () => {
    return (
        <form className="form">
            <input className="form-input" type="date" name="date" required />
            <input className="form-input" type="text" name="customer" required />
            <input className="form-input" type="number" name="price" />
            <textarea name="notes" rows={5}></textarea>
            <button>Submit</button>
        </form>
    );
}

export default Form;