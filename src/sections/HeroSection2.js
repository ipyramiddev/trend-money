import React from "react";
import img1 from "../assets/images/mockup.png";
import { FaRegMoneyBillAlt } from "react-icons/fa";
export default function HeroSection2(props) {
  const onClick = () => {
    console.log("Launching app...");
  };
  return (
    <>
      <div className="font-Poppins justify-center items-center w-full bg-hero2-img bg-cover bg-fixed p-4 bg-center md:max-w-4xl lg:max-w-max">
        <div className="items-center text-2xl font-extrabold text-white text-center pt-4 md:pb-4 md:text-3xl lg:text-4xl">
          <span>{props.main}</span>
        </div>
        <div className="md:grid md:grid-cols-3 md:gap-4 md:pr-6">
          <div className="md:col-span-2">
            <img
              className="max-w-full h-auto"
              src={img1}
              alt="synth cell phone"
            />
          </div>

          <div className="flex flex-col items-center justify-center px-10 pb-8 -translate-y-3 shadow-2xl md:pr-0 md:pl-0 md:translate-y-0 md:shadow-none">
            <div className="flex flex-col m-2 items-center justify-center overflow-hidden h-1/2 p-2 text-center rounded-xl bg-gradient-to-tl  from-gray to-gray-light md:p-5 md:h-2/3 lg:h-1/2">
              <span className="font-Poppins p-3 text-white font-bold text-xl  md:p-1 lg:text-2xl lg:pb-5">
                {props.secondary}
              </span>
              <span className="font-Poppins p-3 font-black text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#7928ca] to-[#ff0080] md:p-2 md:text-3xl lg:text-4xl lg:font-extrabold lg:pb-5">
                {props.gradient_text}
              </span>
              <button
                className="w-2/3 pr-3 pl-3 pt-2 pb-2 mb-2 text-white rounded-4xl bg-gradient-to-r p-[5px] from-[#7928ca] to-purple text-lg active:translate-y-[2px] md:w-full lg:w-2/3 md:text-2xl hover:opacity-50"
                onClick={onClick}
              >
                {props.button_text}
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-center w-full">
          
          <div className="flex flex-wrap justify-center bg-purple w-1/3 p-2 text-center text-light-gray text-base font-extrabold rounded-xl shadow-2xl translate-x-2 translate-y-2 z-30 md:grid md:grid-cols-3 md:items-center md:w-1/4 md:p-2 md:pl-4 md:text-xl md:font-bold  md:translate-x-3 md:translate-y-3">
            <h1 className="md:col-span-2 lg:text-2xl">{props.boxes[0].text}</h1>
            <div className="md:flex md:flex-row md:justify-center">
              {/* <FaClock className="text-white text-3xl md:text-4xl" /> */}
              {props.boxes[0].icon}
            </div>
          </div>
          <div className="flex flex-wrap justify-center bg-blue  w-1/3 p-2 text-center text-white text-base font-extrabold rounded-xl shadow-2xl  z-20 md:grid md:grid-cols-3 md:items-center md:w-1/4 md:pt-2 md:pl-4 md:pr-0 md:text-xl md:font-bold md:-translate-y-4">
            <h1 className="md:col-span-2 lg:text-2xl">
            {props.boxes[1].text}
            </h1>
            <div className="md:flex md:flex-row md:justify-center">
            {props.boxes[1].icon}
            </div>
          </div>
          <div className="flex flex-wrap justify-center bg-yellow  w-1/3 p-2 text-center text-gray text-sm font-extrabold rounded-xl shadow-2xl -translate-x-2 -translate-y-2 z-0 md:grid md:grid-cols-3 md:items-center md:w-1/4 md:pl-3 md:text-base md:font-bold  md:-translate-x-3 md:-translate-y-11">
            <h1 className="md:col-span-2">
            {props.boxes[2].text}
            </h1>
            <div className="md:flex md:flex-row md:justify-center">
              <FaRegMoneyBillAlt className="text-4xl lg:text-5xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
