'use strict';
const RippleAPI = require('ripple-lib').RippleAPI

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233'
})

const addresses = require('./addresses').addresses

api.connect().then(() => {
  
  /* begin custom code ------------------------------------ */

  return api.getAccountInfo(addresses.issuer.address).then((info) => {

    console.log("\n\n"+addresses.issuer.name, info)

    api.getTrustlines(addresses.issuer.address).then(trustlines => {
      
      console.log("\n\n"+addresses.issuer.name, trustlines)
      
    })

  }).catch((error) => {
    
    console.log("Issuer Error:", error)
    process.exit()

  })

}).then(() => {

  return api.getAccountInfo(addresses.marketmaker.address).then((info) => {

    console.log("\n\n"+addresses.marketmaker.name, info)

    api.getTrustlines(addresses.marketmaker.address).then(trustlines => {
      
      console.log("\n\n"+addresses.marketmaker.name, trustlines)

    })

  }).catch((error) => {
    
    console.log("Marketmaker Error:", error)
    process.exit()

  })

}).then(() => {

  return api.getAccountInfo(addresses.alice.address).then((info) => {

    console.log("\n\n"+addresses.alice.name, info)

    api.getTrustlines(addresses.alice.address).then(trustlines => {
      
      console.log("\n\n"+addresses.alice.name, trustlines)

    })

  }).catch((error) => {
    
    console.log("Alice Error:", error)
    process.exit()

  })

}).then(() => {

  return api.getAccountInfo(addresses.bob.address).then((info) => {

    console.log("\n\n"+addresses.bob.name, info)

    api.getTrustlines(addresses.bob.address).then(trustlines => {
      
      console.log("\n\n"+addresses.bob.name, trustlines)

    })

  }).catch((error) => {
    
    console.log("Bob Error:", error)
    process.exit()

  })

}).then(() => {

  return api.disconnect()

}).then(() => {
  
  console.log('done and disconnected.')
  process.exit()

}).catch(console.error)