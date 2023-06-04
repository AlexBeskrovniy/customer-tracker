import './Cell.scss';

type CellProps = {
    day: number;
    isToday: boolean;
}

export default ({ day, isToday }: CellProps) => {
    const activeClass = isToday ? 'active' : ''
    const classes = `cell ${activeClass}`;

    return (
        <div className={classes}>
            {day}
        </div>
    );
}