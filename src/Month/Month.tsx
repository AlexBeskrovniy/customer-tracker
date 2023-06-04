import * as dayjs from 'dayjs'

import './Month.scss';
import Cell from '../Cell/Cell';

type MonthProps = {
    month: number;
    year: number;
}

export default ({ month, year }: MonthProps) => {
    const DAYS_IN_MONTH = dayjs().month(month).daysInMonth();
    const selectedMonthTitle = dayjs().month(month).year(year).format('MMMM YYYY');

    const dayCells = [];
    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
        dayCells.push(<Cell day={i} key={i} />);    
    }

    return (
        <>
            <h1>{ selectedMonthTitle }</h1>
            <div className='cells-wrapper'>
                { dayCells }
            </div>
        </>
    );
}