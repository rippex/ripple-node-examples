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
  // Alice

  const trustline = {
    "currency": "BRL",
    "counterparty": addresses.issuer.address,
    "limit": "1000000",
    "ripplingDisabled": true, // In case of issuer false
    "frozen": false
  }

  return api.prepareTrustline(addresses.alice.address, trustline).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedTrustline) => {
    
  // console.log(preparedTrustline);

  return api.sign(preparedTrustline.txJSON, addresses.alice.secret)

}).then((signedTrustline) => {

  // console.log(signedTrustline)
  console.log("TX Id:", signedTrustline.id)
  
  return api.submit(signedTrustline.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedTrustline) => {

  // console.log(submittedTrustline);

  if(submittedTrustline.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Yay! Alice's trustline created successfully!")
  
  } else {

    console.log("Something went wrong!", submittedTrustline)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */
  // Bob

  const trustline = {
    "currency": "USD",
    "counterparty": addresses.issuer.address,
    "limit": "1000000",
    "ripplingDisabled": true, // In case of issuer false
    "frozen": false
  }

  return api.prepareTrustline(addresses.bob.address, trustline).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedTrustline) => {
    
  // console.log(preparedTrustline);

  return api.sign(preparedTrustline.txJSON, addresses.bob.secret)

}).then((signedTrustline) => {

  // console.log(signedTrustline)
  console.log("TX Id:", signedTrustline.id)
  
  return api.submit(signedTrustline.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedTrustline) => {

  // console.log(submittedTrustline);

  if(submittedTrustline.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Yay! Bob's trustline created successfully!")
  
  } else {

    console.log("Something went wrong!", submittedTrustline)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */
  // Market Maker

  const trustline = {
    "currency": "USD",
    "counterparty": addresses.issuer.address,
    "limit": "1000000",
    "ripplingDisabled": true, // In case of issuer false
    "frozen": false
  }

  return api.prepareTrustline(addresses.marketmaker.address, trustline).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedTrustline) => {
    
  // console.log(preparedTrustline);

  return api.sign(preparedTrustline.txJSON, addresses.marketmaker.secret)

}).then((signedTrustline) => {

  // console.log(signedTrustline)
  console.log("TX Id:", signedTrustline.id)
  
  return api.submit(signedTrustline.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedTrustline) => {

  // console.log(submittedTrustline);

  if(submittedTrustline.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Yay! Market Makers's trustline created successfully!")
  
  } else {

    console.log("Something went wrong!", submittedTrustline)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */
  // Market Maker

  const trustline = {
    "currency": "BRL",
    "counterparty": addresses.issuer.address,
    "limit": "1000000",
    "ripplingDisabled": true, // In case of issuer false
    "frozen": false
  }

  return api.prepareTrustline(addresses.marketmaker.address, trustline).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedTrustline) => {
    
  // console.log(preparedTrustline);

  return api.sign(preparedTrustline.txJSON, addresses.marketmaker.secret)

}).then((signedTrustline) => {

  // console.log(signedTrustline)
  console.log("TX Id:", signedTrustline.id)
  
  return api.submit(signedTrustline.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedTrustline) => {

  // console.log(submittedTrustline);

  if(submittedTrustline.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Yay! Market Makers's trustline created successfully!")
  
  } else {

    console.log("Something went wrong!", submittedTrustline)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)












