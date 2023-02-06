import React, { useEffect, useState } from "react";
import Slider from "components/slider/Slider";
import ParentSize from "@visx/responsive/lib/components/ParentSize";
import LockedValueChart from "components/LockedValueChart";
import "../styles/DashboardStyle.css";
import {SliderCard} from "components/sliderCard/SliderCard";
import pool_data from "pool_data";

export function Dashboard() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        function handleDetectColumns() {
            const width = window.innerWidth;
            setIsMobile(width <= 600);
            console.log("width", width <= 600);
        }

        window.addEventListener('resize', handleDetectColumns);

        handleDetectColumns();

        return () =>
            window.removeEventListener(
                'resize',
                handleDetectColumns,
            );
    });

    return (
        <>
            <div className="desktop-mode hidden mobile:block">
                <div className="hidden lg:block">
                    <div
                        className="grid grid-cols-5 lg:pl-32 max-md:px-0"
                    >
                        <div className="col-span-2 pt-[170px] border-blur">
                            <div className="pb-4 title-font">
                                <p className="text-6xl text-center">TOTAL VALUE LOCKED:</p>
                                <p className="text-6xl text-center">$2,690,012</p>
                            </div>
                            <div className="p-4">
                                <ParentSize>
                                    {({ width, height }) => (
                                        <LockedValueChart width={width} height={(width * 1) / 3} />
                                    )}
                                </ParentSize>
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="blur-box">
                                <Slider />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 lg:hidden">
                    <div className="">
                        <div className="blur-box">
                            <Slider />
                        </div>
                    </div>
                    <div className="pt-[50px] border-blur">
                        <div className="pb-4 title-font">
                            <p className="text-6xl text-center">TOTAL VALUE LOCKED:</p>
                            <p className="text-6xl text-center">$2,690,012</p>
                        </div>
                        <div className="">
                            <ParentSize>
                                {({ width, height }) => (
                                    <LockedValueChart width={width} height={(width * 1) / 3} />
                                )}
                            </ParentSize>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mobile-mode block mobile:hidden">
                <div className="px-4">
                    {pool_data.seamPools[0].pools.map((pool: any, index: number) => {
                        return (
                            <SliderCard pool={pool} key={`slider-card-${index}`}>
                            </SliderCard>
                        );
                    })}
                    <div>
                        <div className="pb-4 title-font">
                            <p className="text-6xl text-center pt-4">TOTAL VALUE LOCKED:</p>
                            <p className="text-6xl text-center">$2,690,012</p>
                        </div>
                        <div className="p-4">
                            <ParentSize>
                                {({ width, height }) => (
                                    <LockedValueChart width={width} height={(width * 1) / 3} />
                                )}
                            </ParentSize>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
