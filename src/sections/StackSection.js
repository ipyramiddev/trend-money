import React from "react";
import FilledBox from "../components/FilledBox";
import StackedWrapper from "../components/StackedWrapper";

export default function StackSection(props) {
    return (
        <div className="items-center p-4 m-5 text-white">
            <p className=" text-center text-4xl p-5">
                Yield pool management simplified
            </p>
            <StackedWrapper>
                <div className="">
                    <div className="flex flex-cols">
                        <div>
                            <p className="p-4 text-4xl text-bold">{props.main}</p>
                            <p className="p-4 text-lg opacity-60 max-w-lg">{props.secondary}</p>

                        </div>
                        <div className="text-center py-2">
                            <p className="text-xl opacity-80 mb-3">Happily building on celo</p>
                            <img src="./home/celo-logo.png" alt="logos" />
                        </div>
                    </div>
                    <div className="text-center content-center pb-3">
                        <p>{props.apy_text[0]}</p>
                        <p className="text-blue text-2xl">{props.apy_text[1]}</p>
                        <p>{props.apy_text[2]}</p>
                    </div>
                </div>

                <div className=" object align-center">

                </div>
            </StackedWrapper >
            <div>
                <FilledBox {...props.FilledBox} />
            </div>
        </div >

    );
}