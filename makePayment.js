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
  
  let pathfind = {
    "source": {
      "address": addresses.alice.address
    },
    "destination": {
      "address": addresses.bob.address,
      "amount": {
        "currency": "USD",
        "counterparty": addresses.issuer.address,
        "value": "10"
      }
    }
  }

  return api.getPaths(pathfind).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((paths) => {
  // console.log(JSON.stringify(paths))

  let payment = {
    "source": {
      "address": addresses.alice.address,
      "maxAmount": {
        "value": paths[0].source.maxAmount.value, // "100"
        "currency": "BRL",
        "counterparty": addresses.issuer.address
      }
    },
    "destination": {
      "address": addresses.bob.address,
      "amount": {
        "value":"10",
        "currency": "USD",
        "counterparty": addresses.issuer.address
      }
    }
  };

  return api.preparePayment(addresses.alice.address, payment).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedPayment) => {
    
  // console.log(preparedPayment);

  return api.sign(preparedPayment.txJSON, addresses.alice.secret)

}).then((signedPayment) => {

  // console.log(signedPayment)
  console.log("TX Id:", signedPayment.id)
  
  return api.submit(signedPayment.signedTransaction).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((submittedPayment) => {

  // console.log(submittedPayment);

  if(submittedPayment.resultCode === "tesSUCCESS") {
    // https://ripple.com/build/transactions/#full-transaction-response-list

    console.log("Yay! Transaction made successfully!")
  
  } else {

    console.log("Something went wrong!", submittedPayment)
    process.exit()

  }


  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)












