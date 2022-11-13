import React from "react";
import Logo from "../Logo";
import { useState } from "react";

export default function Footer() {
  return (
    <div className="mt-[160px] max-w-[1920px] flex justify-center items-center flex-col">
        <div className="flex items-center mb-[32px]">
            <a href="/">
                <Logo />
            </a>
        </div>

        <nav className="text-white flex justify-center items-center flex-row gap-20 text-[20px] font-normal">
            <a href="/" className="flex items-center">Vaults</a>
            <a href="/" className="flex items-center">Lending</a>
            <a href="/" className="flex items-center">Leverage Farming</a>
            <a href="/" className="flex items-center">Documentation</a>
        </nav>

        <nav className="text-white flex justify-center items-center flex-row gap-10 mt-[32px] mb-[64px]">
            <a href="/" className="flex items-center">
                <img src={window.location.origin + "/footer/discord.svg"} className="h-[32px]"/>
            </a>
            <a href="/" className="flex items-center">
                <img src={window.location.origin + "/footer/telegram.svg"} className="h-[32px]"/>
            </a>
            <a href="/" className="flex items-center">
                <img src={window.location.origin + "/footer/twitter.svg"} className="h-[32px]"/>
            </a>
            <a href="/" className="flex items-center">
                <img src={window.location.origin + "/footer/medium.svg"} className="h-[32px]"/>
            </a>
        </nav>
    </div>
  );
}
