/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['class'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        sm: { max: '767px' },
        md: { min: '768px', max: '1023px' },
        lg: { min: '1024px', max: '1279px' },
        xl: { min: '1280px', max: '1440px' },
      },
    },
    extend: {
      screens: {
        xs: { min: '360px', max: '767px' },
        xxl: { min: '1441px' },
        xm: { min: '360px', max: '500px' },
        mm: { min: '500px', max: '767px' },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: 'calc(var(--radius) - 4px)',
      },
      letterSpacing: {
        xs: '0.2px',
        sm: '0.5px',
        large: '1px',
      },
      lineHeight: {
        full: '100%',
        lg: '133.33%',
        xl: '140%',
        xs: '120%',
        xxl: '150%',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography'), require('@tailwindcss/aspect-ratio')],
  corePlugins: {
    // preflight: false,
    aspectRatio: false,
  },
};

// var screenXs="480px";
// var screenSm="640px";
// var screenMd="1024px";
// var screenLg="1400px";

// var screenXsMin="480px";
// var screenSmMin="640px";
// var screenMdMin="1024px";
// var screenLgMin="1400px";

// var screenXsMax="639px";
// var screenSmMax="1023px";
// var screenMdMax="1399px";
