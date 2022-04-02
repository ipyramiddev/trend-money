// import logo from './logo.svg';
import React from "react";
import HeroSection from "../sections/HeroSection";
import HeroSection2 from "../sections/HeroSection2";
// import OutlinedBox from "./components/OutlinedBox";
import StackSection from '../sections/StackSection';
import TeamSection from '../sections/TeamSection';
// import { CryptoCards, Button } from 'web3uikit';
import { home_page_text } from "../home_page_text";
import GifCardSection from '../sections/GifCardSection';
import OutlinedBox from "../components/OutlinedBox";
import HeroSection3 from "../sections/HeroSection3";
import PoolShowcase from "../components/PoolShowcase";

function Home() {
  // HOME PAGE
  return (
    <div className="items-center">
    <HeroSection {...home_page_text.hero_section1} />

      {/* STACK SECTION */}
      <div className="flex flex-row justify-center items-center ">
        <StackSection {...home_page_text.stack_section} />
      </div>
      <div className="flex flex-col justify-center items-center">
        {/* <OutlinedBox>
          
        </OutlinedBox> */}

      </div>
      {/* Hero section 2 */}
      <div className="flex flex-row justify-center items-center ">
        <HeroSection2 {...home_page_text.hero_section2} />
      </div>
      <HeroSection3 {...home_page_text.hero_section3}/>
      <PoolShowcase apps = {home_page_text.apps}/>
        <TeamSection team={home_page_text.team} />
    </div>
  );
}

export default Home;
