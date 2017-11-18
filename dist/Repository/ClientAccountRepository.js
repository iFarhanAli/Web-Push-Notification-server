'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataStoreFactory = require('../DataStore/DataStoreFactory');
var CONFIG = require('../Config');
var bcrypt = require('bcrypt');
var rand = require("generate-key");

var dataStore = new DataStoreFactory().getDataStore(CONFIG.datastore);

var ClientAccountRepository = function () {
    function ClientAccountRepository() {
        _classCallCheck(this, ClientAccountRepository);
    }

    _createClass(ClientAccountRepository, [{
        key: 'getAccountByEmail',
        value: function getAccountByEmail(email) {
            var account = dataStore.getAccountByEmail(email).then(function (data) {
                return data;
            });
            return account;
        }
    }, {
        key: 'getAccount',
        value: function getAccount(clientId) {
            var account = dataStore.getAccountById(clientId).then(function (data) {
                return data;
            });
            return account;
        }
    }, {
        key: 'createAccount',
        value: function createAccount(email, password) {
            var passwordHash = bcrypt.hashSync(password, 10);
            var clientID = rand.generateKey();
            var secret = rand.generateKey();
            return dataStore.createAccount(email, passwordHash, clientID, secret).then(function (data) {
                return data;
            }).catch(function (error) {
                console.log(error);
            });
            ;
        }
    }]);

    return ClientAccountRepository;
}();

module.exports = ClientAccountRepository;
//# sourceMappingURL=ClientAccountRepository.js.map