import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { Button, TextField } from '@mui/material';
import 'dayjs/locale/ru';

function App() {

  var utc = require('dayjs/plugin/utc');
  dayjs.extend(utc);

  const [dateValue, setDateValue] = useState<Dayjs | null>(null);

  useEffect(() => {
    telegram.ready();
  });

  //@ts-ignore
  const telegram = window.Telegram.WebApp;

  const getResult = () => {
    let result = dateValue?.format('L LT').toString();
    if (result) {
      result = result.substring(0, 22);
      return result;
    }
  }

  let result = getResult();


  const handleDateChange = (newValue: Dayjs | null) => {
    setDateValue(newValue);
    console.log(newValue);
  };

  const onCheckout = () => {
    // telegram.MainButton.text = "Send";
    // telegram.MainButton.show();
    console.log(getResult());
    telegram.sendData(getResult());
  }

  //@ts-ignore
  // Telegram.WebApp.onEvent("mainButtonClicked", function () {
  //   telegram.sendData(getResult());
  // })

  function generatePosition() {
    let result = [];
    for (let i = 0; i < 20; i++) {
      let el = [];
      let x = Math.random() * 290;
      let y = Math.random() * 800;
      el.push(x, y);
      result.push(el);
    }
    return result;
  }

  function generateNumber() {
    return Math.round(Math.random() * 15);
  }

  let positions = generatePosition();

  let ranNum = generateNumber();

  return (
    <div className="App">

      <div className='container'>
        {positions.map((el, i) => <div key={i} className='icon-container' style={{
          top: `${el[1]}px`,
          left: `${el[0]}px`
        }}>
          <i className={`fa-regular fa-clock  icon${i}`}></i>
        </div>).slice(0, ranNum)}

        {/* <h1 className='title'>Выберите время</h1> */}
        <div className='glass'>
          <MobileTimePicker
            className='input'
            label="Time"
            value={dateValue}
            onChange={handleDateChange}
            renderInput={(params) => <TextField focused={false} {...params} />}
            ampm={false}
          />
          <button className="button" onClick={onCheckout}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
