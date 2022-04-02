import './index.css';
import App from './App';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import {useState} from 'react';

export default function Wrapper(){
    return(

        <div className='' > 
        <Navbar />
        
        <BrowserRouter>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          {/* ADD ADDITONAL ROUTES here ex swap page */}
          <Route path="/app" element={<App />} />
          
          

        </Routes>
      </BrowserRouter>
      </div>




    );
}
