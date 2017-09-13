import test from 'ava'

const giph = require('.')

test('Async with promises', t => {
  return giph('pokemon')
    .then(img => {
      t.true(typeof img === 'object')
    })
    .catch(err => {
      t.fail(err)
    })
})

test('Async with callback', t => {
  return giph('pokemon', (err, img) => {
    if (err) {
      t.fail(err)
    } else {
      t.true(typeof img === 'object')
    }
  })
})
