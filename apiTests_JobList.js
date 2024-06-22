const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';


describe('XAi-Jobs', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
    })


    describe('Resource for interacting with jobs.', async () => {

        it('TC1-Correct-jobData-When-everything-is-ready-Then-GettingJobList-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=${Inquiry_TeamId}&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response job List is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List jobs  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-InCorrect-teamId-When-everything-is-ready-Then-GettingJobList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=0&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-NotFound-jobs-Data-When-everything-is-ready-Then-GettingJobList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-WrongMethod-Data-When-everything-is-ready-Then-GettingJobList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=${Inquiry_TeamId}&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingJobList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=${Inquiry_TeamId}&auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-emptyAuthToken-Data-When-everything-is-ready-Then-GettingJobList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/jobs?team_id=${Inquiry_TeamId}&auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

});  //end of main describe

