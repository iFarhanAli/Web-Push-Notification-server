"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConnectionQueue = function () {
    function ConnectionQueue() {
        _classCallCheck(this, ConnectionQueue);

        this.queue = new Map();
    }

    _createClass(ConnectionQueue, [{
        key: "addWSConnection",
        value: function addWSConnection(clientId, userId, ws) {
            var key = this.formatKey(clientId, userId);
            this.queue.set(key, ws);
        }
    }, {
        key: "getWSConnection",
        value: function getWSConnection(clientId, userId) {
            var key = this.formatKey(clientId, userId);
            if (this.queue.has(key)) return this.queue.get(key);

            return null;
        }
    }, {
        key: "hasWSConnection",
        value: function hasWSConnection(clientId, userId) {
            var key = this.formatKey(clientId, userId);
            if (this.queue.has(key)) return true;
            return false;
        }
    }, {
        key: "closeWSConnection",
        value: function closeWSConnection(clientId, userId) {
            this.queue.delete(this.formatKey(clientId, userId));
        }
    }, {
        key: "formatKey",
        value: function formatKey(clientId, userId) {
            return clientId + ":" + userId;
        }
    }]);

    return ConnectionQueue;
}();

module.exports = ConnectionQueue;
//# sourceMappingURL=ConnectionQueue.js.map