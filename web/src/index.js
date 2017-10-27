import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

import './index.css';
import App from './App';
import Auth from './Auth.js';

const auth = new Auth();

ReactDOM.render((
  <BrowserRouter>
    <App auth={auth} />
  </BrowserRouter>
), document.getElementById('root'));
