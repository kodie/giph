# giph
[![npm package version](https://img.shields.io/npm/v/giph.svg?style=flat-square)](https://www.npmjs.com/package/giph) [![Travis build status](https://img.shields.io/travis/kodie/giph.svg?style=flat-square)](https://travis-ci.org/kodie/giph) [![npm package downloads](https://img.shields.io/npm/dt/giph.svg?style=flat-square)](https://www.npmjs.com/package/giph) [![index.js file size](https://img.shields.io/github/size/kodie/giph/index.js.svg?style=flat-square)](index.js) [![code style](https://img.shields.io/badge/code_style-standard-yellow.svg?style=flat-square)](https://github.com/standard/standard) [![license](https://img.shields.io/github/license/kodie/giph.svg?style=flat-square)](LICENSE.md)

![](https://i.imgur.com/57vpCVz.gif)

A small node module/command line interface tool that fetches a random GIF from [Giphy](https://giphy.com).

## Installation/Usage

### CLI

```shell
npm install --global giph
```

```shell
giph <keywords> [--rating=r --file=~/Desktop/giph.gif --key=API_KEY --details --nodisplay --nocopy]
```

The CLI tool will attempt to display the GIF in the terminal (currently only supported by [iTerm2 v3.0 or higher](https://iterm2.com)) and copy the URL to your clipboard.

### Node
```shell
npm install --save giph
```

```javascript
const giph = require('giph')

// Promises
giph(keywords, options)
  .then(img => {
    console.log(img)
  })
  .catch(err => {
    console.error(err)
  })

// Callback
giph(keywords, options, (err, img) => {
  if (err) {
    console.error(err)
  } else {
    console.log(img)
  }
})
```

## Options
* **buffer** - Set to true to also return the image as a buffer. (Defaults to false)
* **file** - File path to save the gif to. (Defaults to blank)
* **key** - Giphy API key. (Just in case you would like to use your own) (Defaults to blank)
* **rating** - Rating to limit the gif to (y, g, pg, pg-13, or r). (Defaults to blank)

### CLI Only
* **--details** - Display the details returned from the API in the terminal.
* **--nocopy** - Don't copy the gif URL to the clipboard.
* **--nodisplay** - Don't display the gif in the terminal.

## License
MIT. See the [License file](LICENSE.md) for more info.
