import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

import { dateInputValueFormater } from '../helpers';

import CustomerCard from '../CustomerCard/CustomerCard';
import Icon from '../Icons/Icon';
import './Day.scss';

interface DayProps {
    initFormDefaultDate: string
    setFormDefaultDate: React.Dispatch<React.SetStateAction<string>>
}

export default ({ initFormDefaultDate, setFormDefaultDate }: DayProps) => {
    const { year, month, day } = useParams();
    const { storage } = useAuthContext();

    const dayRecords = storage.length > 0 && storage.filter((record: CustomerDoc) => {
        const [y, m, d] = record.date.split('-');
        return Number(y) === Number(year) && Number(m) === Number(month) + 1 && Number(d) === Number(day);
    });

    const dayObj = new Date(Number(year), Number(month), Number(day));
    const DATE = dayjs(dayObj).format('MMMM D dddd, YYYY');

    useEffect(() => {
        // const trueMonth = (Number(month!) + 1).toString().padStart(2, '0');
        // const trueDay = day!.padStart(2, '0');
        const updatedFormDefaultDate = dateInputValueFormater(Number(year), Number(month), Number(day))
        setFormDefaultDate(updatedFormDefaultDate);

        return () => {
            setFormDefaultDate(initFormDefaultDate);
        }
    }, [year, month, day]);

    return (
        <>
            <div className='day-header'>
                <Link to='/' className='day-back-button'>
                    <Icon id={"#angle-left"}/>
                    Back
                </Link>
                <h4>{DATE}</h4>
            </div>
            <div className='day-records'>
                {dayRecords !== false && dayRecords.length ? (
                    dayRecords.map((record: CustomerDoc) => (
                        <CustomerCard key={record.id} record={record} />
                    ))
                ) : (
                    <h1>No data</h1>
                )}
            </div>
        </>
    );
}
