import { useParams } from 'react-router-dom';

import './Day.scss';

export default () => {
    const { year, month, day } = useParams();

    return (
        <h1>Hi! {year}, {month}, {day}</h1>
    );
}
