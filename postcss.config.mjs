/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "postcss-import": {},
    tailwindcss: {},
    "postcss-preset-env": { stage: 1 },
  },
};

export default config;
