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

    filled_boxes: [
        {
            main: 'unstake at any time',
            emoji: '📈',
            color: 'purple'
        },
        {
            main: '“simple cUSD deposits”',
            secondary: 'just deposit in cUSD, and we handle the dispersement of your liquidity accross multiple pools',
            emoji: '🔀',
            color: 'purple'
        },
        {
            main: 'Set and Forget',
            secondary:"No need to be checking your positions night and day to ensure they are still there, with the diversification we provide your risk exposure is significantly reduced",
            emoji: '💸',
            color: 'yellow'
        },
    ],

    hero_section1: {
        "main": "A user friendly approach to liquidity pools, all represented as a single interest-bearing token”,        ",
        "button_text": "Join Waitlist"
    },

    hero_section2: {
        main: "diversified Yield Farming",
        secondary: " Simply deposit your Defi Assets and begin earning between",
        gradient_text: "10% - 20% APR",
        button_text: "Launch App",
        boxes: [
            {
                text: "Unstake  at any time",
                icon: (<FaClock className={gateway_icon_class} />),
            },
            {
                text: "Cross chain deposit support",
                icon: (<FaRandom className={gateway_icon_class} />),
            },
            {
                text: "Capitalizing on the power of compound interest",
                icon: (<FaRegMoneyBillAlt className={gateway_icon_class} />),

            },

        ]
    },

    hero_section3: {
        main: "Safe, Simple, Slick diversified yield",
        secondary: "Use our various gateways, to deposit, withdraw, and manage your stablecoin yields",


        boxes: [
            {
                main: "USSD",
                secondary: "Use your mobile phone to deposit and withdraw your stablecoin assets, even without data or internet access",
                icon: (<FaBroadcastTower className={icon_class} />),
                button_text: "view guide",
            },
            {
                main: "Mobile App",
                secondary: "alternativly, use our mobile app's simple dashboard to manage your assets",
                icon: (<FaMobile className={icon_class} />),
                button_text: "learn more",
            },
            {
                main: "Web App",
                secondary: "Connect with valora, metamask and other browser bassed wallets to simplify your yield management",
                icon: (<FaMobile className={icon_class} />),
                button_text: "launch app",
            },
        ],

    },
    apps:[
        {name:"ubeswap", description:"The mobile-first deFi exchange,Swaping and yeild solution", img_src:"./home/ubeswap.png"} ,
        {name:"mobius" , description:"Celos first cross-chain stableswap exchange", img_src:"./home/mobius.png"} ,
        {name:"pinnata", description:"leverage provider and yield farming pools ", img_src:"./home/pinnata.png"},
        {name:"moolaMarkets", description:"Democratizing access to credit and yield", img_src:"./home/moolaMarkets.png"},
    ],


            team : [
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

            // LABELED AS q and a respec.
            faq: [
                {
                    q: 'Why should I use stitch to manage my yield farming?',
                    a: "Stitch makes it easy to diversify your yield positions,",
                },
                {
                    q: 'Why should I use stitch to manage my yield farming?',
                    a: "Stitch makes it easy to diversify your yield positions,",
                },
            ],
    
}