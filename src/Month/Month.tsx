import * as dayjs from 'dayjs'

import './Month.scss';
import Cell from '../Cell/Cell';
import Nav from '../Nav/Nav';

// import { useAuthContext } from '../AuthProvider';

type MonthProps = {
    year: number;
    month: number;
    changeMonth: (dir: number) => void;
}

export default ({ month, year, changeMonth }: MonthProps) => {
    const DAYS_IN_MONTH = dayjs().month(month).daysInMonth();
    const selectedMonthTitle = dayjs().month(month).year(year).format('MMMM YYYY');
    const isCurrentMonthAndYear = month === dayjs().get('month') && year === dayjs().get('year');
    const TODAY = dayjs().get('date');
    const dayCells = [];
    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
        dayCells.push(<Cell key={i} day={i} month={month} year={year} isToday={i === TODAY && isCurrentMonthAndYear}/>);    
    }

    // const { user }: any = useAuthContext();

    return (
        <>
            <h3>{ selectedMonthTitle }</h3>
            <div className='cells-wrapper'>
                { dayCells }
            </div>
            <Nav changeMonth={changeMonth} />
        </>
    );
}