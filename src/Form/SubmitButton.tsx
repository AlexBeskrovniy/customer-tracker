import Spinner from "../Spinner/Spinner";

interface SubmitButtonProps {
    loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
    return (
        <button type="submit" disabled={loading}>
            {loading ? (
                <Spinner />
            ) : (
                <span>Submit</span>
            )}
        </button>
    );
}

export default SubmitButton;