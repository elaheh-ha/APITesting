let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
const ApiConfig = require('./config');
axios.defaults.withCredentials = true


describe('XAi-device_sessions', async () => {

    describe('Resource for logging in and out and getting an authentication token.', async () => {

        it('TC1-Given-CorrectDeviceInfo-When-everything-is-ready-Then-getting-authentication-token-Successfully', function (done) {
            this.timeout(10000);

            var data = qs.stringify({
                'email': 'x.x@gmail.com',
                'password': 'xxx',
                'device_description': 'B4-D4',
                'device_id': 'C-3PO',
                'device_type': 'android',
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/device_sessions`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response team list  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err  team list  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

    })// eList Teams that a User is a member of

});  //end of main describe

