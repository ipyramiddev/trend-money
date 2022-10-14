import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import { Trade } from 'pages/Trade';
import Navbar from './components/navbar/Navbar';
import {BaseRouter } from 'BaseRouter';
// import Nav from './components/navbar/Nav';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ModuleExplorer from 'sections/modules/ModuleExplorer';
import UserExplorer from 'sections/UserExplorer';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import NodePage from 'pages/NodePage';

import { useState } from 'react';
import { GlobalStateProvider } from 'GlobalState';
// import { MyWalletProvider } from './context/wallet/provider';
import WalletModal from 'modals/walletModal';
import Staking from './pages/Staking';
import { useClient } from 'hooks/useAptos';


export default function Wrapper({children}) {
  const [walletModalOpen, setWalletModal] = useState(false);
  const client = useClient();
  return (
    // <ApolloProvider client={client}>
      <GlobalStateProvider>
          <Navbar showConnectModal={setWalletModal} />
        {/* <MyWalletProvider> */}
        {/* <div > */}
          {/* <Nav/> */}
          {children}
          {walletModalOpen ? <WalletModal isOpen={walletModalOpen} setIsOpen={setWalletModal} /> : null}
      </GlobalStateProvider>
    
    // </ApolloProvider>

  );
}
