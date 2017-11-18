'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CONFIG = require('../Config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ClientAccount = require('../models/ClientAccount');

var MongoDBDataStore = function () {
    function MongoDBDataStore() {
        _classCallCheck(this, MongoDBDataStore);

        mongoose.connect(CONFIG.mongo_url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
    }

    _createClass(MongoDBDataStore, [{
        key: 'getAccountById',
        value: function getAccountById(id) {

            var account = ClientAccount.findOne({ 'client_id': id }, function (err, acc) {
                if (err) console.log('Data fetching failed: %s', err);
                if (acc == null) Promise.resolve(null);
                return acc;
            });

            return account;
        }
    }]);

    return MongoDBDataStore;
}();

module.exports = MongoDBDataStore;
//# sourceMappingURL=MongoDBDataStore.js.map