const ApiConfig = require('./config.js');
const FuncAssis = require('./FuncAssis.js');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');

axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';
let user_id = '6283'
let member_id = '21001';
let filter_id = ''

describe('XAi-filters', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
    })

    describe('1-Creating a filter', async () => {
        it('TC1-1-CorrectfilterData-When-everything-is-ready-Then-Create-a-filter-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '181',
                'members[][abilities]': '',
                'members[][id]': '180',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        //---------TeamId---------------------------------------------------
        it('TC2-1-WrongTeamID-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': '00000000',
                'members[][id]': '181',
                'members[][abilities]': '',
                'members[][id]': '180',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-1-WrongTeamID-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'members[][id]': '180',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-1-WrongTeamID-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': '@@@@@@@@@@',
                'members[][id]': '181',
                'members[][abilities]': '',
                'members[][id]': '180',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-1-WrongTeamID-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                // 'team_id': '@@@@@@@@@@',
                'members[][id]': '181',
                'members[][abilities]': '',
                'members[][id]': '180',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //-------------------members[][id]-------------------------------------------------
        it('TC6-1-WrongMemberId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '00000000000000',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC7-1-WrongMemberId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '@@@@@@@@@@@@',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC8-1-WrongMemberId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                //   'members[][id]': '@@@@@@@@@@@@',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC9-1-WrongMemberId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '1',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC10-1-WrongJobId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '00000000000000',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC11-1-WrongJobId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '@@@@@@@@@@@@@',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC12-1-WrongJobId&JobName-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '@@@@@@@@@@@@@',
                'jobs[][name]': '000000000000000000000----------******************************************************************************************************************************************************************************yyyyyyy',
                'name': 'Best+Workers',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC12-1-WrongJobId-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '0',
                'jobs[][name]': 'Testsss',
                'name': 'Best+Workersssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC13-1-Wrongauth_token-When-filterData-is-ready-Then-Create-a-filter-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'members[][id]': '180',
                'members[][abilities]': '',
                'members[][id]': '181',
                'members[][abilities]': '',
                'jobs[][id]': '0',
                'jobs[][name]': 'Marketing+Planner',
                'name': 'Best+Workers',
                'auth_token': 'Inquiry_auth_token'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    }) // End of describe creating filters

    describe('3-Deleting a filter', async () => {
        it('TC1-3-CorrectfilterData-When-everything-is-ready-Then-Deleting-a-filter-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });
            //filterid-747
            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/747`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })

        })

        it('TC2-3-NotExistsfilterId-When-filterData-is-ready-Then-Deleting-a-filter-is-failed', function (done) {
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });
            //filterid-747
            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/747`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data));
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })

        })


        it('TC3-3-WrongfilterId-When-filterData-is-ready-Then-Deleting-a-filter-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/0000000000000000000000`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-3-WrongfilterId-When-filterData-is-ready-Then-Deleting-a-filter-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/@@@@@@@`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-3-WrongfilterId-When-filterData-is-ready-Then-Deleting-a-filter-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
    }) // End of Describe an delete a filter

    describe('4-List filters for a User', async () => {

        it('TC1-4-List-filters-for-user-When-everything-is-ready-Then-UserfilterLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?team_id=${Inquiry_TeamId}&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List for a user  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List for a user  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })


        it('TC2-4-InCorrect-TeamID-When-everything-is-ready-Then-UserfilterLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?team_id=00000000&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response List for a user  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-4-InCorrect-TeamID-When-everything-is-ready-Then-UserfilterLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?team_id=&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-4-InCorrect-TeamID-When-everything-is-ready-Then-UserfilterLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response List for a user  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-4-InCorrect-AuthToken-When-everything-is-ready-Then-UserfilterLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?auth_token=00000000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-4-InCorrect-Method-When-everything-is-ready-Then-UserfilterLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)

                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
    }) // End of Describe List filters for a User

    describe('5-Retrieving filter details', async () => {
        it('TC1-5-Correct-filter-Data-When-everything-is-ready-Then-Retrievingfilter-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/750?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };
            axios(config)
                .then(response => {
                    console.log('response Retrieving is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err Retrieving is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })




        it('TC2-5-InCorrect-filterID-When-everything-is-ready-Then-Retrievingfilter-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/11111111111111?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })




        it('TC3-5-NotFound-filter-Data-When-everything-is-ready-Then-Retrievingfilter-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/@@@@@@?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-5-WrongMethod-Data-When-everything-is-ready-Then-Retrievingfilter-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/750?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC5-5-IncorrectAuthToken-Data-When-everything-is-ready-Then-Retrievingfilter-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/filters/750?auth_token=@@@@@`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })//end of Describe Retrieving filter details
});  //end of main describe

