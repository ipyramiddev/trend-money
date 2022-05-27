module.exports = {
	content: ['./src/**/*.{js,jsx}', './public/index.html'],
	theme: {
		screens: {
			sm: '480px',
			md: '768px',
			lg: '976px',
			xl: '1440px',
		},
		colors: {
			blue: '#20ffff',
			pink: '#ff49db',
			purple: '#391A51',
			lightPurple: '#8933f5',
			green: '#34eb3d',
			white: '#ffffff',
			yellow: '#fff620',
			gray: '#8492a6',
			blac: '#000000',
			red: '#ff0000',
			black: '#000000',
		},
		
		fontFamily: {
			Poppins: ['Poppins', 'sans-serif'],
			sans: ['Graphik', 'sans-serif'],
			serif: ['Merriweather', 'serif'],
		},

		extend: {
			spacing: {
				128: '32rem',
				144: '36rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
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
	plugins: [require('daisyui')],
};
