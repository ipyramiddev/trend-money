export const ube_pool_data = {
    "ube_celo_pool": {
        "name": "UBE/CELO",
        'platform': 'ubeswap',
        'address': '0xe7b5ad135fa22678f426a381c7748f6a5f2c9e6c',
    },
    "factory": "0x62d5b84bE28a183aBB507E125B384122D2C25fAE"

}


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
    seamPools: [
        {
            name: 'YETF',
            avg_apr_24h: 0.13,
            avg_apr_7d: 0.13,
            total_deposits: 0,
            all_assets: [
                "USDC", "mCUSD",
                "UBE", "CELO",
                "SOL", "mcEUR"],
            pools: [
                {name: "CELO-mCUSD",
                platform: "ubeswap",
                yp_address: '0xb460f9ae1fea4f77107146c1960bb1c978118816',
                assets: ["CELO", "mCUSD"],

            },
            {
                name: "mCUSD-WBTC",
                platform: "ubeswap",
                assets: ["mCUSD", "WBTC",],
                yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                YTF_portion: 0.25,
            }, ,
            {
                name: 'CELO-mcEUR',
                platform: "ubeswap",
                assets: ["CELO", "mcEUR"],
                yp_address: '0x1e593f1fe7b61c53874b54ec0c59fd0d5eb8621e0x9f437509e61896738ea8cdb6cded618c0e509032',

            },
            {
                name: 'SOL-CELO',
                platform: "ubeswap",
                assets: ["SOL", "CELO",],
                yp_address: '0x01522c42ca43d7bfd34f373d41ad7d90a95e714c'
            }
            ]
        },
        {
            name: 'celoXstables',
            avg_apr_24h: 0.13,
            avg_apr_7d: 0.13,
            total_deposits: 0,
            all_assets: [
                'mCUSD', 'mcEUR', 'CELO',
            ],
            pools: [
                {
                    name: "CEL0-mCUSD",
                    platform: "ubeswap",
                    assets: ["CELO", "mCUSD",],
                    yp_address: '0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc',
                    YTF_portion: 0.25,
                },
                {
                    name: 'CELO-mCEUR',
                    platform: "ubeswap",
                    assets: ["CELO", "mcEUR",],
                    yp_address: '0x9f437509e61896738ea8cdb6cded618c0e509032',

                },
                {
                    name: 'CELO-cUSD',
                    platform: "ubeswap",
                    assets: ["CELO", "cUSD",],
                    yp_address: '0x1e593f1fe7b61c53874b54ec0c59fd0d5eb8621e',
                },
                {
                    name: 'mCUSD-mCEUR ',
                    platform: "ubeswap",
                    assets: ["mCUSD", "mCEUR",],
                    yp_address: '0xf94fea0c87d2b357dc72b743b45a8cb682b0716e',
                }

            ]
        }
    ]
}


export default pool_data;