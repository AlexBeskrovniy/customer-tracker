import dayjs from 'dayjs'

import './WeekBar.scss';

const days = [1, 2, 3, 4, 5, 6, 0].map(dayIndex => {
    const day = dayjs().day(dayIndex).format('ddd');
    return day;
});

export default () => {
    return (
        <div className='week-bar'>
            { days.map(day => (
                <div className='week-day'>
                    { day }
                </div>
            )) }
        </div>
    );
}