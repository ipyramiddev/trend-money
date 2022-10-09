import React from 'react';
import ReactDOM from 'react-dom';
import Web3Provider from "@fewcha/web3-react";
import Wrapper from './Wrapper';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from 'react-router-dom';
import { BaseRouter } from 'BaseRouter';
ReactDOM.render(
  <React.StrictMode>
    <div className='bg-black '>
    <Web3Provider>
      <Wrapper>
    <RouterProvider router={BaseRouter()} />
      </Wrapper>
      </Web3Provider>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

