import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'alertifyjs/build/css/alertify.min.css'
import "animate.css/animate.min.css";
import {BrowserRouter} from 'react-router-dom'
import "../src/assets/css/App.css";

import Store from "./Store"


ReactDOM.render(
  <BrowserRouter>
    <Store>
    <App />
    </Store>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
