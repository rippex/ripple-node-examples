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
  let payment = {
    "source": {
      "address": addresses.issuer.address,
      "maxAmount": {
        "value": "50", // "100"
        "currency": "XRP"
      }
    },
    "destination": {
      "address": addresses.alice.address,
      "amount": {
        "value":"50",
        "currency": "XRP"
      }
    }
  };

  return api.preparePayment(addresses.issuer.address, payment).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedPayment) => {
    
  // console.log(preparedPayment);

  return api.sign(preparedPayment.txJSON, addresses.issuer.secret)

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

    console.log("Yay! Transaction made successfully to Alice!")
  
  } else {

    console.log("Something went wrong with Alice's payment!", submittedPayment)
    process.exit()

  }

  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */
  // Bob

  let payment = {
    "source": {
      "address": addresses.issuer.address,
      "maxAmount": {
        "value": "50", // "100"
        "currency": "XRP"
      }
    },
    "destination": {
      "address": addresses.bob.address,
      "amount": {
        "value":"50",
        "currency": "XRP"
      }
    }
  };

  return api.preparePayment(addresses.issuer.address, payment).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedPayment) => {
    
  // console.log(preparedPayment);

  return api.sign(preparedPayment.txJSON, addresses.issuer.secret)

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

    console.log("Yay! Transaction made successfully to Bob!")
  
  } else {

    console.log("Something went wrong with Bob's payment!", submittedPayment)
    process.exit()

  }

  /* end custom code -------------------------------------- */

}).then(() => {

  /* begin custom code ------------------------------------ */
  // Market Maker
  
  let payment = {
    "source": {
      "address": addresses.issuer.address,
      "maxAmount": {
        "value": "50", // "100"
        "currency": "XRP"
      }
    },
    "destination": {
      "address": addresses.marketmaker.address,
      "amount": {
        "value":"50",
        "currency": "XRP"
      }
    }
  };

  return api.preparePayment(addresses.issuer.address, payment).catch((error) => {
    
    console.log("Error:", error)
    process.exit()

  })

}).then((preparedPayment) => {
    
  // console.log(preparedPayment);

  return api.sign(preparedPayment.txJSON, addresses.issuer.secret)

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

    console.log("Yay! Transaction made successfully Market Maker!")
  
  } else {

    console.log("Something went wrong with Market Maker's payment!", submittedPayment)
    process.exit()

  }

  /* end custom code -------------------------------------- */

}).then(() => {

  return api.disconnect()

}).catch(console.error)












