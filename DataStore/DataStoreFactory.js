var InMemoryDataStore = require('../DataStore/InMemoryDataStore');
var MonoDataStore = require('../DataStore/MongoDBDataStore')

class DataStoreFactory {
    getDataStore(dataStore) {
        if (dataStore === 'in_memory')
            return new InMemoryDataStore();
        else
            return new MonoDataStore();
    }
}
module.exports = DataStoreFactory;