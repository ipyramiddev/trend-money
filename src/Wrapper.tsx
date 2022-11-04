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
import {
  WalletProvider,
  // HyperPayWalletAdapter,
  // AptosWalletAdapter,
  // HippoExtensionWalletAdapter,
  MartianWalletAdapter,
  FewchaWalletAdapter,
  PontemWalletAdapter,
  RiseWalletAdapter,
  SpikaWalletAdapter,
  FletchWalletAdapter,
  // AptosSnapAdapter,
  // NightlyWalletAdapter,
  // BitkeepWalletAdapter,
  // TokenPocketWalletAdapter,
  // BloctoWalletAdapter,
  // WalletAdapterNetwork,
  // ONTOWalletAdapter,
  // FoxWalletAdapter
} from '@manahippo/aptos-wallet-adapter';
import { ReactNode, useState, useMemo } from 'react';
import { GlobalStateProvider } from 'GlobalState';
// import { MyWalletProvider } from './context/wallet/provider';
import WalletModal from 'modals/walletModal';
import Staking from './pages/Staking';
import { useClient } from 'hooks/useAptos';

type WrapperProps = {
  children: NonNullable<ReactNode>;
};

const Wrapper: React.FC<WrapperProps> = ({
  children,
}) => {
  const [walletModalOpen, setWalletModal] = useState(false);
  const client = useClient();

  const wallets = useMemo(
    () => [
      // new HyperPayWalletAdapter(),
      // new HippoExtensionWalletAdapter(),
      new MartianWalletAdapter(),
      // new AptosWalletAdapter(),
      new FewchaWalletAdapter(),
      new PontemWalletAdapter(),
      new RiseWalletAdapter(),
      new SpikaWalletAdapter(),
      new FletchWalletAdapter(),
      // new AptosSnapAdapter(),
      // new NightlyWalletAdapter(),
      // new BitkeepWalletAdapter(),
      // new TokenPocketWalletAdapter(),
      // new BloctoWalletAdapter({ network: WalletAdapterNetwork.Testnet }),
      // new ONTOWalletAdapter(),
      // new FoxWalletAdapter()
    ],
    []
  );

  return (
    // <ApolloProvider client={client}>
      <GlobalStateProvider>
         <WalletProvider
      wallets={wallets}
      autoConnect={false}

      onError={(error) => {
        console.log('wallet errors: ', error);
        // message.error(error.message);
      }}>
          <Navbar showConnectModal={setWalletModal} />
        {/* <MyWalletProvider> */}
        {/* <div > */}
          {/* <Nav/> */}
          {children}
          {walletModalOpen ? <WalletModal isOpen={walletModalOpen} setIsOpen={setWalletModal} /> : null}
          </WalletProvider>
      </GlobalStateProvider>
    
    // </ApolloProvider>

  );
}

export default Wrapper;