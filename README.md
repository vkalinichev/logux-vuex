# Logux Vuex

*Based on Logux Redux by Andrey Sitnik* 

Logux is a client-server communication protocol. It synchronizes action
between clients and server logs.

This library provides Vuex compatible API.

### Install
```shell
npm install logux-vuex
```

### Usage
```diff js
import Vue from 'vue'
import Vuex from 'vuex'
+import { connectLogux } from 'logux-vuex'

Vue.use(Vuex)

+const LoguxStore = connectLogux(Vuex.Store, {
+  subprotocol: '1.0.0',
+  userId: 10,
+  url: 'wss://localhost:1337'
+})

-var store = new Vuex.Store({
+var store = new LoguxStore({
  state: {
    value: 0
  },
  mutations: {
    Inc: (state) {
      state.value++
    }
  }
})
```

See also [Logux Status] for UX best practices.

[Logux Status]: https://github.com/logux/logux-status
