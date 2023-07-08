import * as dayjs from 'dayjs'
import { Link, useParams } from 'react-router-dom';

import './Day.scss';

export default () => {
    const { year, month, day } = useParams();

    const dayObj = new Date(Number(year), Number(month), Number(day));
    const DATE = dayjs(dayObj).format('MMMM D dddd, YYYY');

    return (
        <>
            <div className='day-header'>
                <Link to='/' className='day-back-button'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" height="1em" viewBox="0 0 320 512">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
                    </svg>
                    Back
                </Link>
                <h4>{DATE}</h4>
            </div>
        </>
    );
}
