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
            name: '3Y-SEAM',
            avg_apr_24h: 0.13,
            avg_apr_7d: 0.13,
            total_deposits: 0,

            pools: [
                {
                    name: "APT-BTC",
                    platform: "Pontem",
                    yp_address: '0xb460f9ae1fea4f77107146c1960bb1c978118816',
                    assets: ["APT", "BTC"],

                },
                {
                    name: "APT-ETH",
                    platform: "Pontem",
                    assets: ["APT", "ETH",],
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    YTF_portion: 0.25,
                },
                // {
                //     name: 'APT-ETH',
                //     platform: "Pn",
                //     assets: ["SOL", "CELO",],
                //     yp_address: '0x01522c42ca43d7bfd34f373d41ad7d90a95e714c'
                // }
            ]
        },
        {
            name: '3X-SEAM',
            avg_apr_24h: 0.13,
            avg_apr_7d: 0.13,
            total_deposits: 0,

            pools: [
                {
                    name: "APT-BTC",
                    platform: "Pontem",
                    yp_address: '0xb460f9ae1fea4f77107146c1960bb1c978118816',
                    assets: ["CELO", "mCUSD"],

                },
                {
                    name: "APT-ETH",
                    platform: "Pontem",
                    assets: ["APT", "ETH",],
                    yp_address: '0x0448e99ab5f8230713a9f5d7e64ec2ab6e5952a3',
                    // YTF_portion: 0.25,
                },
                // {
                //     name: 'A',
                //     platform: "",
                //     assets: ["SOL", "CELO",],
                //     yp_address: '0x01522c42ca43d7bfd34f373d41ad7d90a95e714c'
                // }
            ]
        },

    ]
}


export default pool_data;