var ClientAccountRepository = require('../Repository/ClientAccountRepository')
var CryptoJS = require("crypto-js");
const bcrypt = require('bcrypt');

var clientAccountRepository = new ClientAccountRepository;
class Authentication{

    constructor(){

    }

    verify(clientId, signature){
        var isMatch = clientAccountRepository.getAccount(clientId)
            .then( (clientAccount) => {
                if(clientAccount == null)
                    return;
            var key = clientAccount.secret;
            var parsedWordArray = CryptoJS.enc.Base64.parse(signature);
            var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
            var bytes  = CryptoJS.AES.decrypt(parsedStr, key);
            var plaintext = bytes.toString(CryptoJS.enc.Utf8);
            console.log(plaintext);
            return plaintext == clientId;
        });

        return isMatch;
    }

    login(email, password){
        let result = clientAccountRepository.getAccountByEmail(email)
            .then((account) =>{
            if(bcrypt.compareSync(password, account.password)){
                return email;
            }
            return null;
        });

        return result;
    }
}

module.exports = Authentication;