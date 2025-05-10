const assert = require('assert');
var moment = require('moment');
const fs = require('fs');
const FormData = require('form-data');

var api = require('../index.js')
var config = require('../config')

var deviceId = 1;
var modelId = 4;
var clientId = 5;
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

jest.setTimeout(1000); // 10 seconds

/*
describe('check API state', () => {

  it('should return the correct result', async () => {

    const res = await api.state()
    expect(res).toHaveProperty("status");
    expect(res?.status).toBe("ok");
    
  });
});
*/

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

  it('getDeviceClients', async () => {
    const res = await api.device.getClients(deviceId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getDeviceInfo', async () => {
    const res = await api.device.getInfo(deviceId);
    expect(typeof res).toBe('object');
    expect(res).toHaveProperty("uid");
    expect(res).toHaveProperty("model_id");
    expect(res).toHaveProperty("tech");
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("device_id");
    expect(res).toHaveProperty("fw_version");
    expect(res).toHaveProperty("app_version");
    expect(res).toHaveProperty("model");
    expect(res).toHaveProperty("logs_table");
    expect(res).toHaveProperty("settings");
    expect(res).toHaveProperty("ar");
    expect(res).toHaveProperty("alarms");
    expect(res).toHaveProperty("js_program");
    expect(res).toHaveProperty("setpoints");
    expect(res).toHaveProperty("fw_release");
    expect(res).toHaveProperty("settings_ref");
    expect(res).toHaveProperty("ar_ref");
    expect(res).toHaveProperty("alarms_ref");
    expect(res).toHaveProperty("js_program_ref");
    expect(res).toHaveProperty("setpoints_ref");
    expect(res).toHaveProperty("fota_tries");
    expect(res).toHaveProperty("project");
  });

  /*
  it('getLayout', async () => {

    const res = await api.map.getSVG(floor_id);
    expect(res).toHaveProperty("svg_info");
  });

  it('getSVG', async () => {

    const res = await api.map.getSVG(floor_id);
    expect(res).toHaveProperty("svg_info");
  });

  it('getItemsBySector', async () => {

    const res = await api.map.getItemsBySector(floor_id);
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getMqttConfig', async () => {

    const res = await api.map.getMqttConfig(floor_id);
    expect(res).toHaveProperty("host");
    expect(res).toHaveProperty("password");
    expect(res).toHaveProperty("port");
    expect(res).toHaveProperty("user");
    //expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getWiFiCredentials', async () => {

    const res = await api.map.getWiFiCredentials(floor_id);
    expect(res).toHaveProperty("ssid");
    expect(res).toHaveProperty("password");
  });

  it('getWorkerProcess', async () => {

    const res = await api.map.getWorkerProcess(floor_id);
    expect(res).not.toBe(null);
    expect(res).toHaveProperty("uptime");
    expect(res).toHaveProperty("memory");
    expect(res).toHaveProperty("online_anchors");
    expect(res).toHaveProperty("online_nodes");
    expect(res).toHaveProperty("all_nodes");
  });

  it('getControllerInfo', async () => {

    const res = await api.map.getControllerInfo(floor_id);
    expect(res).toHaveProperty("id");
    expect(res).toHaveProperty("user_type_type");
    expect(res).toHaveProperty("name");
    expect(res).toHaveProperty("macAddress");
    expect(res).toHaveProperty("api_token");
    expect(res).toHaveProperty("ws_token");

    expect(res.user_type_type).toBe("controller")
    expect(res.Floor_id).toBe(floor_id)
  });
  */
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
    expect(res[0]).toHaveProperty("token");
    expect(res[0]).toHaveProperty("api_token");
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

describe.only('test Models API', () => {

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
  });

  it('getModelFirmwares', async () => {
    const res = await api.model.getFirmwares(modelId);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("filename");
    expect(res[0]).toHaveProperty("originalname");
    expect(res[0]).toHaveProperty("fw_version");
    expect(res[0]).toHaveProperty("app_version");
    expect(res[0]).toHaveProperty("fw_release");
    expect(res[0]).toHaveProperty("model_id");
    expect(res[0]).toHaveProperty("token");
    
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

/*
describe('test Map Node API', () => {
  it('getInfo', async () => {

    let mac_address = "3a:3b:a7:57:7c:7d"
    const res = await api.map.node.getInfo(floor_id,mac_address);
    expect(res).toHaveProperty("node_id");
    expect(res).toHaveProperty("type");
    //expect(res).toHaveProperty("level");
    expect(res).toHaveProperty("macAddress");

  });

  it('getMacAddress', async () => {
    let ip = "10.168.1.1";
    const res = await api.map.node.getMacAddress(floor_id,ip);
    expect(res).toHaveProperty("macAddress");
  });

  it('get Node History', async () => {

    let init_time = moment().subtract(7, 'days').unix();
    let end_time = moment().unix();
    let mac_address = "3a:3b:a7:57:7c:7d"
    const res = await api.map.node.getHistory(floor_id,mac_address,init_time, end_time);
    expect(Array.isArray(res)).toBe(true);
  });

});

describe('test Map Sniffers API', () => {
  it('get', async () => {

    const res = await api.map.sniffers.get(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toHaveProperty("id");
    expect(res[0]).toHaveProperty("sniffer_id");
    expect(res[0]).toHaveProperty("identifier");
    expect(res[0]).toHaveProperty("pos_x");
    expect(res[0]).toHaveProperty("pos_y");
    expect(res[0]).toHaveProperty("IP");
    expect(res[0]).toHaveProperty("Floor_id");
    res.forEach((sniffer) => expect(sniffer.Floor_id).toBe(floor_id));

  });

  it('getSettings', async () => {

    const res = await api.map.sniffers.getSettings(floor_id);
    expect(res.Floor_id).toBe(floor_id);
    expect(res).toHaveProperty("host");
    expect(res).toHaveProperty("port");

  });

  it('online', async () => {

    const res = await api.map.sniffers.online(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('groups', async () => {

    const res = await api.map.sniffers.groups(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

});

describe('test Map Data API', () => {

  it('getActualPositions', async () => {

    const res = await api.map.data.getActualPositions(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getValidatedNodes', async () => {

    const res = await api.map.data.getValidatedNodes(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getHistoryCounter', async () => {

    const res = await api.map.data.getHistoryCounter(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getMovements', async () => {

    let from = moment().subtract(1, "days").unix();
    let to = moment().unix();
    const res = await api.map.data.getMovements(floor_id,from,to);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getDetectedNodes', async () => {

    const res = await api.map.data.getDetectedNodes(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getLastMovements', async () => {

    const res = await api.map.data.getLastMovements(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getMovementsByType', async () => {

    let from = moment().subtract(1, "days").unix();
    let to = moment().unix();
    const res = await api.map.data.getMovementsByType(floor_id,from,to,"phone");
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getPatternMessagesOfGroupId', async () => {

    let group_id = 1;
    const res = await api.map.data.getPatternMessagesOfGroupId(floor_id, group_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getNodesFeedback', async () => {

    let group_id = 1;
    const res = await api.map.data.getNodesFeedback(floor_id, group_id);
    expect(Array.isArray(res)).toBe(true);
    //expect(res.length).toBeGreaterThan(0);
  });

  it('getSniffersGroups', async () => {

    const res = await api.map.data.getSniffersGroups(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

  it('getAccountPermission', async () => {

    const res = await api.map.data.getAccountPermission(floor_id);
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);
  });

});

describe('test Sniffers API', () => {

  it('getSniffers', async () => {

    const res = await api.sniffers.getSniffers();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);

  });

});

describe('test global methods API', () => {

  it('getMaps', async () => {

    const res = await api.getMaps();
    expect(Array.isArray(res)).toBe(true);
    expect(res.length).toBeGreaterThan(0);

  });

  it('getMapId', async () => {

    let ssid = "Vodafone-rocks";
    let router_mac = "";
    const res = await api.getMapId(ssid);
    expect(res).not.toBeNull();
    expect(res).toBe(floor_id);
  });

  it('getUserProfile', async () => {

    let user_id = 1;
    const res = await api.getUserProfile(user_id);
    expect(res).not.toBeNull();
    expect(res).toHaveProperty("info");
  });

});
*/
