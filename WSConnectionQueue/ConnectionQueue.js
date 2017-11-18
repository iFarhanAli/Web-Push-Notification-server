 class ConnectionQueue{

    constructor(){
        this.queue = new Map();
    }

    addWSConnection(clientId, userId, ws){
        var key = this.formatKey(clientId, userId);
        this.queue.set(key, ws);
    }

    getWSConnection (clientId, userId){
        var key = this.formatKey(clientId, userId);
        if (this.queue.has(key))
            return this.queue.get(key);

        return null;
    }

    hasWSConnection(clientId, userId){
        var key = this.formatKey(clientId, userId);
        if(this.queue.has(key))
            return true;
        return false;
    }

    closeWSConnection(clientId, userId){
        this.queue.delete(this.formatKey(clientId, userId));
    }

    formatKey(clientId, userId){
        return clientId +":"+userId;
    }
}
module.exports = ConnectionQueue;