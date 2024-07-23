/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  mode: 'jit',
  content: ["./dist/*.{html,js}"],
  theme: {
      colors: {
        'lightBackground': '#f8fafc',
        'lightBorder': '#ffffff54',
        'lightTitle': '#020617',
        'lightBody': '#6b7280',

        'darkBackground': '#1e293b',
        'darkBorder': '#374151',
        'darkTitle': '#f8fafc',
        'lightBody': '#6b7280',
        
        'black': "#000000",
        'white': "#ffffff",
        'orange': "#FF3C00",
      },
    fontFamily: {
      'sans': ['Inter'],
      'serif': ['Inter'],
      'mono': ['Inter',],
      'display': ['Inter'],
      'body': ['Space Grotesk',],
    },
    extend: {
      padding: {
        '3p': '3%',
        '15p': '15%',
      },
      backgroundImage: {
        'hero-bg': "url('/src/assets/Digital-sprinters-hero-bg.jpg')",
      }
    },
  },
  plugins: [],
}

