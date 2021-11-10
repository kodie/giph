#!/usr/bin/env node

function giph (search, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!options) { options = {} }
  if (!options.rating) { options.rating = '' }

  const giphy = require('giphy-api')(options.key)

  return giphy.random({
    tag: search,
    rating: options.rating
  })
    .then(res => {
      if (!res || !res.data || !res.data.id) {
        throw new Error(`No gifs were found using the query '${search}'.`)
      }

      return res.data
    })
    .then(img => {
      if (!options.buffer && !options.file) {
        return img
      }

      const request = require('request-promise-native')

      return request.get({ url: img.images.original.url, encoding: 'binary' })
        .then(buffer => {
          img.buffer = Buffer.from(buffer, 'binary')

          return img
        })
    })
    .then(img => {
      if (options.file) {
        const fs = require('fs')

        fs.writeFileSync(options.file, img.buffer)
      }

      return img
    })
    .then(img => {
      if (cb) {
        cb(null, img)
      }

      return img
    })
    .catch(err => {
      if (cb) {
        cb(err)
      } else {
        throw err
      }
    })
}

if (require.main === module) {
  const argv = require('minimist')(process.argv.slice(2))
  const copyPaste = require('copy-paste')
  const termImg = require('term-img')

  var buffer = !argv.nodisplay

  giph(argv._.join(' '), {
    buffer: buffer,
    file: argv.file,
    key: argv.key,
    rating: argv.rating
  })
    .then(img => {
      if (argv.details) {
        console.log(img)
      }

      if (buffer) {
        termImg(img.buffer, () => {})
      }

      if (!argv.nocopy) {
        copyPaste.copy(img.images.original.url)
      }
    })
    .catch(err => {
      console.error(err.message)
    })
}

module.exports = giph
