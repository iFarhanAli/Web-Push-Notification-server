const CONFIG  = require('./Config')
var ConnectionQueue = require('./WSConnectionQueue/ConnectionQueue')
var Authentication = require('./authenticate/authentication')
var WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ port: CONFIG.websocketPort});

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var index = require('./routes/index');
app.use(session({secret: 'secret1234'}));


var clientSockets = new ConnectionQueue();
var authenticator = new Authentication();
var server = app.listen(CONFIG.serverPort, function () {
    var host = CONFIG.host
    var port = server.address().port
    console.log("Websocket event broadcaster REST API listening on http://%s:%s", host, port)
});


wss.on('connection', function(ws,req) {

    var url_parts = require('url').parse(req.url,true);
    authenticator.verify(url_parts.query.id, url_parts.query.sig)
        .then(function (match) {
            if(match)
                clientSockets.addWSConnection(url_parts.query.id, url_parts.query.userId, ws);
            else
                ws.close();
    });

});

wss.on('close', function (webSocketConnection, closeReason, description) {
   console.log(closeReason+' closing.')
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.post('/notify/:client_id/:user_id/update', function (req, res) {

    var user_id = req.params.user_id;
    var client_id = req.params.client_id;
    if(clientSockets.hasWSConnection(client_id, user_id)){
        var clientWS = clientSockets.getWSConnection(client_id, user_id);
        clientWS.send(JSON.stringify({ x: 5, y: 6 }));
    }

    res.sendStatus(200);
});

app.get('/test',function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sig = authenticator.encrypt('a8LiszAGwpNMsWIk', 'fI0vFE38QGzz8EEE');
    res.send(sig);
});

app.use('/',index);
module.exports = app;
