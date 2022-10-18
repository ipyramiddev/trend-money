import React, { useState, useEffect } from 'react';
import { AptosClient, AptosAccount, FaucetClient, BCS, TxnBuilderTypes, HexString, Types } from "aptos";
import ModuleExplorer from '../sections/modules/ModuleExplorer';
import UserExplorer from '../sections/UserExplorer';
// import { AccountContextProvider } from 'context/AccountContext';
import Pools from '../sections/pools/Pools';
import DappsView from 'sections/dapps/DappsView';
import { useWeb3 } from '@fewcha/web3-react';
import { formatParam } from 'hooks/formatting';
import { ExplorerTabView } from 'views/ExplorerTabView';
import Coins from './Coins';
import IDE from './IDE';
import { Outlet } from 'react-router';
import { Link, useLocation } from 'react-router-dom';

const Explorer = () => {
    const { account, balance, isConnected, network, currentWallet } = useWeb3();
    let {pathname} = useLocation()
    useEffect(() => {
    }, [account, isConnected]);
    const [modules, setModules] = React.useState<Types.MoveModuleBytecode[]>([]);
    const tabs = [
        { name: 'Modules + Dapps', id: 'modules/0x1' },
        { name: 'User Account ', id: 'user' },
        { name: 'Dapps', id: 'dapps/home' },
        { name: 'IDE', id: 'IDE' },
        // { name: 'Coins', id: 'Coins' }
    ]
    const view = pathname;
    return (
        <div className="flex flex-col min-h-screen p-3 m-2 items-center justify-start">
        <p className="text-5xl text-center">Explorer</p> 
            <div className="flex flex-row items-start justify-start">
                <div className="flex flex-row items-start">
                    {tabs.map((tab: any, index) => {
                        return (
                            <Link to={`${tab.id}`}>
                            <div
                                className={`px-2 m-2 py-1 hover:opacity-100 rounded-xl ${view.includes(tab.id) ? 'underline text-3xl font-bold' : 'opacity-60 text-2xl'}`}>
                                <p className=" px-2 m-1 py-1 text-center justify-center">{tab.name}</p>
                            </div>
                            </Link>)
                    })
                    }
                </div>
            </div>
            <div className="flex flex-col h-full w-full items-center justify-start">
                {/* <p className="account-outline">{formatParam(account?.address || '')}</p> */}
                <Outlet/>
                {isConnected ? <p className="px-2 py-1 rounded-sm text-green1 outline-2 outline-green1 m-2">connected</p> : <p>not connected</p>}
            </div>
        </div>
    );

}

export default Explorer;

