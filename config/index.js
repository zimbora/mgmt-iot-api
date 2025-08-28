
var key = {}
try{
  key = require("./keys");
}catch(e){
  key = {
    api_token : "",
  }
}

module.exports = {
  domain : "devices.dev.inloc.cloud/api",
  api_token : key?.api_token || process.env.API_TOKEN,
  debug_axios : false,
}
