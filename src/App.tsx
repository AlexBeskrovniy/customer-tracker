import './App.scss'
import Cell from './Cell/Cell';

import * as dayjs from 'dayjs'

const DAYS_IN_MONTH = dayjs().daysInMonth();

function App() {
  const dayCells = [];
  for (let i = 1; i <= DAYS_IN_MONTH; i++) {
    dayCells.push(<Cell day={i} key={i} />);    
  }
  return (
      <div className='cells-wrapper'>
        { dayCells }
      </div>
  )
}

export default App
