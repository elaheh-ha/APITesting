const ApiConfig = require('./config.js');
var qs = require('qs');
const axios = require('axios');


let Inquiry_auth_token='';
let Inquiry_TeamId= '';


async function getAuthToken() {
        var data = qs.stringify({
            'email': 'x.x@gmail.com',
            'password': 'x',
            'device_description': 'B4-D4',
            'device_id': 'C-3PO',
            'device_type': 'android',
        });

        var config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${ApiConfig.targetUrl}/device_sessions`,
            headers: ApiConfig.headers,
            data : data
        };

        await axios(config )
            .then( response =>{
                Inquiry_auth_token=response.data.auth_token;

            })
            .catch( (err) => {
                Inquiry_auth_token=0
            })
    return Inquiry_auth_token
}



async function getTeamId() {
    var config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${ApiConfig.targetUrl}/teams?auth_token=${Inquiry_auth_token}`,
        headers: ApiConfig.headers
    };

    await axios(config )
        .then( response =>{
            Inquiry_TeamId= response.data.content[1].id;
          //  console.log('Inquiry_TeamId----'+JSON.stringify(response.data))

        })
        .catch( (err) => {
            Inquiry_TeamId=0
        })
    return Inquiry_TeamId
}




async function getCurrentDate() {

    const date = new Date(Date.now());
    let day = date.getDate()+1;
    let year = date.getFullYear();
    let month = date.getMonth()+1;//.toLocaleString('en-US', {month: 'short'});
    let currentDate = `${year}-${month}-${day}`;

    return currentDate
}

module.exports = {
    getCurrentDate,
    getAuthToken,
    getTeamId
};


///make a if condition. for normal user or admin
//bacause all api tests related to user type
//I have to check both user types