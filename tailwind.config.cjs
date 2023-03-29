/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {



          "primary": "#a5f3fc",



          "secondary": "#374151",



          "accent": "#3ABFF8",



          "neutral": "#191D24",



          "base-100": "#2A303C",



          "info": "#3ABFF8",



          "success": "#36D399",



          "warning": "#FBBD23",



          "error": "#F87272",
        },
      },
    ],
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar')
  ],
}
