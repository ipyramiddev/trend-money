import { FaClock, FaRandom, FaRegMoneyBillAlt, FaBroadcastTower, FaCoins, FaMobile, FaCompactDisc, } from "react-icons/fa";

const icon_class = "text-white text-3xl md:text-4xl";
const gateway_icon_class = " text-3xl md:text-4xl";




export const home_page_text = {
    outlined_boxes: [
        {
            main: '“Diversify your yield strategy”',
            secondary: 'reduces risk of yield "fall-out, through diversification accross yield pools"',
            emoji: '📈',
            color: 'pink'
        },
        {
            main: '“Automated Pool Swaps”',
            secondary: 'Utilizing the highest yielding stablecoin pool to consistently deliver the highest APY',
            emoji: '👀',
            color: 'pink'
        },

    ],
    stack_section: {
        main: " Start capitalizing on your stablecoin assets",
        secondary: "Earn Astonishing APY on USDC, UST and more",
        filled_box: {
            color: 'purple',
            text: ''
        },
        apy_text: [
            '  ',
            ' 10-20% APR at your fingertips'
        ]
    },

    YTF: {
        name: "4F-Stable",
        yps: [
            {
                name: "USDC (Optics V2)",
                assets: ["USDC","USDT",],
                apr: 0.129,
                YTF_portion: 0.25,

            },
            {
                name: "UST (Allbridge)",
                platform: "Mobius",
                assets: ["cUSD", "cUSDT"],
                pool_tvl: "$1,808,004",
                weekly_volume: "$1,813",
                apr: 0.12,
                YTF_portion: 0.25,
                tvl: 738040.33,
            },
            {
                name: "USDC (Optics V2)",
                platform: "Mobius",
                assets: ["cUSD", "cUSDT"],
                total_deposited: "$1,808,004",
                weekly_volume: "$1,813",
                apr: 0.279,
                YTF_portion: 0.25,
                tvl: 33330.00,
            },
            {
                name: "DAI (Optics V2)",
                platform: "Mobius",
                assets: ["cUSD", "DAI"],
                total_deposited: "$2,880,004",
                weekly_volume: "$1,333",
                apr: 0.232,
                YTF_portion: 0.25,
                tvl: 1000000.00,
            }
        
        ]
    },

    
    



    apps: [
        { name: "ubeswap", description: "The mobile-first deFi exchange,Swaping and yeild solution", img_src: "../home/ubeswap.png" },
        { name: "mobius", description: "Celos first cross-chain stableswap exchange", img_src: "../home/mobius.png" },
        { name: "pinnata", description: "leverage provider and yield farming pools ", img_src: "../home/pinnata.png" },
        // {name:"moolaMarkets", description:"Democratizing access to credit and yield", img_src:"./home/moolaMarkets.png"},
    ],


    team: [
        {
            emoji: '👲🏽',
            name: "J. Kell",
            roles: [
                "Full Stack",
                "Blockchain Dev",
            ]

        },
        {
            emoji: '👲🏽',
            name: "M. Moha",
            roles: [
                "Full Stack",
                "Blockchain Dev",
            ]

        },
        {
            emoji: '👲🏽',
            name: "M. Bett",
            roles: [
                "Tech Writer",
                "Blockchain Dev",
            ]

        },

    ],

}