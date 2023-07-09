import './Nav.scss';
import Icon from '../Icons/Icon';

type NavProps = {
    changeMonth: (dir: number) => void;
}

export default ({ changeMonth }: NavProps) => {
    return (
        <div className='nav'>
            <span className='nav-icon' onClick={() => changeMonth(-1)}>
                <Icon id={"#angles-left"}/>
            </span>
            <span className='nav-icon' onClick={() => changeMonth(1)}>
                <Icon id={"#angles-right"}/>
            </span>
        </div>
    );
}