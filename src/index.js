import React from 'react';
import ReactDOM from 'react-dom/client';
import './normalize.css';
import './index.css';
import MainPage from './mainPage/MainPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainPage/>
  </React.StrictMode>
);

