const twdutl = require('./src/index')

module.exports = {
  content: [
    "./test/index.html",
    "./test/**/*.{html,js}"
  ],
  theme: {
    extend: {},
    colors: {
      darkbase: '#121212',
    }
  },
  plugins: [ twdutl([
    {
      name: 'bg-light-{v}',
      value: `background-color: rgba(255, 255, 255, {v}%)`,
      defaults: [9, 18, 24],
      dynamic: true
    }
  ]) ],
}