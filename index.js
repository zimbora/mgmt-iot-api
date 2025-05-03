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

  getDevices : ()=>{

    let params = {};
      return axios_get('/devices/list',params)
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

    //get device info
    getInfo : (deviceId)=>{

      let params = {}
      return axios_get(`/device/${deviceId}/info`,params)
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

function axios_get(path, params = {}, headers = {}){

  var data;
  var error;

  return instance.get(path,{params:params,headers:headers})
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
