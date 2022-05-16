import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';

export default function Wrapper(){
  
  return(
    
        <div className='bg-black' > 
        <Navbar />
        
        <BrowserRouter>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="docs" element={<Docs/>} />
          {/* ADD ADDITONAL ROUTES here ex swap page */}
          <Route path="/app" element={<App />} />

        </Routes>
      </BrowserRouter>
      </div>




    );
}
