import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
// import TokenPrices from './components/TokenPrices';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Drawer from './components/Drawer';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { useState } from 'react';
const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/'

const UBE_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap"
const MOBI_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/mobius-amm/mobius-amm"

const client = new ApolloClient({
  uri: UBE_SUBGRAPH,
  cache: new InMemoryCache(),
})


function PriceDrawer(props) {  
  
  return (
    <div className='absolute top-60 right-5'>
        <div className='flex justify-center items-center text-center px-6 py-3'>
          <div onClick={() => props.setDrawerOpen(!props.drawerOpen)}  className='text-2xl font-bold bg-gradient-to-br from-green to-yellow bg-opacity-50 rounded-t-lg'>
            Token prices ^
          </div>
        </div>
      
    <Drawer isOpen={props.drawerOpen} setIsOpen={props.setDrawerOpen}>
      <div>
        {/* <TokenPrices/> */}
      </div>
    </Drawer>
    </div>
  )
}


export default function Wrapper() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
        <ApolloProvider client={client}>
    <div className='bg-black relative' >
      <Navbar />

      <BrowserRouter>
          <Routes>
            {/* HOME PAGE */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="docs" element={<Docs />} />
            {/* ADD ADDITONAL ROUTES here ex swap page */}
            <Route path="/app" element={<App />} />

          </Routes>
          <PriceDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen}/>
      </BrowserRouter>
    </div>
        </ApolloProvider>




  );
}
