"strict"
class PNS{
    constructor(){
    }

    connect(appID, userID, callback){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myWebSocket = new WebSocket("ws://localhost:9090?id="+appID+"&sig="+this.responseText+"&userId="+userID);
                myWebSocket.onmessage = function(evt) {
                    $("#alert").html(JSON.parse(evt.data).x);
                    $("#alert").show();

                };
            }
        };
        xhttp.open("GET", callback, true);
        xhttp.send();
    }
}