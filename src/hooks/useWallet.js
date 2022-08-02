import { ethers, BigNumber } from "ethers";

export const useWallet = () => {
    if ("aptos" in window) {
        return(window.aptos);
    }
    else {
        return(null);
    }
}

export const connectToMetamask = async (provider) => {
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(accounts[0]);
    const balanceInEther = ethers.utils.formatEther(balance);
    console.log(accounts)
    const userData = {
        walletAddress: accounts[0],
        balances : {
            cUSD: balanceInEther,
        }
    }
    console.log("USERDATA:",userData)
    return userData
  }