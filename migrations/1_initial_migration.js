const Migrations = artifacts.require('Migrations')
const Oracle = artifacts.require('Oracle');

module.exports = deployer => {
  deployer.deploy(Migrations)
  deployer.deploy(Oracle)
}
