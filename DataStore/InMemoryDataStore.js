var fs = require('fs')
var path = require('path');

class InMemoryDataStore {

    verifyUserPassword(email,password){

    }

    getAccountByEmail(email){
        let data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
            if (err) return Promise.reject('failed to read file',err);
        });
        let arrayOfObjects = JSON.parse(data);

        let client = arrayOfObjects.users.filter((elem) => elem.email === email);
        
        if(client.length == 0)
            return Promise.reject('Could not find account.')
        return Promise.resolve(client[0]);
    }
    getAccountById(id) {
        let data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
            if (err) return Promise.reject('failed to read file',err);
        });
        let arrayOfObjects = JSON.parse(data);

        let client = arrayOfObjects.users.filter((elem) => elem.clientId === id);
        if(client.length == 0)
            return Promise.reject('Could not find account.')
        return Promise.resolve(client[0]);
    }

    createAccount(email, password, clientID, secret) {

        let data = fs.readFileSync('./users.json', 'utf-8', function (err, data) {
            if (err) return Promise.reject('failed to read file',err);
        });
        let arrayOfObjects = JSON.parse(data);
        let matchingEmails = arrayOfObjects.users.filter((elem) => elem.email === email);
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
            if (err) return Promise.reject('failed to write.',err);
        });
        return Promise.resolve(email);

    }
}

module.exports = InMemoryDataStore;