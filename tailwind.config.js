/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  mode: 'jit',
  content: ["./dist/*.{html,js}"],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
      colors: {
        'background': 'rgba(var(--background))',
        'borderColor': 'rgba(var(--borderColor))',
        'copyPrimary': 'rgba(var(--copyPrimary))',
        'copySecondary': 'rgba(var(--copySecondary))',

        'black': "#000000",
        'white': "#ffffff",
        'orange': "#FF3C00",


        'lightBackground': '#f8fafc',
        'lightBorder': '#ffffff54',
        'lightTitle': '#020617',
        'lightBody': '#6b7280',

        'darkBackground': '#1e293b',
        'darkBorder': '#374151',
        'darkTitle': '#f8fafc',
        'lightBody': '#6b7280',

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

