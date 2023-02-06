import React from "react";
import Logo from "../Logo";
import { useState } from "react";

function NavbarItem(props: any) {
  return (
    <li className="block py-2 pr-4 pl-3 text-white hover:bg-white hover:text-blac rounded-lg">
      <a href={props.item.path} className=" ">
        {props.item.name}
      </a>
    </li>
  );
}

export default function Footer() {
  const footer_items = (network: any) => [
    { name: "Looms", path: "/powersets" },
    { name: "Explorer", path: `/explorer/modules/${network}/0x1` }
  ];
  
  return (
    <div className="mt-[64px] max-w-[1920px] flex justify-center items-center flex-col">
      <div className="flex items-center mb-[32px]">
        <a href="/">
          <Logo />
        </a>
      </div>

      <ul className="flex flex-col items-center md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        {footer_items("mainnet").map((item, i) => (
            <NavbarItem item={item} i={i} key={i} />
        ))}
      </ul>

      <nav className="text-white flex justify-center items-center flex-row gap-10 mt-[32px] mb-[64px]">
        <a
          href="https://discord.com/invite/4kxxyjvUes"
          target="_blank"
          className="flex items-center"
        >
          <img
            src={window.location.origin + "/footer/discord.svg"}
            className="h-[32px]"
          />
        </a>
        <a href="/" className="flex items-center">
          <img
            src={window.location.origin + "/footer/telegram.svg"}
            className="h-[32px]"
          />
        </a>
        <a
          href="https://twitter.com/seammoney"
          target="_blank"
          className="flex items-center"
        >
          <img
            src={window.location.origin + "/footer/twitter.svg"}
            className="h-[32px]"
          />
        </a>
        <a href="/" className="flex items-center">
          <img
            src={window.location.origin + "/footer/medium.svg"}
            className="h-[32px]"
          />
        </a>
      </nav>
    </div>
  );
}
