import { useAuthContext } from "../AuthProvider";

import './Header.scss';

const Header = () => {
    const { user, logout } = useAuthContext();
    if (user) {
        return (
            <header className="header">
                <div className="header-user-avatar">
                    <img className="header-user-avatar-image" src={user.photoURL} alt="Avatar" />
                </div>
                <div className="header-logout">
                    <button onClick={logout}>
                        Logout
                    </button>
                </div>
            </header>
        )
    }
    return <h4>Customer tracker app</h4>
}

export default Header;