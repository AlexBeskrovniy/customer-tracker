import * as dayjs from 'dayjs';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss'
import AuthProvider from './AuthProvider';
import AuthRedirect from './Auth/AuthCheck';
import SvgSprite from './Icons/SvgSprite';
import Login from './Auth/Login';
import Header from './Header/Header';
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
      <AuthProvider>
        <SvgSprite />
        <Header />
        <Routes>
          <Route path='/login' element={ <Login /> } />
          <Route path='/' element={
            <AuthRedirect>
                <Month month={month} year={year} changeMonth={changeMonth} />
            </AuthRedirect> 
          } />
          <Route path='/:year/:month/:day' element={
            <AuthRedirect>
              <Day />
            </AuthRedirect>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
