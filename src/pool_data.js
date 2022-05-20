export const ube_pool_data = {
    "ube_celo_pool": {
        "name": "UBE/CELO",
        'platform': 'ubeswap',
        'address': '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c',
    },
    "factory": "0x62d5b84bE28a183aBB507E125B384122D2C25fAE"

}

// const 


const pool_data = {
    stats:
    {
        tvl_usd: 1048930.22,
        tvl_change: 0.00,
        tvl_change_percent: 0.00,
        vol_24h: 10344.00,
        total_interest: 2312,
    },

    uniswapFactories: [
        {
            name: "Uniswap V2(ETH)",
            chain_id: 1,
            address: "0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8",
            // symbol: "ETH",
        },
        {
            name: 'ubeswap (CELO)',
            chain_id: 42220,
            address: "0x62d5b84bE28a183aBB507E125B384122D2C25fAE",
        }
    ],
    YETF:{
        avg_apr_24h: 0.13,
        avg_apr_7d: 0.13,
        total_deposits: 0,
        all_assets: [
            "USDC","USDT",
            "UBE", "CELO",
            "cUSD", "DAI"],
        pools: [
        {
            name: "USDC (Optics V2)",
            assets: ["USDC","USDT",],
            yp_address: '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c',
            apr: 0.129,
            YTF_portion: 0.25,

        },
        {
            name: "UBE-CELO",
            platform: "ubeswap",
            yp_address: '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c',
            assets: ["UBE", "CELO",],
            pool_tvl: "$1,808,004",
            weekly_volume: "$1,813",
            apr: 0.12,
            YTF_portion: 0.25,
            tvl: 738040.33,
            
        },
        {
            name: "USDC-ETH",
            platform: "uniswap",
            assets: ["USDC", "ETH"],
            yp_address:'0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
            total_deposited: "$200,808,004",
            weekly_volume: "$1,813",
            apr: 0.279,
            YTF_portion: 0.25,
            tvl: 33330.00,
        },
        {
            name: "DAI (Optics V2)",
            platform: "mobius",
            assets: ["cUSD", "DAI"],
            total_deposited: "$2,880,004",
            weekly_volume: "$1,333",
            apr: 0.232,
            YTF_portion: 0.25,
            tvl: 1000000.00,
        }
    
    ]
}
}
export default pool_data;