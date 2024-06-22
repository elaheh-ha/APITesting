const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
const createMobilePhoneNumber = require("random-mobile-numbers");
axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';

//"user_id":6283,

describe('Desc-TeamsApi', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
    })

    describe('List Teams that a User is a member of', async () => {
        it('TC1-Given-CorrectUserData-When-everything-is-ready-Then-getting-team-list-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .then(response => {
                    console.log('response team list  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    done(err)
                })
        })



        it('TC2-Given-InCorrect_auth_token-When-everything-is-ready-Then-getting-team-list-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams?auth_token=Op4JgjXWDMkfM6ivx7cbtEJO7cxchup7H7Ias4cA==`,
                headers: ApiConfig.headers
            };
            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-Given-InCorrect_auth_token-When-everything-is-ready-Then-getting-team-list-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams?auth_token=Op4JgjXWDMkuIIXpYniwx7cbtEJO7cxchup7H7Ias4cA==`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-Given-InCorrect_auth_token-When-everything-is-ready-Then-getting-team-list-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-Given-InCorrect_auth_token-When-everything-is-ready-Then-getting-team-list-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
    })// end of List Teams that a User is a member of

    //"user_id":6283,
    // is->{"content":[{"id":653,"name":"Test Team","abilities":{"edit":true,"delete":true}}]}

    describe('Retrieving Team details', async () => {

        it('TC1-Given-CorrectUserData-When-everything-is-ready-Then-Retrieving-Team-details-is-Successfully', function (done) {
            this.timeout(10000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams/${Inquiry_TeamId}?auth_token=${Inquiry_auth_token}`,
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

        it('TC2-Given-InCorrect_teamID-When-everything-is-ready-Then--Retrieving-Team-details-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams/653333?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-Given-InCorrect_auth_token-When-everything-is-ready-Then--Retrieving-Team-details-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams/${Inquiry_TeamId}?auth_token=rZ8Eg==`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-Given-InCorrect_auth_token&TeamID-When-everything-is-ready-Then--Retrieving-Team-details-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams/650003?auth_token=rZ8Eg==ddd`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-Given-InCorrect_auth_token&TeamID-When-everything-is-ready-Then--Retrieving-Team-details-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/teams/a650003?auth_token=rZ8Eg==ddd`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
    })// end of describe Retrieving Team details
    //  })

});  //end of main describe

