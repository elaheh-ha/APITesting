
const protocol = "http";
const host = "dev.xxx.io";
const path = "/api/v2";
//const targetUrl = `${protocol}://${host}${path}`;
//let targetUrl = `${protocol}://dev.${host}${path}`;
//const targetUrl = `${protocol}://dev.${host}${path}`;

const targetUrl = 'http://dev.xxx.io/api/v2';

let headers= {
       "Host": host,
       "Accept": "application/json",
       "Content-Type": "application/x-www-form-urlencoded"
};

module.exports = {
   targetUrl,
   host,
   headers
};


