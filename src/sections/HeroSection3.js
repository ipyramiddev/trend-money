import React from 'react';
import SquareOutline from '../components/SquareOutline';
import StackedButton from '../components/StackedButton';

const icon_class = ' m-4 p-3 inline'
export default function HeroSection3(props) {
    return (
        <div className="bg-black p-4 m-2">
            <div className="text-center text-6xl p-4 m-5 py-8 max-w-5xl text-white ">
                {props.main}
            </div>
            <div className='flex md:flex-row sm:flex-col justify-center items-center p-2'>
                {props.boxes.map((box, index) => {
                    return (
                        <div className="flex flex-col text-white justify-center outline outline-4 outline-pink rounded-lg items-center p-2 m-5 transform transition duration-500 hover:scale-110 hover:bg-opacity-10 hover:bg-white">
                            <div className=' w-full outline outline-4 outline-blue rounded-lg'>
                                {/* <SquareOutline> */}
                                <div className="flex flex-row justify-center pt-3">
                                    {box.icon}
                                </div>
                                <div className="text-center text-4xl p-5">
                                    {box.main}
                                </div>
                                <div className="text-center content-center pb-3">
                                    <p>{box.secondary}</p>
                                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>
                                        {box.button_text}
                                    </button>
                                </div>
                                {/* </SquareOutline> */}
                            </div>
                            <div>

                            </div>


                        </div>)
                })}
            </div>
            <div>

            </div>
            <div className="bg-gradient-to-br from-blue to-pink  rounded-2xl p-3">
            <div className='bg-opacity-90'>
                <p className='text-3xl p-4 text-white  text-center'>What we provide</p>
                <p className='text-white text-lg'>
                    Yeild optimized auto-pool switching stratiegies
                </p>
                <p>Select the yeild pools you would like to provide liquidity </p>
            </div>
            </div>
            {/* <StackedButton text={props.button_text} onClick=''/> */}
        </div>
    );
}