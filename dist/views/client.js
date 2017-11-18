"use strict";
"strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PNS = function () {
    function PNS() {
        _classCallCheck(this, PNS);
    }

    _createClass(PNS, [{
        key: "connect",
        value: function connect(appID, userID, callback) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var myWebSocket = new WebSocket("ws://localhost:9090?id=" + appID + "&sig=" + this.responseText + "&userId=" + userID);
                    myWebSocket.onmessage = function (evt) {
                        $("#alert").html(JSON.parse(evt.data).x);
                        $("#alert").show();
                    };
                }
            };
            xhttp.open("GET", callback, true);
            xhttp.send();
        }
    }]);

    return PNS;
}();
//# sourceMappingURL=client.js.map