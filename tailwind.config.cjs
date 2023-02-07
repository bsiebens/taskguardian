/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/lib/**/*.{html,js,svelte,ts}', './src/routes/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    darkTheme: 'dracula'
  }
}
