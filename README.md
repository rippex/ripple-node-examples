#Ripple Examples
Please mind, this is only a quick and dirty example of how to do multicurrency transactions in Ripple.

#Prerequisites:
- Git
- Node version 0.12, version 4.x, or higher

#Non Vagrant Users:
1 - Make sure you are compliant with the prereqs
2 - Clone repo
3 - Cd into it
4 - Run node programName.js

#Vagrant Users:
1 - Clone repo and cd into it
3 - vagrant up
4 - vagrant ssh
5 - Cd into /vagrant
6 - Run node programName.js

#Recipe:
- Get Issuer Account
-- Go to https://ripple.com/build/ripple-test-net/
-- Register Issuers account details in addresses.js
- Create additional Addresses
-- Execute "node createAddresses.js"
-- Register output in addresses.js
- Activate Addresses
-- Execute "node activateAddresses.js"
- Enable Rippling for Issuer
-- Execute "node enableRippling.js"
- Create Trustlines
-- Execute "node activateTrustlines.js"
- Fund Addresses
-- Execute "node fundAddresses.js"
- Make Offers
-- Execute "node makeOffers.js"
- Make Payment
-- Execute "node makePayment.js"

#Macro Process:
![alt tag](https://github.com/rippex/ripple-node-examples/blob/master/flow.png)

#To create Issuer Account:
https://ripple.com/build/ripple-test-net/

#References:
- Ripple API: https://ripple.com/build/rippleapi/
- Ripple Begginers Guide: https://ripple.com/build/rippleapi-beginners-guide/

#Important to take a look also:
- Destination Tag
- Invoice ID
- Partial Payments
- Sendmax
- Deliver Min
- Memo