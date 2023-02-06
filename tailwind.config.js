/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
		screens: {
			sm: '480px',
			mobile: '600px',
			md: '768px', 
			lg: '1093px',
		  	xl: '1440px',
		},
		colors: {
			blue2: '#4dbbfa',
			blue: '#00bcd4',
			pink: '#ff49db',
			purple: '#391A51',
			lightPurple: '#8933f5',
			green1: '#34eb3d',
			white: '#ffffff',
			yellow: '#fff620',
			orange: '#ffa726',
			gray: '#8492a6',
			blac: '#000000',
			pastelBlue: '#5B7AE8',
        	pastelPink: '#E2536D',
			red: '#ff0000',
			black: '#000000',
			darkgray: '#141414',
			point1: 'rgb(255, 153, 153)',
			point2: 'rgb(232, 0, 83)',
			cardgray: '#0e0e0e',
		},
		
		fontFamily: {
			Poppins: ['Poppins', 'sans-serif'],
			sans: ['Nunito Sans', 'Dank Mono', 'Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
			'press-start': ['"Press Start 2P"', 'cursive'],
		},

		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			// borderRadius: {
			// 	'4xl': '2rem',
			// },

			// boarderColor: {
				
			// },



			backgroundImage: {
				"team-img": "url(../public/home/team-img.png)",
				"team-box-img": "url(../public/home/team-box-img.png)",
				"logos-img": "url(../public/home/logos-img.png)",
				"celo-logo": "url(../public/celo-logo.png)",
			},
			gradientColorStops: (theme) => ({
				primary: '#FF8C00',
				secondary: '#FFA500',
				danger: '#FFD700',
			}),
		},
	},
	// plugins: [require('daisyui'),require('tailwindcss-gradients'),require('tailwind-scrollbar')],
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
			  	'@font-face': {
					fontFamily: 'Dank Mono',
				  	fontWeight: '100',
				  	src: 'url(/public/fonts/DankMono-Regular.ttf)'
				}
			})
		}),
	],
}
