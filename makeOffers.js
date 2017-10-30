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

  let order = {
    "direction": "sell",
    "quantity": {
      "currency": "USD",
      "counterparty": addresses.issuer.address,
      "value": "1000"
    },
    "totalPrice": {
      "currency": "BRL",
      "counterparty": addresses.issuer.address,
      "value": "3237" //3245
    },
    "passive": false,
    "fillOrKill": false
  }

  return api.prepareOrder(addresses.marketmaker.address, order).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedOrder) => {
    
  // console.log(preparedOrder);

  return api.sign(preparedOrder.txJSON, addresses.marketmaker.secret)

}).then((signedOrder) => {

  // console.log(signedPayment)
  console.log("TX Id:", signedOrder.id)
  
  return api.submit(signedOrder.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedOrder) => {

  // console.log(submittedOrder);

  if(submittedOrder.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Transaction made successfully!")
  
  } else {

    console.log("Something went wrong!", submittedOrder)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */

  let order = {
    "direction": "sell",
    "quantity": {
      "currency": "BRL",
      "counterparty": addresses.issuer.address,
      "value": "3236" //3244
    },
    "totalPrice": {
      "currency": "USD",
      "counterparty": addresses.issuer.address,
      "value": "1000"
    },
    "passive": false,
    "fillOrKill": false
  }

  return api.prepareOrder(addresses.marketmaker.address, order).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedOrder) => {
    
  // console.log(preparedOrder);

  return api.sign(preparedOrder.txJSON, addresses.marketmaker.secret)

}).then((signedOrder) => {

  // console.log(signedPayment)
  console.log("TX Id:", signedOrder.id)
  
  return api.submit(signedOrder.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedOrder) => {

  // console.log(submittedOrder);

  if(submittedOrder.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Transaction made successfully!")
  
  } else {

    console.log("Something went wrong!", submittedOrder)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)












