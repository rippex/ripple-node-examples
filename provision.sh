#!/bin/bash
echo "Updating OS"
sudo apt-get update -y

echo "Installing Git"
sudo apt-get install -y git-core curl

echo "Installing NVM"
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.6/install.sh | bash
echo "source /home/vagrant/.nvm/nvm.sh" >> /home/vagrant/.profile
source /home/vagrant/.profile

echo "Installing Node V4.5.0"
nvm install v4.5.0
nvm alias default v4.5.0

echo "Installing Node Modules"
cd /vagrant
npm install
