'use strict';

const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({
  //server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233'
});

api.on('error', (errorCode, errorMessage) => {
  console.log(errorCode + ': ' + errorMessage);
});

api.on('connected', () => {
  // console.log('connected');
});

api.on('disconnected', (code) => {
  // console.log('disconnected, code:', code);
  process.exit()
});


api.connect().then(() => {

  /* begin custom code ------------------------------------ */

  return api.generateAddress()

}).then(generatedAddress => {

  console.log("\n\nMarket Maker")
  console.log('"name" : "Market Maker",')
  console.log('"address" : "'+generatedAddress.address+'",')
  console.log('"secret"  : "'+generatedAddress.secret+'"')

}).then(() => {

  return api.generateAddress()

}).then(generatedAddress => {

  console.log("\n\nAlice")
  console.log('"name" : "Alice",')
  console.log('"address" : "'+generatedAddress.address+'",')
  console.log('"secret"  : "'+generatedAddress.secret+'"')

}).then(() => {

  return api.generateAddress()

}).then(generatedAddress => {

  console.log("\n\nBob")
  console.log('"name" : "Bob",')
  console.log('"address" : "'+generatedAddress.address+'",')
  console.log('"secret"  : "'+generatedAddress.secret+'"')

  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)
