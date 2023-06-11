import * as dayjs from 'dayjs'
import { useParams } from 'react-router-dom';

import './Day.scss';

export default () => {
    const { year, month, day } = useParams();

    const dayObj = new Date(Number(year), Number(month), Number(day));
    const DATE = dayjs(dayObj).format('MMMM D dddd, YYYY');

    return (
        <h4>{DATE}</h4>
    );
}
