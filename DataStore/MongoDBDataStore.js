const CONFIG = require('../Config');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var ClientAccount = require('../models/ClientAccount')

class MongoDBDataStore{

    constructor(){
        mongoose.connect(CONFIG.mongo_url);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
    }

    getAccountById(id){

         var account = ClientAccount.findOne({'client_id':id}, function(err, acc) {
             if(err)
                 console.log('Data fetching failed: %s',err);
             if(acc == null)
                 Promise.resolve(null);
            return acc;
        });

         return account;
}

}

module.exports = MongoDBDataStore;