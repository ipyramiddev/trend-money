// import logo from './logo.svg';
import React from "react";
import PoolPage from "./pages/PoolPage";
import pool_data from "./pool_data";
import BubbleSection from "./sections/BubbleSection";
function App() {
  // HOME PAGE
  return (
    <div className="p-5">
      {/* <BubbleSection pool_data= {pool_data.bubble_data}/> */}
      <PoolPage/>
    </div>
  );
}

export default App;
