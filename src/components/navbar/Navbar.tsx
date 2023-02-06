import React from "react";
import Logo from "../Logo";
import { useWallet } from '@manahippo/aptos-wallet-adapter';
import { useWeb3 } from "@fewcha/web3-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  FaGithub,
  FaTwitter,
  FaDiscord,
  FaBookOpen,
  FaTelegramPlane,
} from "react-icons/fa";

const nav_icons = [
  {
    name: "github",
    link: "https://github.com/SeamMoney/",
    icon: <FaGithub className=" hover:text-blac " />,
  },
  {
    name: "docs",
    link: "https://docs.seam.money/",
    icon: <FaBookOpen className=" hover:text-blac " />,
  },
  {
    name: "twitter",
    link: "https://twitter.com/SeamMoney",
    icon: <FaTwitter className=" hover:text-blac " />,
  },
];

function NavbarItem(props: any) {
 
  return (
    <li className="block py-2 pl-1 text-white rounded-lg menu-font">
      <a href={props.item.path} className=" ">
        {props.item.name}
      </a>
      <div className="h-[2px] w-[80%] m-auto bg-gradient-to-r from-point1 to-point2 hidden active-bar"></div>
    </li>
  );
}

function NavbarIcon(link: string, icon: any, key: any) {
  return (
    <p
      key={key + "-link"}
      className="text-white text-3xl p-2 m-3 rounded-xl hover:bg-white hover:text-blac "
    >
      <a href={link}>{icon}</a>
    </p>
  );
}

export default function Navbar(props: any) {
  // const [ useGlobalState, setGlobalState] = useGlobalState();
  const [isOpen, setIsOpen] = useState("hidden");
  const { isConnected, network } = useWeb3();
  const {
    connect,
    disconnect,
    account,
    wallets,
    connecting,
    connected,
    disconnecting,
    wallet: currentWallet,
  } = useWallet();

  const nav_items = (network: any) => [
    // { name: "Looms", path: "/powersets" },
    { name: "EXPLORER", path: `/explorer/modules/${network}/0x1` },
    { name: "GITHUB", path: `https://github.com/SeamMoney/` },
    { name: "TWITTER", path: `https://twitter.com/SeamMoney` },
    { name: "DOCS", path: `https://docs.seam.money/` },
    { name: "BLOG", path: `/#` },
  ];

  // const location = useLocation()
  const toggle = () => {
    setIsOpen(isOpen === "" ? "hidden" : "");
  };

  const onDisconnect = () => {
    disconnect();
  }

  type WalletName<T extends string = string> = T & { __brand__: 'WalletName' };

  useEffect(() => {
    const wallet: WalletName = window.localStorage.getItem("wallet") as WalletName<string>;
    console.log("wallet?", wallet);
    if (wallet) {
      connect(wallet);
    }
  }, []);

  return (
    <nav className="py-2.5 text-white">
      <div className="px-4 lg:pl-32 lg:pr-0 flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <Logo />
        </a>
        <button
          data-collapse-toggle="mobile-menu"
          type="button"
          onClick={() => toggle()}
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
          <svg
            className="hidden w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          className={`${isOpen} w-full md:block md:w-auto items-center`}
          id="mobile-menu"
        >
          <ul className="flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            {nav_items("mainnet").map((item, i) => (
              <NavbarItem item={item} i={i} key={i} />
            ))}

            {/* {nav_icons.map((item, i) => {
              return NavbarIcon(item.link, item.icon, i);
            })} */}
            <div className="pr-3">
              <button
                className="seam-button m-3"
                onClick={() => !connected ? props.showConnectModal(true) : onDisconnect()}
              >
                {!connected ? "Connect" : "Disconnect"}
              </button>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );

  // const ChainInput =() =>{
  //     return <div>

  //     </div>
  // }
}
