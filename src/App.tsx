import dayjs from 'dayjs';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.scss'
import AuthProvider from './AuthProvider';
import AuthRedirect from './Auth/AuthRedirect';
import SvgSprite from './Icons/SvgSprite';
import Login from './Auth/Login';
import Header from './Header/Header';
import Month from './Month/Month';
import Day from './Day/Day';
import Modal from "./Modal/Modal";
import Form from "./Form/Form";

const initMonth = dayjs().month();
const initYear = dayjs().year();

const trueMonth = (initMonth + 1).toString().padStart(2, '0');
const initDay = dayjs().get('date').toString().padStart(2, '0');
const initFormDefaultDate = `${initYear}-${trueMonth}-${initDay}`
console.log(initFormDefaultDate);

function App() {
  const [month, setMonth] = useState<number>(initMonth);
  const [year, setYear] = useState<number>(initYear);
  const [formDefaultDate, setFormDefaultDate] = useState<string>(initFormDefaultDate);

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
        <Modal content={<Form defaultDate={formDefaultDate} />} />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
