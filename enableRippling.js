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

const addresses = require('./addresses').addresses;

api.connect().then(() => {

  /* begin custom code ------------------------------------ */

  let settings = {
    "defaultRipple": true
  }

  return api.prepareSettings(addresses.issuer.address, settings).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedSettings) => {
    
  // console.log(preparedSettings);

  return api.sign(preparedSettings.txJSON, addresses.issuer.secret)

}).then((signedSettings) => {

  // console.log(signedSettings)
  console.log("TX Id:", signedSettings.id)
  
  return api.submit(signedSettings.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedSettings) => {

  // console.log(submittedSettings);

  if(submittedSettings.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Rippling enabled!")
    process.exit()
  
  } else {

    console.log("Something went wrong!", submittedPayment)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)












