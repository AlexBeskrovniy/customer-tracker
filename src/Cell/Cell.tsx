import { Link } from 'react-router-dom';

import './Cell.scss';

type CellProps = {
    day: number;
    month: number;
    year: number;
    isToday: boolean;
}

export default ({ day, month, year, isToday }: CellProps) => {
    const activeClass = isToday ? 'active' : ''
    const classes = `cell ${activeClass}`;

    return (
        <div className={classes}>
            <Link to={`/${year}/${month}/${day}`} className='cell-link'/>
            {day}
        </div>
    );
}