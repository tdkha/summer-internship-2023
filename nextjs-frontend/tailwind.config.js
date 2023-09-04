/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-blur-white':'#f4f4f4',
        'custom-main-gray':'#939292',
        'custom-main-yellow':'#edfeb1',
        'custom-main-lightgreen':'#7bd56e',
        'custom-main-darkgreen':'#01544e',
        'custom-main-lightblue':'#75dbd2',
        
        'darkblue':'#04279f',
        'brightblue':'#052fc2',
        'neon-green':'#13F287',

        'custom-black':'#070606',
        'custom-dim-black':'#111111',
        'custom-light-black':'#191919',
        'custom-blur-black': '#27262a',
        'custom-light-gray':' #7D7D7D',   
        'custom-mid-gray':' #313338',
        'custom-dim-gray':'#27252b',
        
        
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'lufga': ['Lufga', 'sans-serif'],
      'gopher' : ['gopher','sans-serif'],
      'RobotoMono' : ['Roboto Mono','monospace'],
      'roboto' : ['roboto','sans-serif'],
      'Inter' : ['Inter','sans-serif'],
    },
  },
  plugins: [],
}
