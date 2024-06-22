const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');

axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';
let user_id = '6283'
let member_id = '21890';
let shift_id = '1629460'

let Inquiry_CurrentDate
describe('XAi-shifts', async () => {


    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
        Inquiry_CurrentDate = await FuncAssis.getCurrentDate()

    })

    describe('1-Creating a Shift', async () => {
        it('TC1-1-CorrectShiftData-When-everything-is-ready-Then-Create-a-Shift-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': `${Inquiry_CurrentDate}+00:00:00+PST`,
                'end': `${Inquiry_CurrentDate}+00:00:00+PST`,
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApiiiii',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })


        it('TC2-1-DuplicateShift-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };
            axios(config)
                .then(response => {
                    //  console.log('response is->' +JSON.stringify( response.data)) ;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err DuplicatedShift is->' + err);
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '202-03-23+00:00:00+UTC',
                'end': '202-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '202000000000000-03-23+00:00:00+UTC',
                'end': '20200000000000000-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '0000-03-23+00:00:00+UTC',
                'end': '0000-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '0-0-0+00:00:00+UTC',
                'end': '0-0-0+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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


        it('TC7-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '0',
                'end': '0',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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


        it('TC8-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '',
                'end': '',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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


        it('TC9-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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


        it('TC10-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-23+00:00:00+UTC',
                'end': '2023-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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


        it('TC11-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-03+00:00:00+UTC',
                'end': '2023-03+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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



        it('TC12-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-03-10000000+00:00:00+UTC',
                'end': '2023-03-10000+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC13-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-03-05+00:00:00+UTC',
                'end': '2023-03-01+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC14-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-03-@@@@+00:00:00+UTC',
                'end': '2023-03-@@@@+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC15-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2023-02-30+00:00:00+UTC',
                'end': '2023-02-31+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC16-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': '2022-02-30+00:00:00+UTC',
                'end': '2022-02-31+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC17-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': '2023-03-30+02:01:30',
                'end': '2022-03-31+00',
                'allDay': 'false',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC18-1-WrongDate-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': '2023-03-23+00:00:00+PDT',
                'end': '2023-03-25+00:00:00+PDT',
                'allDay': 'false',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //---------MemberId---------------------------------------------------
        it('TC19-1-WrongMemberId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '21001000000000000',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC20-1-EmptyMemberId-When-shiftData-is-ready-Then-Create-a-Shift-is-successful', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC21-1-SpecialCharMemberId-When-shiftData-is-ready-Then-Create-a-Shift-is-successful', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '---------',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC22-1-WrongMemberId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //---------jobs---------------------------------------------------
        it('TC23-1-EmptyJobId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '',
                'note': 'ShiftGeneratedByApiWithoutJob',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };
            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC24-1-WrongJobId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '------------------',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC25-1-WrongJobId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '1111111111111111111111111111111111111111111111122222222222222222222222222222222222222222222222222222222222222222',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC26-1-WrongJobId-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    //   console.log('response is->' +JSON.stringify( response.data)) ;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })


                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC27-1-LongNote-When-shiftData-is-ready-Then-Create-a-Shift-is-successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,//+00:00:00+UTC
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC28-1-wrongAuthToken-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': 1
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC29-1-wrongAuthToken-When-shiftData-is-ready-Then-Create-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'team_id': Inquiry_TeamId,
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


    }) // End of describe creating shifts

    describe('2-Editing a Shift', async () => {

        it('TC1-2-CorrectShiftData-When-everything-is-ready-Then-Editing-a-Shift-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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

        it('TC2-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '202-03-23+00:00:00+UTC',
                'end': '202-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '202000000000000-03-23+00:00:00+UTC',
                'end': '20200000000000000-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '0000-03-23+00:00:00+UTC',
                'end': '0000-03-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '0-0-0+00:00:00+UTC',
                'end': '0-0-0+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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

        it('TC6-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '0',
                'end': '0',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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

        it('TC7-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '',
                'end': '',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC8-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC9-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-23+00:00:00+UTC',
                'end': '2023-25+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC10-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03+00:00:00+UTC',
                'end': '2023-03+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC11-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03-10000000+00:00:00+UTC',
                'end': '2023-03-10000+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC12-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03-05+00:00:00+UTC',
                'end': '2023-03-01+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC13-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03-@@@@+00:00:00+UTC',
                'end': '2023-03-@@@@+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC14-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-02-30+00:00:00+UTC',
                'end': '2023-02-31+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC15-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2022-02-30+00:00:00+UTC',
                'end': '2022-02-31+00:00:00+UTC',
                'allDay': 'true',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC16-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03-30+02:01:30',
                'end': '2022-03-31+00',
                'allDay': 'false',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC17-2-WrongDate-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': '2023-03-23+00:00:00+PDT',
                'end': '2023-03-25+00:00:00+PDT',
                'allDay': 'false',
                'member_id': member_id,
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //---------MemberId---------------------------------------------------
        it('TC18-2-WrongMemberId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '21001000000000000',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC19-2-EmptyMemberId-When-shiftData-is-ready-Then-Editing-a-Shift-is-successful', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC20-2-SpecialCharMemberId-When-shiftData-is-ready-Then-Editing-a-Shift-is-successful', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '---------',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC21-2-WrongMemberId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
                'job': '1',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //---------jobs---------------------------------------------------
        it('TC22-2-EmptyJobId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC23-2-WrongJobId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '------------------',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)

                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC24-2-WrongJobId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '1111111111111111111111111111111111111111111111122222222222222222222222222222222222222222222222222222222222222222',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC25-2-WrongJobId-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC26-2-LongNote-When-shiftData-is-ready-Then-Editing-a-Shift-is-successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApiShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    //   Inquiry_ReqId=response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 400, `\r\nExpected: ${400}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC27-2-wrongAuthToken-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': 1
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC28-2-wrongAuthToken-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi'
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC29-2-wrongShiftID-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/111111111`,
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

        it('TC30-2-EmptyShiftID-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC31-2-WrongShiftID-When-shiftData-is-ready-Then-Editing-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'false',
                'member_id': member_id,
                'job': '@@@',
                'note': 'ShiftGeneratedByApi',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/0`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


    }) // End of Describe an Editing a Shift

    describe('3-Deleting a Shift', async () => {
        it('TC1-3-CorrectShiftData-When-everything-is-ready-Then-Deleting-a-Shift-is-Successfully', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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

        it('TC2-3-NotExistsShiftId-When-shiftData-is-ready-Then-Deleting-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}`,
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


        it('TC3-3-WrongShiftId-When-shiftData-is-ready-Then-Deleting-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/00000000000`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 403, `\r\nExpected: ${403}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-3-WrongShiftId-When-shiftData-is-ready-Then-Deleting-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/@@@@@@@`,
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


        it('TC5-3-WrongShiftId-When-shiftData-is-ready-Then-Deleting-a-Shift-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments`,
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
    }) // End of Describe an delete a Shift

    describe('4-List Shifts for a User', async () => {

        it('TC1-4-List-shifts-for-user-When-everything-is-ready-Then-UserShiftLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=${user_id}&from_date=2023-03-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
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


        it('TC2-4-InCorrect-UserID-When-everything-is-ready-Then-UserShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=00000&from_date=2023-03-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-4-InCorrect-AuthToken-When-everything-is-ready-Then-UserShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=${user_id}&from_date=2023-03-20&to_date=2023-03-27&auth_token=00000000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC4-4-InCorrect-FromDate-When-everything-is-ready-Then-UserShiftLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=${user_id}&from_date=2023-03-28&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
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


        it('TC5-4-InCorrect-to_date-When-everything-is-ready-Then-UserShiftLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=${user_id}&from_date=&to_date=0&auth_token=${Inquiry_auth_token}`,
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


        it('TC6-4-InCorrect-Method-When-everything-is-ready-Then-UserShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?user_id=${user_id}&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC7-4-InCorrect-UserID-When-everything-is-ready-Then-UserShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?from_date=2022-03-25&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



    }) // End of Describe List Shifts for a User

    describe('5-List shifts for a team', async () => {
        it('TC1-5-ListShifts-for-team-Data-When-everything-is-ready-Then-TeamShiftLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List shifts for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List shifts for a team  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })




        it('TC2-5-InCorrect-ListShifts-When-everything-is-ready-Then-TeamShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=0&from_date=2023-02-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-5-InCorrectListShifts-AuthToken-When-everything-is-ready-Then-TeamShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-27&auth_token=0`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC4-5-InCorrectListShifts-FromDate-When-everything-is-ready-Then-TeamShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=${Inquiry_TeamId}&from_date=&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List shifts for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-5-InCorrectListShifts-to_date-When-everything-is-ready-Then-TeamShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List shifts for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-5-InCorrectListShifts-Method-When-everything-is-ready-Then-TeamShiftLists-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC7-5-InCorrectListShifts-to_date-When-everything-is-ready-Then-TeamShiftLists-is-successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments?from_date=2023-02-20&to_date=2023-03-27&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List shifts for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

    describe('6-Retrieving shift details', async () => {
        it('TC1-6-Correct-shift-Data-When-everything-is-ready-Then-RetrievingShift-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
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




        it('TC2-6-InCorrect-ShiftID-When-everything-is-ready-Then-RetrievingShift-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/11111111111111?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })




        it('TC3-6-NotFound-shift-Data-When-everything-is-ready-Then-RetrievingShift-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/@@@@@@?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-6-WrongMethod-Data-When-everything-is-ready-Then-RetrievingShift-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC5-6-IncorrectAuthToken-Data-When-everything-is-ready-Then-RetrievingShift-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/assignments/${shift_id}?auth_token=@@@@@`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));

                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


    })//end of Describe Retrieving Shift details

    describe('7-Retrieving member(s) recommendations', async () => {
    })

});  //end of main describe

