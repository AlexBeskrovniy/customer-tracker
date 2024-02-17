import dayjs from 'dayjs'
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

import './Cell.scss';

type CellProps = {
    day: number;
    month: number;
    year: number;
    isToday: boolean;
    hasData: boolean;
}

interface MyCustomCSS extends CSSProperties {
    '--grid-start-position': number;
}

export default ({ day, month, year, isToday, hasData }: CellProps) => {
    const activeClass = isToday ? 'active' : '';
    const withData = hasData ? 'filled': '';
    const classes = `cell ${activeClass} ${withData}`;

    const dayObj = new Date(year, month, day);
    const LABEL = dayjs(dayObj).format('ddd');

    // || 7 - because of 'Sunday' dayjs index === 0
    const monthFirstDayPosition = day === 1 ? dayjs(dayObj).day() || 7 : null;

    return (
        <div
            className={classes.trim()}
            style={monthFirstDayPosition ? {'--grid-start-position': monthFirstDayPosition} as MyCustomCSS : {}}>
            <Link to={`/${year}/${month}/${day}`} className='cell-link' />
            <span className='cell-day-number'>
                {day}
            </span>
            <span className='cell-label'>
                {LABEL}
            </span>
        </div>
    );
}