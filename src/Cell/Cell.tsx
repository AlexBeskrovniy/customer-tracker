import dayjs from 'dayjs'
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

    const dayObj = new Date(year, month, day);
    const LABEL = dayjs(dayObj).format('ddd');

    return (
        <div className={classes}>
            <Link to={`/${year}/${month}/${day}`} className='cell-link'/>
            <span className='cell-day-number'>
                {day}
            </span>
            <span className='cell-label'>
                {LABEL}
            </span>
        </div>
    );
}