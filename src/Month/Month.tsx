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
    const isCurrentMonthAndYear = month === dayjs().get('month') && year === dayjs().get('year');
    const TODAY = dayjs().get('date');
    const dayCells = [];
    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
        dayCells.push(<Cell day={i} key={i} isToday={i === TODAY && isCurrentMonthAndYear}/>);    
    }

    return (
        <>
            <h3>{ selectedMonthTitle }</h3>
            <div className='cells-wrapper'>
                { dayCells }
            </div>
        </>
    );
}