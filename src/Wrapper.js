import './index.css';
import App from './App';
import Docs from './pages/Docs';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api.studio.thegraph.com/query//<SUBGRAPH_NAME>/'

const UBE_SUBGRAPH = ""
const tokensQuery = `
  query {
      tokens(first: 10) {
        id
        symbol
        name
        decimals
      }
  }
`

const client = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache(),
})

// client
//   .query({
//     query: gql(tokensQuery),
//   })
//   .then((data) => console.log('Subgraph data: ', data))
//   .catch((err) => {
//     console.log('Error fetching data: ', err)
//   })



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
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="docs" element={<Docs/>} />
          {/* ADD ADDITONAL ROUTES here ex swap page */}
          <Route path="/app" element={<App />} />

        </Routes>
      </BrowserRouter>
      </div>




    );
}
