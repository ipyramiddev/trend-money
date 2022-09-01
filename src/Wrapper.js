import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Explorer from './pages/Explorer';
import Navbar from './components/Navbar';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Web3Provider from "@fewcha/web3-react";


import { useState } from 'react';
import { GlobalStateProvider } from 'GlobalState';
import {MyWalletProvider } from './context/wallet/provider';
import WalletModal from 'modals/walletModal';
import Staking from './pages/Staking';


export default function Wrapper() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [walletModalOpen, setWalletModal] = useState(false);
  const [connected, setConnected] = useState(false);

  
  return (
    // <ApolloProvider client={client}>
      <Web3Provider>
      <GlobalStateProvider>
        <MyWalletProvider>
      <div >
        <Navbar showConnectModal={setWalletModal}/>
        <BrowserRouter>
          <Routes>
            {/* HOME PAGE */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/staking" element={<Staking />} />
            {/* ADD ADDITONAL ROUTES here ex swap page */}
            <Route path="/app" element={<App />} />
            <Route path="/explorer" element={<Explorer/>}  />
          </Routes>
        </BrowserRouter>
        {walletModalOpen ? <WalletModal isOpen={walletModalOpen} setIsOpen={setWalletModal}/>: null}
    </div>
      </MyWalletProvider>
      </GlobalStateProvider>
      </Web3Provider>
    // </ApolloProvider>

  );
}
