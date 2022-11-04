/// <reference types="react-scripts" />
import { OnChainTransaction } from "aptos/dist/api/data-contracts";
export {};
declare global {
  interface Window {
    aptos: any;
    martian: any;
  }

  interface UserNfts {
    collections?: any[];
    sent_count?: number;
    collection_count?: any;
    minted_count?: any;
    nfts?: any[];

  }

  interface SwapInputs{
    protocol?: string,
    from_coin: string,
    from_quantity:number,
    to_coin: string,
  }

    
  interface CoinInfo {
    decimals: number;
    name: string;
    supply: {
      vec: [
        {
          aggregator: {
            vec: [AggregatorData];
          };
          integer: {
            vec: [];
          };
        },
      ];
    };
    symbol: string;
  }
  
  interface AggregatorData {
    handle: string;
    key: string;
    limit: string;
  }

  interface SwapComp{}

  interface Dapp {
    address?: string;
    name: string;
    image?: string;
    description?: string;
    url?:string;
  }
  interface Stat {
    name: string;
    value: string;
  }
  interface StatProps {
    stat: Stat;
    // style: any;
    format: boolean;
    color: string;
    unit: string;

  }

  interface UserCoins {
    coins?: any[]|null;
    balance: any;
    deposit_count?: any;
    withdraw_count?: any;
    coin_txs?: any[] | undefined;
    coin_txs_count?: any| null;
  }
  interface UserProps {
    // account: AptosAccount | null;
    user: User;
  }

  interface User {
      // balance: any;
      address: string;
      nfts?: UserNfts;
      coins?: UserCoins;
      txns: OnChainTransaction[];
  }

}