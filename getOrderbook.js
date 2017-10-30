'use strict';
const RippleAPI = require('ripple-lib').RippleAPI

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233'
})

const addresses = require('./addresses').addresses

api.connect().then(() => {

  let orderbook = {
    "base": {
      "currency": "BRL",
      "counterparty": addresses.issuer.address
    },
    "counter": {
      "currency": "USD",
      "counterparty": addresses.issuer.address
    }
  }

  api.getOrderbook(addresses.marketmaker.address, orderbook).then((orders) => {

      console.log("\n\nOrderbook:\n\n"+addresses.marketmaker.name, JSON.stringify(orders)+"\n\n")

  }).catch((error) => {
  
    console.log("Marketmaker Error:", error)
    process.exit()

  })

}).then(() => {

  let orderbook = {
    "base": {
      "currency": "USD",
      "counterparty": addresses.issuer.address
    },
    "counter": {
      "currency": "BRL",
      "counterparty": addresses.issuer.address
    }
  }

  api.getOrderbook(addresses.marketmaker.address, orderbook).then((orders) => {

      console.log("\n\nOrderbook:\n\n"+addresses.marketmaker.name, JSON.stringify(orders)+"\n\n")

  }).catch((error) => {
  
    console.log("Marketmaker Error:", error)
    process.exit()

  })

}).then(() => {

  return api.disconnect()

}).then(() => {
  
  console.log('done and disconnected.')
  process.exit()

}).catch(console.error)