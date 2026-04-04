/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        nunito: "'Nunito', sans-serif"
      },
      boxShadow:{
        custom: "0px 0px 20px 0px rgba(50, 50, 50,0.72)",
        whitner: "0px 0px 20px 0px rgba(230,241,250,0.72)"
      },
      backgroundColor:{
        linear: "linear-gradient(93deg, rgba(222,246,246,1) 0%, rgba(165,217,217,1) 22%, rgba(172,220,221,1) 35%, rgba(179,214,217,1) 46%, rgba(172,223,228,1) 56%, rgba(165,217,217,1) 82%, rgba(214,237,241,1) 100%);"
      },
      width:{
        256: "350px"
      },
      minHeight:{
        50: '400px'
      },
      animation: {
        blob: "blob 7s infinite",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
}
