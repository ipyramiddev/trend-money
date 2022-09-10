import { useState } from "react";
import Xarrow from "react-xarrows";
import Select from 'react-select';
import useSubmitSwap from "./useSwap";
import Token from "components/Token";

const swaprow = "flex flex-row w-full items-center py-4 my-5 justify-between bg-white bg-opacity-20 shadow shadow-md shadow-pink"

export const useSwapForm = (callback:any) => {
    
    const [inputs, setInputs] = useState<SwapInputs>({from_coin:"0x1::aptos_coin::AptosCoin",protocol:"Anime.swap", to_coin:"0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC", from_quantity:10000});
    const handleSubmit = async (event:any) => {
      if (event) {
        event.preventDefault();
        // const onSubmitClick = async () => {
              const comp = {}
              console.log("EVENT",event)
              console.log("Inputs",inputs)
              // await submitSwap(comp);
              callback(inputs)
              
            }
          }
          const handleInputChange = (event:any,symbol?:string) => {
            event.persist();
            setInputs(inputs => ({...inputs, [event.target.name]: event.target.value}));
          }
          const SwapForm = () => {
            const APTOS = ''
            const BTC = '0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC'
          
              const user_coins = [
                {value:"APT",label:"Aptos",symbol:"APT",coin_id:"0x1::aptos_coin::AptosCoin"},
                {value:"aBTC",label:"aBitcoin",symbol:"BTC",coin_id:"0x16fe2df00ea7dde4a63409201f7f4e536bde7bb7335526a35d05111e68aa322c::TestCoinsV1::BTC"},
                // {value:"APT",label:"mETH",symbol:"ETH"},
                // {value:"APT",label:"usdt(tether)",symbol:"USDT"},
                // {value:"APT",label:"usdt(tether)",symbol:"USDT"},
              ]
          
              // const submitSwap = () => {}
          
              // const {handleSubmit,handleInputChange,inputs} = useSwapForm(submitSwap);
              
              return (
                  <div  className="flex flex-col w-100 gap gap-3 text-white p-2 ">
                      <form onSubmit={handleSubmit}>
                        {/* FROM ASSET */}
                      <div id="from"className={swaprow}>
                        {CoinSelect(user_coins,handleInputChange,"from_coin")}
                        <div>
                          <input id='from-q' className="bg-transparent text-right  outline outline-2 outline-white rounded-lg p-2 text-3xl" type="number" name="amount" placeholder="# " onChange={(e) => handleInputChange(e)} />
                          </div>
                          
                      </div>
                        <button data-tip="coming soon" className="outline outline-dashed outline-2 outline-white opacity-50 hover:opacity-90 w-full px-2 my-3 text-cetner "
                        >+ add asset</button>
                      
                      <div className={swaprow}>
                          <p className="text-lg  px-3">Output Token</p>
                          {CoinSelect(user_coins,handleInputChange,"to0")}
                      </div>
                      <button onClick={(e)=>handleSubmit(e)} className="w-full px-3 seam-outline">Preview</button>
                      <Xarrow
                          start={"from"} //can be react ref
                          startAnchor={["bottom","left"]}
                          endAnchor={["top","right"]}
                          curveness={40}
                          dashness={true}
                          headSize={4}
                          path="grid"
                          color="white"
                          end="to0" //or an id
                      />
                      </form>
          
                      
                  </div>
              )
          }
    return {
      handleSubmit,
      handleInputChange,
      inputs,
      SwapForm
    };
  }

// const 

const CoinSelect = (supported_coins:any[],handleInputChange:(event:any,symbol?:string)=>void,
  // to indicate asset Num
  key?: string,
  selected:any=supported_coins[0]
)=>{

  const CoinOptions = supported_coins.map((coin:any,) =>{
    return(<option id={coin.name} value={coin.coin_id}>{coin.name}</option>);
  })

  return(
    <div id={key}>
      <button id={key+"btn"}>
        <Token token={selected.symbol}/>
      </button>
    <select id={key} name={`coin-${key}`}className="text-white bg-transparent outline outline-2 rounded-2xl p-3" onChange={(event) => handleInputChange(event,event.target.value)}
      value="APT"
      // options={}
    >{CoinOptions}</select>
{CoinOptions}
          </div>
  )
}





// export default SwapForm;
