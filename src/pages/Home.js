import React from "react";
import { home_page_text } from "../home_page_text";
import { BiRightArrowAlt } from "react-icons/bi";
import PoolShowcase from "../components/PoolShowcase";
import TokenStack from "../components/TokenStack";
import { progress } from 'daisyui';
function Home() {
    // HOME PAGE

    return (
        <div className=" flex flex-col m-4 bg-blac text-white items-center">
            <p className="text-4xl text-center m-5"> Simple ETF-Style Yield</p>
            <p className="text-2xl text-center m-2">fragmented deposits across top celo defi protocols, Risk Adverse Yield Aggregate,</p>
            <div className="m-4 p-4 rounded-lg">
                <p className="text-2xl text-center p-3"> {home_page_text.YTF.name}</p>
                <table className="table self-center justify-center text-blac">
                    <thead className="">
                        <tr>
                            <th className="w-14">Name</th>
                            <th>Apr</th>
                            <th>Assets</th>
                            <th>portion</th>
                            <th>Platform</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        
                        {home_page_text.YTF.yps.map((yp, index) => {
                            return (<tr className="">
                                <td>
                                <div className="font-bold">{yp.name}</div>
                                </td>
                                <td>
                                    <div className="text-xl text-bold">{String(yp.apr*100).slice(0,4)}%</div>
                                </td>
                                <td>
                                    <div className=""><TokenStack tokens={yp.assets} /></div>
                                </td>
                                <td className="">
                                        <div className={`radial-progress progress-white text-blac bg-white `} style={{ "--value": (yp.YTF_portion * 100) }} >
                                            <div>{String(yp.YTF_portion).slice(2)}%</div>
                                    </div>
                                </td>

                                <td>
                                    {yp.platform}
                                </td>
                               
                            </tr>)
                        })};
                        {/* </tr> */}
                    </tbody>
           
                </table>
            </div>
            <div className=" ">
                <p className=" text-white w-10 rounded-lg ">
                    <BiRightArrowAlt className="text-5xl text-center rounded-lg hover:text-blac hover:bg-white" />
                </p>
            </div>
            {/* <TeamSection team={home_page_text.team} /> */}
            <p className="opacity-40">© Blockchain @ poly</p>
        </div>
    );
}

export default Home;
