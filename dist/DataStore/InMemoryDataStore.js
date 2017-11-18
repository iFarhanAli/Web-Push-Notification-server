'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var path = require('path');

var InMemoryDataStore = function () {
    function InMemoryDataStore() {
        _classCallCheck(this, InMemoryDataStore);
    }

    _createClass(InMemoryDataStore, [{
        key: 'verifyUserPassword',
        value: function verifyUserPassword(email, password) {}
    }, {
        key: 'getAccountByEmail',
        value: function getAccountByEmail(email) {
            var data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
                if (err) return Promise.reject('failed to read file', err);
            });
            var arrayOfObjects = JSON.parse(data);

            var client = arrayOfObjects.users.filter(function (elem) {
                return elem.email === email;
            });

            if (client.length == 0) return Promise.reject('Could not find account.');
            return Promise.resolve(client[0]);
        }
    }, {
        key: 'getAccountById',
        value: function getAccountById(id) {
            var data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
                if (err) return Promise.reject('failed to read file', err);
            });
            var arrayOfObjects = JSON.parse(data);

            var client = arrayOfObjects.users.filter(function (elem) {
                return elem.clientId === id;
            });
            if (client.length == 0) return Promise.reject('Could not find account.');
            return Promise.resolve(client[0]);
        }
    }, {
        key: 'createAccount',
        value: function createAccount(email, password, clientID, secret) {

            var data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
                if (err) return Promise.reject('failed to read file', err);
            });
            var arrayOfObjects = JSON.parse(data);
            var matchingEmails = arrayOfObjects.users.filter(function (elem) {
                return elem.email === email;
            });
            if (matchingEmails.length) {
                return Promise.reject('email already exist');
            }
            arrayOfObjects.users.push({
                email: email,
                password: password,
                clientId: clientID,
                secret: secret
            });

            fs.writeFile('./users.json', JSON.stringify(arrayOfObjects), 'utf-8', function (err) {
                if (err) return Promise.reject('failed to write.', err);
            });
            return Promise.resolve(email);
        }
    }]);

    return InMemoryDataStore;
}();

module.exports = InMemoryDataStore;
//# sourceMappingURL=InMemoryDataStore.js.map