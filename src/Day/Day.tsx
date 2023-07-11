import * as dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

import CustomerCard from '../CustomerCard/CustomerCard';
import Icon from '../Icons/Icon';
import './Day.scss';

export default () => {
    const { year, month, day } = useParams();
    const { storage } = useAuthContext();

    const dayRecords = storage.length > 0 && storage.filter((record: CustomerDoc) => {
        const [y, m, d] = record.date.split('-');
        return Number(y) === Number(year) && Number(m) === Number(month) + 1 && Number(d) === Number(day);
    });

    console.log(dayRecords);

    const dayObj = new Date(Number(year), Number(month), Number(day));
    const DATE = dayjs(dayObj).format('MMMM D dddd, YYYY');

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
                {dayRecords.length ? (
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
