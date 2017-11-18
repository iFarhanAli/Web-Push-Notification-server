'use strict';

var mongoose = require('mongoose');

ClientAccountSchema = mongoose.Schema({ client_id: Number,
    secret: String,
    name: String,
    email: String });
ClientAccount = mongoose.model('ClientAccount', ClientAccountSchema);
module.exports = ClientAccount;
//# sourceMappingURL=ClientAccount.js.map