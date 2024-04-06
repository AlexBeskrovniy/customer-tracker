import { PropsWithChildren } from "react";
import './Footer.scss';

const Footer = ({ children }: PropsWithChildren) => {
    return (
        <div className="footer">
            { children }
        </div>
    );
}

export default Footer;