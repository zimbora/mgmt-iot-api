const assert = require('assert');
var moment = require('moment');
const fs = require('fs');
const FormData = require('form-data');

var api = require('../index.js')
var config = require('../config')

var deviceId = 1;
var modelId = 4;
var clientId = 5;
var uid = 'uid:a8032ad41f38'
var email = "lucas.ua.eet@gmail.com";
var pathToFile = "./tests/"
var filename = "demo.bin"

var firmwareId = 0;

api.init({
  domain : config.domain,
  auth:{
    token : config.api_token
  },
},config.debug_axios)

jest.setTimeout(1500); // 1.5 seconds


describe('check API state', () => {

  it('should return the correct result', async () => {

    const res = await api.state();
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("status");
    expect(res?.status).toBe("ok");
    
  });
});


describe('test Devices API', () => {

  it('getDevicesList', async () => {
    const res = await api.getDevices();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("project");
    expect(res[0]).toHaveProperty("status");
    expect(res[0]).toHaveProperty("project_id");
    expect(res[0]).toHaveProperty("model_id");
    expect(res[0]).toHaveProperty("tech");
    expect(res[0]).toHaveProperty("model");
  });

  it('getChangedDevices', async () => {
    const modelId = 4;
    const updatedAt = "2025-05-02T14:47:53.000Z";
    const res = await api.getChangedDevices(modelId, updatedAt);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("project");
    expect(res[0]).toHaveProperty("status");
    expect(res[0]).toHaveProperty("project_id");
    expect(res[0]).toHaveProperty("model_id");
    expect(res[0]).toHaveProperty("tech");
    expect(res[0]).toHaveProperty("model");
  });

  it('getChangedDevicesPermissions', async () => {
    const updatedAt = "2025-05-02T14:47:53.000Z";
    const res = await api.getChangedDevicesPermissions(updatedAt);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("client_id");
    expect(res[0]).toHaveProperty("device_id");
    expect(res[0]).toHaveProperty("level");
    expect(res[0]).toHaveProperty("createdAt");
    expect(res[0]).toHaveProperty("updatedAt");
  });

  it('getDeviceClients', async () => {
    const res = await api.device.getClients(deviceId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getDeviceId', async () => {
    const res = await api.device.getId(uid);
    expect(res).toHaveProperty("id");
  });

  it('getDevicePSK', async () => {
    const res = await api.device.getPsk(deviceId);
    expect(res).toHaveProperty("psk");
  });

  it('getInfo', async () => {
    const res = await api.device.getInfo(deviceId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("model_name");
    expect(res).toHaveProperty("device");
    expect(res).toHaveProperty("project");
    expect(res).toHaveProperty("fw");
    expect(res).toHaveProperty("associated");
    
    // Check device object structure
    expect(res.device).toHaveProperty("id");
    expect(res.device).toHaveProperty("uid");
    expect(res.device).toHaveProperty("name");
    expect(res.device).toHaveProperty("status");
    expect(res.device).toHaveProperty("project_id");
    expect(res.device).toHaveProperty("model_id");
    expect(res.device).toHaveProperty("createdAt");
    expect(res.device).toHaveProperty("updatedAt");
    expect(res.device).toHaveProperty("tech");
    expect(res.device).toHaveProperty("version");
    expect(res.device).toHaveProperty("app_version");
    expect(res.device).toHaveProperty("accept_release");
    expect(res.device).toHaveProperty("remote_settings");
    expect(res.device).toHaveProperty("local_settings");
    expect(res.device).toHaveProperty("associatedDevice");
    expect(res.device).toHaveProperty("settings_ref");
    
    // Check project object structure
    expect(res.project).toHaveProperty("id");
    expect(res.project).toHaveProperty("device_id");
    expect(res.project).toHaveProperty("model");
    expect(res.project).toHaveProperty("logs_table");
    expect(res.project).toHaveProperty("ar");
    expect(res.project).toHaveProperty("alarms");
    expect(res.project).toHaveProperty("js_program");
    expect(res.project).toHaveProperty("setpoints");
    expect(res.project).toHaveProperty("settings_ref");
    expect(res.project).toHaveProperty("ar_ref");
    expect(res.project).toHaveProperty("alarms_ref");
    expect(res.project).toHaveProperty("js_program_ref");
    expect(res.project).toHaveProperty("setpoints_ref");
    expect(res.project).toHaveProperty("createdAt");
    expect(res.project).toHaveProperty("updatedAt");
    
    // Check fw object structure
    expect(res.fw).toHaveProperty("id");
    expect(res.fw).toHaveProperty("device_id");
    expect(res.fw).toHaveProperty("logs_table");
    expect(res.fw).toHaveProperty("uptime");
    expect(res.fw).toHaveProperty("heapFree");
    expect(res.fw).toHaveProperty("rssi");
    expect(res.fw).toHaveProperty("wifi");
    expect(res.fw).toHaveProperty("mqtt");
    expect(res.fw).toHaveProperty("keepalive");
    expect(res.fw).toHaveProperty("log");
    expect(res.fw).toHaveProperty("createdAt");
    expect(res.fw).toHaveProperty("updatedAt");
  });
    
  it('getLogs', async () => {
    
    const res = await api.device.getLogs(deviceId, "status");
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("status");
    expect(res[0]).toHaveProperty("createdAt");
  }, 30000); // timeout in milliseconds (e.g., 30 seconds)

  it('getProjectInfo', async () => {
    const res = await api.device.getProjectInfo(deviceId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("uid");
    expect(res).toHaveProperty("status");
    expect(res).toHaveProperty("model_id");
    expect(res).toHaveProperty("tech");
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("device_id");
    expect(res).toHaveProperty("model");
    expect(res).toHaveProperty("logs_table");
    expect(res).toHaveProperty("ar");
    expect(res).toHaveProperty("alarms");
    expect(res).toHaveProperty("js_program");
    expect(res).toHaveProperty("setpoints");
    expect(res).toHaveProperty("settings_ref");
    expect(res).toHaveProperty("ar_ref");
    expect(res).toHaveProperty("alarms_ref");
    expect(res).toHaveProperty("js_program_ref");
    expect(res).toHaveProperty("setpoints_ref");
    expect(res).toHaveProperty("createdAt");
    expect(res).toHaveProperty("updatedAt");
    expect(res).toHaveProperty("project");
  });

  it('getFwInfo', async () => {
    const res = await api.device.getFwInfo(deviceId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("device_id");
    expect(res).toHaveProperty("uptime");
    expect(res).toHaveProperty("heapFree");
    expect(res).toHaveProperty("rssi");
    expect(res).toHaveProperty("wifi");
    expect(res).toHaveProperty("mqtt");
    expect(res).toHaveProperty("keepalive");
    expect(res).toHaveProperty("log");
    expect(res).toHaveProperty("createdAt");
    expect(res).toHaveProperty("updatedAt");
  });

  it('getFwLogs', async () => {
    
    const res = await api.device.getFwLogs(deviceId, null);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("device_id");
    expect(res[0]).toHaveProperty("uptime");
    expect(res[0]).toHaveProperty("heapFree");
    expect(res[0]).toHaveProperty("rssi");
    expect(res[0]).toHaveProperty("wifi");
    expect(res[0]).toHaveProperty("mqtt");
    expect(res[0]).toHaveProperty("keepalive");
    expect(res[0]).toHaveProperty("log");
    expect(res[0]).toHaveProperty("createdAt");
    
  }, 30000); // timeout in milliseconds (e.g., 30 seconds)

  it.skip('getSensorInfo', async () => {
    const res = await api.device.getSensorInfo(deviceId);
    expect(typeof res).toBe('object');
  });

  it('getSensorLogs', async () => {
    
    const res = await api.device.getSensorLogs(deviceId, "status");
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("status");
    expect(res[0]).toHaveProperty("createdAt");
    
  }, 30000); // timeout in milliseconds (e.g., 30 seconds)

  it('getModelInfo', async () => {
    const res = await api.device.getModelInfo(deviceId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("createdAt");
    expect(res).toHaveProperty("updatedAt");
  });

  it('sendMqttMessage', async () => {
    
    const res = await api.device.sendMqttMessage(
      deviceId, 
      "settings/keepalive/set",
      "{\"period\":\"60\"}",
      1,
      0,
    );
    
  }, 30000); // timeout in milliseconds (e.g., 30 seconds)

  it('sendMqttMessage', async () => {
    
    const res = await api.device.sendMqttMessage(
      7, 
      "settings/keepalive/get",
      "",
      1,
      0,
    );
    
    expect(typeof res).toBe('string');

  }, 30000); // timeout in milliseconds (e.g., 30 seconds)

  it('getObservations', async () => {
    const res = await api.device.getObservations(deviceId);
    expect(Array.isArray(res)).toBe(true);
    if(res && res.length > 0) {
      expect(res[0]).toHaveProperty("id");
      expect(res[0]).toHaveProperty("device_id");
      expect(res[0]).toHaveProperty("objectId");
      expect(res[0]).toHaveProperty("objectInstanceId");
      expect(res[0]).toHaveProperty("resourceId");
      expect(res[0]).toHaveProperty("observing");
      expect(res[0]).toHaveProperty("observationTkn");
    }
  });

  it('getObservationStatus', async () => {
    const objectId = 3;
    const objectInstanceId = 0;
    const resourceId = 5700;
    
    const res = await api.device.getObservationStatus(deviceId, objectId, objectInstanceId, resourceId);
    expect(typeof res).toBe('object');
    if(res) {
      expect(res).toHaveProperty("id");
      expect(res).toHaveProperty("observing");
      expect(res).toHaveProperty("observationTkn");
    }
    
  });

  it('updateObservationStatus', async () => {
    const objectId = 3;
    const objectInstanceId = 0;
    const resourceId = 5700;
    const observing = true;
    const token = "test123";
    
    const res = await api.device.updateObservationStatus(deviceId, objectId, objectInstanceId, resourceId, observing, token);
    expect(typeof res).toBe('object');
    
  });

});

describe('test Users API', () => {

  it('getUsers', async () => {
    const res = await api.getUsers();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("type");
    expect(res[0]).toHaveProperty("password");
    expect(res[0]).toHaveProperty("level");
  });

});

describe('test Clients API', () => {

  it('getClients', async () => {
    const res = await api.getClients(deviceId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("nick");
    expect(res[0]).toHaveProperty("user_id");
    expect(res[0]).toHaveProperty("type");
  });

  it('getClientDevices', async () => {
    const res = await api.client.getDevices(clientId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getClientId', async () => {
    const res = await api.client.getClientId(email);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("client_id");
  });

});

describe('test Models API', () => {

  it('getModels', async () => {
    const res = await api.getModels();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("name");
  });

  it('getModelInfo', async () => {
    const res = await api.model.getInfo(modelId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("description");
    expect(res).toHaveProperty("model_table");
    expect(res).toHaveProperty("logs_table");
    expect(res).toHaveProperty("fw_enabled");
    expect(res).toHaveProperty("ar_enabled");
    expect(res).toHaveProperty("alarms_enabled");
    expect(res).toHaveProperty("js_code_enabled");
    expect(res).toHaveProperty("createdAt");
    expect(res).toHaveProperty("updatedAt");
  });

  it('getModelFirmwares', async () => {
    const res = await api.model.getFirmwares(modelId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("filename");
    expect(res[0]).toHaveProperty("originalname");
    expect(res[0]).toHaveProperty("version");
    expect(res[0]).toHaveProperty("app_version");
    expect(res[0]).toHaveProperty("build_release");
    expect(res[0]).toHaveProperty("model_id");
    expect(res[0]).toHaveProperty("token");
    expect(res[0]).toHaveProperty("createdAt");
    expect(res[0]).toHaveProperty("updatedAt");
    
  });

  it('uploadFirmware', async () => {

    const form = new FormData();
    
    form.append('file', fs.createReadStream(pathToFile+filename));
    let res = await api.model.uploadFirmware(modelId,form,filename,"0.0.0","0.0.0");
    expect(typeof res).toBe('object');

    if(res){
      firmwareId = res?.insertId;
    }
    
  });

  it('deleteFirmware', async () => {

    res = await api.model.deleteFirmware(modelId, firmwareId);
    expect(typeof res).toBe('object');
    
  });

});

describe('test MQTT credentials API', () => {

  it('getMQTTCredentials', async () => {
    const res = await api.getMQTTCredentials();
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("nick");
    expect(res).toHaveProperty("type");
    expect(res).toHaveProperty("password");
  });

});


