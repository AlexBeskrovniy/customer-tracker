import dayjs from 'dayjs';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { dateInputValueFormater } from './helpers';

import './App.scss'
import AuthProvider from './AuthProvider';
import AuthRedirect from './Auth/AuthRedirect';
import SvgSprite from './Icons/SvgSprite';
import Login from './Auth/Login';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import Month from './Month/Month';
import Day from './Day/Day';
import Modal from "./Modal/Modal";
import Form from "./Form/Form";

const initMonth = dayjs().month();
const initYear = dayjs().year();
const initDay = dayjs().get('date');

const initFormDefaultDate = dateInputValueFormater(initYear, initMonth, initDay);

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
        <div className='main'>
          <Routes>
            <Route path='/login' element={ <Login /> } />
            <Route path='/' element={
              <AuthRedirect>
                  <Month month={month} year={year} changeMonth={changeMonth} />
              </AuthRedirect> 
            } />
            <Route path='/:year/:month/:day' element={
              <AuthRedirect>
                <Day
                  initFormDefaultDate={initFormDefaultDate}
                  setFormDefaultDate={setFormDefaultDate}
                />
              </AuthRedirect>
            } />
          </Routes>
        </div>
        <Footer>
          <Modal content={<Form defaultDate={formDefaultDate} />} />
        </Footer>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
