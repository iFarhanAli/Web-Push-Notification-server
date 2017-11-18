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
        value: function addWSConnection(userId, ws) {
            this.queue.set(userId, ws);
        }
    }, {
        key: "getWSConnection",
        value: function getWSConnection(userId) {
            if (this.queue.has(userId)) return this.queue.get(userId);

            return null;
        }
    }, {
        key: "closeWSConnection",
        value: function closeWSConnection(userId) {
            this.queue.delete(userId);
        }
    }]);

    return ConnectionQueue;
}();

module.exports = ConnectionQueue;
//# sourceMappingURL=ConnectionQueue.js.map