const DataStoreFactory = require('../DataStore/DataStoreFactory');
const CONFIG  = require('../Config');
const bcrypt = require('bcrypt');
var rand = require("generate-key");



var dataStore = new DataStoreFactory().getDataStore(CONFIG.datastore)
class ClientAccountRepository{

    getAccountByEmail(email){
        var account =  dataStore.getAccountByEmail(email)
            .then(function (data) {
                return data;
            });
        return account;
    }

    getAccount(clientId){
        var account =  dataStore.getAccountById(clientId)
            .then(function (data) {
            return data;
        });
        return account;
    }

    createAccount(email, password){
        let passwordHash = bcrypt.hashSync(password, 10);
        let clientID = rand.generateKey();
        let secret = rand.generateKey();
        return dataStore.createAccount(email, passwordHash, clientID, secret).then(function (data) {
            return data;
        }).catch((error) => {
            console.log(error)
        });
        ;
    }
}
module.exports = ClientAccountRepository;