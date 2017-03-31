var Client = require('logux-client/client')

/**
 * Returns extended Vuex.Store class with connected Logux client
 *
 * @param {class} Store Vuex.Store class.
 * @param {object} config Logux Client config.
 *
 * @return {class} Vuex.Store with Logux hacks.
 */
function connectLogux (Store, config) {
  function LoguxStore () {
    var self = this

    Store.apply(this, arguments)

    this.client = new Client(config)

    this.client.log.on('add', function (action) {
      Store.prototype.commit.call(self, action.type)
    })
  }

  LoguxStore.prototype = Object.create(Store.prototype)

  LoguxStore.prototype.constructor = LoguxStore

  LoguxStore.prototype.add = function add (action, meta) {
    return this.client.log.add(action, meta)
  }

  LoguxStore.prototype.commit = function commit (actionType) {
    return this.add({ type: actionType }, { tab: this.client.id })
  }

  return LoguxStore
}

module.exports = connectLogux
