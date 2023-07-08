import { Link } from 'react-router-dom';

import './Cell.scss';

type CellProps = {
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    hasData: boolean;
}

export default ({ day, month, year, isToday, hasData }: CellProps) => {
    const activeClass = isToday ? 'active' : '';
    const withData = hasData ? 'filled': '';
    const classes = `cell ${activeClass} ${withData}`;

    return (
        <div className={classes}>
            <Link to={`/${year}/${month}/${day}`} className='cell-link'/>
            {day}
        </div>
    );
}