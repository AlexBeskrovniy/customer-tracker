import { useAuthContext } from "../AuthProvider";

const Login = () => {
    const { login } = useAuthContext();

    return (
        <button onClick={login}>
            Login with Google
        </button>
    );
}

export default Login;