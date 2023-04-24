/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      "business", "night", "luxury", "coffee", "forest", "halloween"
    ],
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')
  ],
}
