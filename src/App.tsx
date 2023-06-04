import * as dayjs from 'dayjs';
import { useState } from 'react';

import './App.scss'
import Month from './Month/Month';


const initMonth = dayjs().month();
const initYear = dayjs().year();

function App() {
  const [month, setMonth] = useState<number>(initMonth);
  const [year, setYear] = useState<number>(initYear);

  const onMonthChange = (dir: number) => {
    if (month === 0 && dir === -1) {
      setYear(year - 1);
      setMonth(11);
      return;
    }

    if (month === 11 && dir === 1) {
      setYear(year + 1);
      setMonth(0);
      return;
    }
    setMonth(month + dir);
  }

  return (
    <>
      <Month month={month} year={year} />    
      <div className='nav'>
        <span className='nav-icon' onClick={() => onMonthChange(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"/></svg>
        </span>
        <span className='nav-icon' onClick={() => onMonthChange(1)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
        </span>
      </div>
    </>
  )
}

export default App
