# Alfred-angular-module
An angular module implementing alfred's communication protocole

This is an angular service that can connect and communicate with a running alfred server.
## Install
To install, just add the alfred.js file to your project. Then add the alfred module to your app module definition :

`var module = angular.module('myModule', ['alfred']);`

You can then add the service to your angular object :

```
module.controller('myController', function (alfredService) {
  // You can start using the alfred client service
});
```

## Initialization
To initialize, call the init method :

```
module.controller('myController', function (alfredService) {
  alfredService.init({
    name: 'client-name', // name of my alfred client
    host: 'localhost', // host for the alfred server
    port: 80, // the port of the alfred server
    onConnect: null, // function called on websocket connecting
    onDisconnect: null // function called on websocket disconnecting
  });
});
```
