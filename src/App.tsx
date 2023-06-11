import * as dayjs from 'dayjs';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss'
import Month from './Month/Month';
import Day from './Day/Day';


const initMonth = dayjs().month();
const initYear = dayjs().year();

function App() {
  const [month, setMonth] = useState<number>(initMonth);
  const [year, setYear] = useState<number>(initYear);

  const changeMonth = (dir: number) => {
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
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Month month={month} year={year} changeMonth={changeMonth} /> }/>
        <Route path='/:year/:month/:day' element={<Day />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
