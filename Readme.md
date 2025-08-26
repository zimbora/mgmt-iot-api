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
	"/users"
	"/clients"
	"/mqtt/credentials"
	"/client/${clientId}/devices"
	"/client/id?email=x@gmail.com"
	"/models"
	"/model/'+modelId"
	"/model/${modelId}/firmwares"
	"/devices/list"
	"/device/${deviceId}/clients"
	"/device/:deviceId/info" (!!don't use it, use "/device/:deviceId/project/info" instead)
	"/device/:deviceId/project/info"
	"/device/:deviceId/project/logs?sensor=x"
	"/device/:deviceId/fw/info"
	"/device/:deviceId/fw/logs?sensor=x"
	"/device/:deviceId/model/info"
	"/device/:deviceId/model/logs?sensor=x"
	"/device/${deviceId}/mqtt/message" 

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

## Tests coverage

 check API state
    ✓ should return the correct result (116 ms)
  test Devices API
    ✓ getDevicesList (12 ms)
    ✓ getChangedDevices (11 ms)
    ✓ getChangedDevicesPermissions (11 ms)
    ✓ getDeviceClients (13 ms)
    ✓ getDeviceId (10 ms)
    ✓ getDevicePSK (9 ms)
    ✓ getInfo (32 ms)
    ✓ getLogs (124 ms)
    ✓ getProjectInfo (31 ms)
    ✓ getFwInfo (28 ms)
    ✓ getFwLogs (15 ms)
    ✓ getSensorLogs (132 ms)
    ✓ getModelInfo (10 ms)
    ✓ sendMqttMessage (110 ms)
    ✓ sendMqttMessage (189 ms)
    ○ skipped getSensorInfo
  test Users API
    ✓ getUsers (10 ms)
  test Clients API
    ✓ getClients (24 ms)
    ✓ getClientDevices (24 ms)
    ✓ getClientId (11 ms)
  test Models API
    ✓ getModels (11 ms)
    ✓ getModelInfo (10 ms)
    ✓ getModelFirmwares (12 ms)
    ✓ uploadFirmware (813 ms)
    ✕ deleteFirmware (76 ms)
  test MQTT credentials API
    ✓ getMQTTCredentials (9 ms)
