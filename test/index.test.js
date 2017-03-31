var connectLogux = require('../connect-logux')
var index = require('../')

it('has connectLogux function', function () {
  expect(index.connectLogux).toBe(connectLogux)
})
