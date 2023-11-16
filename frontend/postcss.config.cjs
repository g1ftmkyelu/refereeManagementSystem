const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");

const config = {
  _plugins: [
    //Some plugins, like tailwindcss/nesting, need to run before Tailwind,
    tailwindcss(),
    //But others, like autoprefixer, need to run after,
    autoprefixer,
  ],
  get plugins() {
    return this._plugins;
  },
  set plugins(value) {
    this._plugins = value;
  },
};

module.exports = config;