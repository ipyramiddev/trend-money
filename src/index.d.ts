export {};

declare global {
  interface Window {
    aptos: any;
    martian: any;
  }

  interface UserNfts {
    collections?: any[];
    collection_count?: any;
    minted_count?: any;
    nfts?: any[];

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
    connected: boolean;
    user: User | undefined;
}

interface User {
    // balance: any;
    address: string;
    nfts?: UserNfts;
    coins?: UserCoins;
    txns: any[] | null;
}

}

