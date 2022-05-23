import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/'

const UBE_SUBGRAPH = "https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap"


const client = new ApolloClient({
  uri: UBE_SUBGRAPH,
  cache: new InMemoryCache(),
})

// const getTokens = async (client) => {


export default function Wrapper(){
  // const loadTokens = async (client) => {
  //   await client
  //     .query({
  //       query: gql(tokensQuery),
  //     })
      
  //     .catch((err) => {
  //       console.log('Error fetching data: ', err)
  //     })
  //     console.log('Subgraph data: ', data)
      // return
    // }
  return(
    
        <div className='bg-black' > 
        <Navbar />
        
        <BrowserRouter>
        <ApolloProvider client={client}>
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="docs" element={<Docs/>} />
          {/* ADD ADDITONAL ROUTES here ex swap page */}
          <Route path="/app" element={<App />} />

        </Routes>
        </ApolloProvider>
      </BrowserRouter>
      </div>




    );
}
