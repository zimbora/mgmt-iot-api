# Changelog

# v1.0.7
	Adds call to send mqtt message and gets its response

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
