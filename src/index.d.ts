export {};

declare global {
  interface Window {
    aptos: any;
    martian: any;
  }

  interface UserNfts {
    collections: any[] | null;
    collection_count: any;
    minted_count: any;
    nfts: any[] | null;

  }

  interface UserCoins {
    coins: any[];
    coin_count: any;
    balance: any;
    deposit_count: any;
    withdraw_count: any;
    coin_txs: any[] | null;
    coin_txs_count: any| null;
  }
  interface UserProps {
    account: AptosAccount | null;
    connected: boolean;
    user: User;
}

interface User {
    balance: any;
    address: string;
    nfts: UserNfts | null;
    coins: UserCoins | null;
    // coins?: any;
    // transactions?: any;

}

}

