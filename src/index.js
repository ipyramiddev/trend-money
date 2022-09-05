import React from 'react';
import ReactDOM from 'react-dom';
import Web3Provider from "@fewcha/web3-react";
import Wrapper from './Wrapper';
import './index.css';
import reportWebVitals from './reportWebVitals';
ReactDOM.render(
  <React.StrictMode>
    <div className='bg-black '>
    <Web3Provider>
      <Wrapper/>
      </Web3Provider>
    </div>

  </React.StrictMode>,
  document.getElementById('root')
);

