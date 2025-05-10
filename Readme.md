# mgmt-iot-api

API to interact with mgmt-iot server.
[mgmt-iot](https://github.com/zimbora/mgmt-iot-demo) is a web platform to manage IoT devices. It uses [mgmt-iot-web](https://github.com/zimbora/mgmt-iot-web) npm module.

## Example

```
var api = require('mgmt-iot-api')

api.init({
  domain: "ask for domain",
  auth:{
    token:"ask for token"
  }
})

api.state()
.then(res => console.log(res))
.catch(err => console.log(err))


```
## Requests

	"/api-status"
	"/devices/list"
	"/users"
	"/clients"
	"/mqtt/credentials"
	"/device/${deviceId}/clients"
	"/device/${deviceId}/info"
	"/client/${clientId}/devices"
	"/client/id"
	"/model/'+modelId"
	"/model/${modelId}/firmwares"

## Posts

## Put
	"/model/${modelId}/firmwares"

## Delete
	"/model/${modelId}/firmware"

## Tests

## run all tests
  >> npm run

## run only one test
  >> npx jest --testPathPattern=controller.test.js
