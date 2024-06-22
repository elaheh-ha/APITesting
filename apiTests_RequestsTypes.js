const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
axios.defaults.withCredentials = true
const createMobilePhoneNumber = require("random-mobile-numbers");


let Inquiry_auth_token = '';
let Inquiry_TeamId = '';

//"user_id":6283,
//{"id":653,"name":"Test Team","abilities":{"edit":true,"delete":true}}


describe('Desc-Requests', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
    })

    describe('RequestTypes-List Request types for a team', async () => {

        it('TC1-TeamID&AuthToken-When-everything-is-ready-Then-getting-Request-list-is-Successfully', function (done) {
            this.timeout(10000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/request_types?team_id=${Inquiry_TeamId}&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    done(err)
                })
        })

    })


});  //end of main describe

//mocha apiTests_Users.js --reporter mochawesome