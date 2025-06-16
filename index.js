const axios = require('axios');

var map_id = null;
var instance;

module.exports = {

  init : (opts, debug) =>{

    return axios_init(opts, debug)

  },

  state : ()=>{

    return axios_get("/api-status")
    .then( (response) => {return Promise.resolve(response)})
    .catch( (error) => {return Promise.reject(error)})

  },

  getDevices : (modelId=null)=>{

    let params = {};
    if(modelId != null){
      params['modelId'] = modelId;
    }
    return axios_get('/devices/list',params)
    .then( (response) => {
      return Promise.resolve(response)
    })
    .catch( (error) => {return Promise.reject(error)})
  },

  getChangedDevices : (modelId=null,updatedAt=null)=>{

    let params = {};
    if(modelId != null){
      params['modelId'] = modelId;
      if(updatedAt != null){
        params['updatedAt'] = updatedAt;
      }
    }
    return axios_get('/devices/list',params)
    .then( (response) => {
      return Promise.resolve(response)
    })
    .catch( (error) => {return Promise.reject(error)})
  },

  getChangedDevicesPermissions : (updatedAt=null)=>{

    let params = {};
    
    if(updatedAt != null){
      params['updatedAt'] = updatedAt;
    }
    
    return axios_get('/devices/permissions',params)
    .then( (response) => {
      return Promise.resolve(response)
    })
    .catch( (error) => {return Promise.reject(error)})
  },

  getModels : ()=>{

    let params = {};
      return axios_get('/models',params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})
  },

  getUsers : ()=>{

    let params = {};
      return axios_get('/users',params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})
  },

  getClients : ()=>{

    let params = {};
      return axios_get('/clients',params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})
  },

  getMQTTCredentials : ()=>{

    let params = {};
      return axios_get('/mqtt/credentials',params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})
  },

  device : {

    // get clients associated to a device
    getClients : (deviceId)=>{

      let params = {};
      return axios_get(`/device/${deviceId}/clients`,params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    getInfo : (deviceId)=>{
      let params = {}
      return axios_get(`/device/${deviceId}/info`,params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})
    },

    //get device info from project table
    getProjectInfo : (deviceId)=>{

      let params = {}
      return axios_get(`/device/${deviceId}/project/info`,params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    //get logs from project table
    getProjectLogs : (deviceId,sensor)=>{

      let params = {
        "sensor":sensor
      }
      return axios_get(`/device/${deviceId}/project/logs`,params, {}, 30000)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    //get device info from fw table
    getFwInfo : (deviceId)=>{

      let params = {}
      return axios_get(`/device/${deviceId}/fw/info`,params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    //get logs from fw table
    getFwLogs : (deviceId,sensor)=>{

      let params = {
        "sensor":sensor
      }
      return axios_get(`/device/${deviceId}/fw/logs`,params, {}, 30000)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    //get device info from model table
    getModelInfo : (deviceId)=>{

      let params = {}
      return axios_get(`/device/${deviceId}/model/info`,params)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    //get logs from model table
    getModelLogs : (deviceId,sensor)=>{

      let params = {
        "sensor":sensor
      }
      return axios_get(`/device/${deviceId}/model/logs`,params, {}, 30000)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

    sendMqttMessage : (deviceId,topic,payload,qos,retain)=>{

      let data = {
        "topic":topic,
        "payload":payload,
        "qos":qos,
        "retain":retain,
      }
      return axios_post(`/device/${deviceId}/mqtt/message`,data, {},5000)
      .then( (response) => {
        return Promise.resolve(response)
      })
      .catch( (error) => {return Promise.reject(error)})

    },

  },

  client : {

    // get devices associated to a client
    getDevices: (clientId)=>{

      return axios_get(`/client/${clientId}/devices`)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    // get devices associated to a client
    getClientId: (email)=>{

      return axios_get(`/client/id?email=${email}`)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

  },

  model : {

    // get model info
    getInfo: (modelId)=>{

      return axios_get('/model/'+modelId)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    // get model info
    getFirmwares: (modelId)=>{

      return axios_get(`/model/${modelId}/firmwares`)
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    uploadFirmware: (modelId,form,filename,fwVersion,appVersion)=>{

      return axios_uploadFile(`/model/${modelId}/firmwares`,form,
        {
          filename:filename,
          originalname:filename,
          fw_version:fwVersion,
          app_version:appVersion
        }
      )
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    },

    deleteFirmware: (modelId,firmwareId)=>{
      return axios_delete(`/model/${modelId}/firmware`,
        {
          id:firmwareId
        }
      )
      .then( (response) => {return Promise.resolve(response)})
      .catch( (error) => {return Promise.reject(error)})
    }

  },

}

function axios_init(opts, debug = false){

  instance = axios.create({
    baseURL: 'https://'+opts.domain,
    timeout: 1000,
    headers: opts.auth
  });

  return instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      if(debug)
        console.log(config)
      return config;
    }, function (error) {
      // Do something with request error
      return Promise.reject(error);
  });

}

function axios_get(path, params = {}, headers = {}, timeout = 1500){

  return instance.get(path,{params:params,headers:headers, timeout:timeout})
    .then(function (response) {
      if(response.data.Error){
        console.log(response.data.Message);
        return Promise.resolve(null);
      }else
        return Promise.resolve(response.data.Result)
    })
    .catch(function (err) {
      console.log(err.code+": "+err.response?.data?.Message);
      return Promise.reject(err.code+": "+err.response?.data?.Message);
    })
    .finally(function () {
      // always executed
    });
}

function axios_post(path, data = {}, headers = {}, timeout = 1500) {
  return instance.post(path, data, { headers: headers }, {timeout:timeout})
    .then(function (response) {
      if(response.data.Error){
        console.log(response.data.Message);
        return Promise.resolve(null);
      } else {
        return Promise.resolve(response.data.Result);
      }
    })
    .catch(function (err) {
      console.log(err.code + ": " + err.response?.data?.Message);
      return Promise.reject(err.code + ": " + err.response?.data?.Message);
    });
}

function axios_put(path, data = {}, headers = {}) {
  return instance.put(path, data, { headers: headers })
    .then(function (response) {
      if (response.data.Error) {
        console.log(response.data.Message);
        return Promise.resolve(null);
      } else {
        return Promise.resolve(response.data.Result);
      }
    })
    .catch(function (err) {
      console.log(err.code + ": " + err.response?.data?.Message);
      return Promise.reject(err.code + ": " + err.response?.data?.Message);
    });
}

function axios_delete(path, data = {}, headers = {}) {
  return instance.delete(path, { data: data, headers: headers })
    .then(function (response) {
      if (response.data.Error) {
        console.log(response.data.Message);
        return Promise.resolve(null);
      } else {
        return Promise.resolve(response.data.Result);
      }
    })
    .catch(function (err) {
      console.log(err.code + ": " + err.response?.data?.Message);
      return Promise.reject(err.code + ": " + err.response?.data?.Message);
    });
}

function axios_uploadFile(path, formData, additionalData = {}, headers = {}) {
  
  // Append any additional data
  for (const key in additionalData) {
    if (additionalData.hasOwnProperty(key)) {
      formData.append(key, additionalData[key]);
    }
  }

  // Set headers for multipart/form-data
  const config = {
    headers: {
      ...headers,
    }
  };

  return instance.post(path, formData, config)
    .then(response => {
      if (response.data.Error) {
        console.log(response.data.Message);
        return Promise.resolve(null);
      } else {
        return Promise.resolve(response.data.Result);
      }
    })
    .catch(err => {
      console.log(err.code + ": " + err.response?.data?.Message);
      return Promise.reject(err.code + ": " + err.response?.data?.Message);
    });
}