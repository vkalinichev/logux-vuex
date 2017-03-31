var connectLogux = require('../connect-logux')
var Vue = require('vue')
var Vuex = require('vuex')

Vue.use(Vuex)

var LoguxStore = connectLogux(Vuex.Store, {
  subprotocol: '1.0.0',
  userId: 10,
  url: 'wss://localhost:1337'
})

function createStore () {
  return new LoguxStore({
    state: {
      value: 0
    },
    mutations: {
      INC: function (state) {
        state.value++
      }
    }
  })
}

it('creates Vuex store', function () {
  var store = createStore()
  store.commit('INC')
  expect(store.state).toEqual({ value: 1 })
})

it('creates Logux client', function () {
  var store = createStore()
  expect(store.client.options.subprotocol).toEqual('1.0.0')
})

it('sets tab ID', function () {
  var store = createStore()
  return new Promise(function (resolve) {
    store.client.log.on('add', function (action, meta) {
      expect(meta.tab).toEqual(store.client.id)
      resolve()
    })
    store.commit('INC')
  })
})

it('has shortcut for add', function () {
  var store = createStore()
  return store.add({ type: 'INC' }, { reasons: ['test'] }).then(function () {
    expect(store.state).toEqual({ value: 1 })
    expect(store.client.log.store.created[0][1].reasons).toEqual(['test'])
  })
})
