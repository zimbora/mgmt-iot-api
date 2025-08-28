# Changelog

# v1.0.11
	New methods:
	 - getObservations
	Adds support to retrieve all observations for a device from the lwm2m project

# v1.0.10
	New methods:
	 - getObservationStatus
	 - updateObservationStatus
	Supports LwM2M observation management for devices in the lwm2m project

# v1.0.9
	New methods: 
	 - getId, 
	 - getPSK
	Removes:
	 - getProjectLogs
	 - getModelLogs
	Fixes:
	 - sendMqttMessage

# v1.0.8
	Adds sensor info and sensor logs support
	Adds getLogs method to device API without fw prefix
	Updates API test expectations to match new response structures
	tests/api.test.js: replaces fw_version by version
	Fix getModelInfo and getModelFirmwares test property expectations

# v1.0.7
	Adds call to send mqtt message and gets its response
	Compatible with mgmt-iot-web >= v1.0.60

# v1.0.6
	recovers call /device/${deviceId}/info for dashboard compatibility
	Compatible with mgmt-iot-web v1.0.59

# v1.0.5
	Compatible with mgmt-iot-web v1.0.58
	supports new api calls:
	- device/:deviceId/project/info
	- device/:deviceId/project/logs?sensor=x
	- device/:deviceId/fw/info
	- device/:deviceId/fw/logs?sensor=x
	- device/:deviceId/model/info
	- device/:deviceId/model/logs?sensor=x
	removes api calls:
	- device/:deviceId/info

# v1.0.4
	new methods:
		- getChangedDevicesPermissions(updateAt)

# v1.0.3
	new methods:
		- getChangedDevices(modelId,updateAt)

# v1.0.2
	new methods:
		- getModels

# v1.0.1
	new methods:
		- getClientId(email)
		- uploadFirmware
		- deleteFirmware

# v1.0.0
	- Just supports requests
