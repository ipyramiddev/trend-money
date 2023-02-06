import { aptinSupplyPayload } from "hooks/useAptin";

const pool_data = {
    stats:
    {
        total_staked_apt: 1048930.22,
        stake_vol_24h: 100.00,
        tvl_change_percent: 0.90,
        vol_24h: 10344.00,
        unique_items: 2312,
    },

    seamPools: [
        {
            name: '3Y Volatility Composite',
            avg_apr_24h: 0.008,
            avg_apr_7d: 0.12,
            total_deposits: 20,
            // WILL BE REPLACED WITH CONTENT LOADED FROM ADDRESS
            // seam_pool_account = ""

            pools: [
                {
                    name: 'Supply APT',
                    platform: "Aptin",
                    assets: ["APT", "USDC", "wETH"],
                    category: "Supply asset",
                    deposit_payload: aptinSupplyPayload("APT", 10000),
                    category_tag: "Lend",
                    supply_apy: 0.05,
                    portion: 0.25,
                    yp_address: '0x01522c42ca43d7bfd34f373d41ad7d90a95e714c',
                    description: '3X-Stake-Lend-LP Leveraged'
                },
                {
                    name: "APT-BTC",
                    platform: "LiquidSwap",
                    category: "Liquidity Pool",
                    category_tag: "LP",
                    yp_address: '0xb460f9ae1fea4f77107146c1960bb1c978118816',
                    assets: ["APT", "USDC", "wETH"],

                    portion: 0.25,
                    description: 'Cross-Chain Staking'


                },
                {
                    name: "APT-ETH",
                    platform: "LiquidSwap",
                    assets: ["APT", "USDC", "wETH"],
                    category: "Liquidity Pool",
                    category_tag: "Lend",
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    portion: 0.25,
                    description: 'XXXX Leveraged'
                },
                {
                    name: 'BTC-USDT',
                    platform: "AnimeSwap",
                    assets: ["APT", "USDC", "wETH"],
                    category: "Liquidity Pool",
                    category_tag: "LP",
                    portion: 0.25,
                    yp_address: '0x01522c42ca43d7bfd34f373d41ad7d90a95e714c',
                    description: '2X-Delegate-LP Leveraged'
                }
            ]
        },
        {
            name: '∀ - 3X Leveraged Power Loom',
            avg_apr_24h: 0.13,
            avg_apr_7d: 0.13,
            total_deposits: 0,

            pools: [
                // {
                //     name: "APT-BTC",
                //     platform: "hippo",
                //     yp_address: '0xb460f9ae1fea4f77107146c1960bb1c978118816',
                //     assets: ["APT", "BTC"],
                //     portion: 0.25,
                //     category_tag:"lp",
                // },
                {
                    name: "APT-APT",
                    platform: "Anime.swap",
                    assets: ["APT", "APT",],
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    portion: 0.25,
                    category_tag: "lp",
                },
                {
                    name: "APT-APT",
                    platform: "Anime.swap",
                    assets: ["APT", "APT",],
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    portion: 0.25,
                    category_tag: "lp",
                },
                {
                    name: "APT-APT",
                    platform: "Anime.swap",
                    assets: ["APT", "APT",],
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    portion: 0.25,
                    category_tag: "lp",
                },

            ]
        },

    ]
}

const aptin_data = {
    assets: [
        {
            symbol: "APT",
            name: "Aptos",

        },
        {
            symbol: "BTC",
            name: "Bitcoin",
        }
    ],
    supply_pools: [
        {
            name: "supply aptos",
            assets: ["APT"],
            apy: 0.05,
            supplied_q: 10000,
            borrow_q: 10000,
            deposit_payload: aptinSupplyPayload("APT", 10000)
        }
    ],
    borrow_pools: [
        {
            name: "Borrow aptos",
            assets: ["APT"],
            apy: 0.06,
            supplied_q: 10000,
            borrow_q: 10000,
        }
    ]
}

const resources = [
    { name: "aptos forum", url: "https://forum.aptoslabs.com/" },
    { name: "aptos docs", url: "https://forum.aptoslabs.com/" },
    { name: "aptos SDK docs", url: "https://aptos.dev/sdks" }

]


export default pool_data;