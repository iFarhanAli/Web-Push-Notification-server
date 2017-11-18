# Web-Push-Notification-server
The server uses websocket to communicate with client and app server.

# Account Registration
Go to register link and generate App ID and App secret. Use the credentials to setup client and server.

# How it works
For client side see example test.html 
In your app server implement callback api, which is provided to client, and return signature(client id) encrypted by PNS app secret.
