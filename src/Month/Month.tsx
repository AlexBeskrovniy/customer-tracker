import dayjs from 'dayjs'

import './Month.scss';
import Cell from '../Cell/Cell';
import Nav from '../Nav/Nav';
import { useAuthContext } from '../AuthProvider';

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

    const { storage } = useAuthContext();

    const dayCells = [];
    for (let i = 1; i <= DAYS_IN_MONTH; i++) {
        const hasData = storage.length > 0 && !!storage.find((record: CustomerDoc) => {
            const [y, m, d] = record.date.split('-');
            return +y === year && +m === month + 1 && +d === i;
        });

        dayCells.push(
            <Cell
                key={i}
                day={i}
                month={month}
                year={year}
                isToday={i === TODAY && isCurrentMonthAndYear}
                hasData={hasData}
            />);    
    }

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