const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';


describe('XAi-Notifications', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
    })


    describe('List a Users Notifications', async () => {

        it('TC1-Correct-notificationsData-When-everything-is-ready-Then-GettingnotificationsList-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response notifications List is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List notifications  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-WrongMethod-Data-When-everything-is-ready-Then-GettingNotificationsList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingNotificationsList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-emptyAuthToken-Data-When-everything-is-ready-Then-GettingNotificationsList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

    describe('List number of Notifications', async () => {

        it('TC1-Correct-notificationsData-When-everything-is-ready-Then-GettingnotificationsNum-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/number?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response notifications Number is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err notifications Number is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-WrongMethod-Data-When-everything-is-ready-Then-GettingnotificationsNum-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/number?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingnotificationsNum-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/number?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-emptyAuthToken-Data-When-everything-is-ready-Then-GettingnotificationsNum-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/number?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

    describe('Retrieving Notification details', async () => {

        it('TC1-Correct-notificationsData-When-everything-is-ready-Then-RetrievingNotificationsDetails-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/1339766?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response notifications details is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err notifications details is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-WrongMethod-Data-When-everything-is-ready-Then-RetrievingNotificationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/1339766?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-IncorrectAuthToken-Data-When-everything-is-ready-Then-RetrievingNotificationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/1339766?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-emptyAuthToken-Data-When-everything-is-ready-Then-RetrievingNotificationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/notifications/1339766?auth_token=`,
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

