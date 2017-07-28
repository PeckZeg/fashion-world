import React from 'react';
import {render} from 'react-dom';

import Routers from './Routers';
import './main.css';

import test from './reducers';
render(
    <Routers />,
  document.getElementById('root')
);
