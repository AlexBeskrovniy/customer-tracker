import './Cell.scss';

type CellProps = {
    day: number
}

export default ({ day }: CellProps) => {
    return (
        <div className='cell'>
            Cell = {day}
        </div>
    );
}