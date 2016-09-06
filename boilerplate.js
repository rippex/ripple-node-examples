'use strict';
const RippleAPI = require('ripple-lib').RippleAPI;

const api = new RippleAPI({

  //server: 'wss://s1.ripple.com' // Public rippled server
  server: 'wss://s.altnet.rippletest.net:51233'

});

api.on('error', (errorCode, errorMessage) => {

  console.log(errorCode + ': ' + errorMessage)

});

api.on('connected', () => {

  console.log('connected')

});

api.on('disconnected', (code) => {

  console.log('disconnected, code:', code);
  process.exit();

});

api.connect().then(() => {
	
  /* insert code here */

}).then(() => {

  return api.disconnect();

}).catch(console.error);