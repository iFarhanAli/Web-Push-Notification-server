'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ClientAccountRepository = require('../Repository/ClientAccountRepository');
var CryptoJS = require("crypto-js");
var bcrypt = require('bcrypt');

var clientAccountRepository = new ClientAccountRepository();

var Authentication = function () {
    function Authentication() {
        _classCallCheck(this, Authentication);
    }

    _createClass(Authentication, [{
        key: 'verify',
        value: function verify(clientId, signature) {
            var isMatch = clientAccountRepository.getAccount(clientId).then(function (clientAccount) {
                if (clientAccount == null) return;
                var key = clientAccount.secret;
                var parsedWordArray = CryptoJS.enc.Base64.parse(signature);
                var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
                var bytes = CryptoJS.AES.decrypt(parsedStr, key);
                var plaintext = bytes.toString(CryptoJS.enc.Utf8);
                console.log(plaintext);
                return plaintext == clientId;
            });

            return isMatch;
        }
    }, {
        key: 'login',
        value: function login(email, password) {
            var result = clientAccountRepository.getAccountByEmail(email).then(function (account) {
                if (bcrypt.compareSync(password, account.password)) {
                    return email;
                }
                return null;
            });

            return result;
        }
    }]);

    return Authentication;
}();

module.exports = Authentication;
//# sourceMappingURL=authentication.js.map