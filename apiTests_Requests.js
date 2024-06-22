const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';
let Inquiry_ReqId = '';
let user_id = '6283';
let member_id = '21890';  //eli



describe('Desc-Requests', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
        Inquiry_TeamId = await FuncAssis.getTeamId()
        console.log('Inquiry_TeamId----' + JSON.stringify(Inquiry_TeamId))
        Inquiry_CurrentDate = await FuncAssis.getCurrentDate()

    })


    describe('DescRequestsss', async () => {

        it.only('TC1-CorrectRequestData-When-everything-is-ready-Then-Create-a-Request-is-Successfully', function (done) {

            this.timeout(5000);
            var data = qs.stringify({
                'member_id': `${member_id}`,  //eli
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'true',
                'request_type': 'Vacation',
                'metadata[example_boolean]': 'true',
                'metadata[feedback]': 'feedback',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Illuminati',
                'metadata[nkids]': '5',
                'auth_token': Inquiry_auth_token,
                'team_id': Inquiry_TeamId
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                //     url: `${ApiConfig.targetUrl}/requests`,
                url: 'http://dev.x.io/api/v2/requests',
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    //  console.log(JSON.stringify(response.data));
                    Inquiry_ReqId = response.data.id;
                    console.log(JSON.stringify(Inquiry_ReqId));

                    assert.equal(response.status, 201, `\r\nExpected: ${201}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    done(err)
                })
        })


        it('TC2-DuplicateRequest-When-RequestData-is-ready-Then-Create-a-Request-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'member_id': `${member_id}`,  //eli
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'true',
                'request_type': 'Vacation',
                'metadata[example_boolean]': 'true',
                'metadata[feedback]': 'feedback',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'false',
                'metadata[extraapproval][Ultraboss]': 'false',
                'metadata[secret]': 'Illuminati',
                'metadata[nkids]': '5',
                'auth_token': Inquiry_auth_token,
                'team_id': Inquiry_TeamId
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    //  assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    assert.equal(response.status, 201, `\r\nExpected: ${201}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC3-DuplicateRequest-When-RequestData-is-ready-Then-Create-a-Request-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'member_id': `${member_id}`,  //eli
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'allDay': 'true',
                'request_type': 'Vacation',
                'metadata[example_boolean]': 'true',
                'metadata[feedback]': 'feedback',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'false',
                'metadata[extraapproval][Ultraboss]': 'false',
                'metadata[secret]': 'Illuminati',
                'metadata[nkids]': '5',
                'auth_token': Inquiry_auth_token,
                'team_id': Inquiry_TeamId
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    //  assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    assert.equal(response.status, 201, `\r\nExpected: ${201}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        //End of creating a request
        //Approving a Request'
        it('TC1-CorrectRequestData-When-everything-is-ready-Then-Approving-a-Request-is-Successfully', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}/approve`,
                headers: ApiConfig.headers,
                data: data
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


        it('TC2-InCorrectRequestID-When-everything-is-ready-Then-Approving-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/0/approve`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-InCorrectAuthtoken-When-everything-is-ready-Then-Approving-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': '0'//Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/619270/approve`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-InCorrectMethod-When-everything-is-ready-Then-Approving-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/619270/approve`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        // End of Describe an Approving a Request

        //'Denied a Request'
        it('TC1-CorrectRequestData-When-everything-is-ready-Then-denying-a-Request-is-Successfully', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}/deny`,
                headers: ApiConfig.headers,
                data: data
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


        it('TC2-InCorrectRequestID-When-everything-is-ready-Then-denying-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/0/deny`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-InCorrectAuthtoken-When-everything-is-ready-Then-denying-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': '0'//Inquiry_auth_token
            });

            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/619270/deny`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-InCorrectMethod-When-everything-is-ready-Then-denying-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/619270/deny`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        // End of Describe an denying a Request

        //'Edit a Request'
        it.only('TC1-CorrectRequestData-When-everything-is-ready-Then-Editing-a-Request-is-Successfully', function (done) {
            this.timeout(5000);

            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': 'true',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token,
                'team_id': Inquiry_TeamId
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('error-' + err)

                    done(err)
                })
        })


        it('TC2-IncorrectStartDate-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': '',
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': 'true',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC3-IncorrectEndDate-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': '',
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': 'true',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it.only('TC4-IncorrectAllDay-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': '',
                //'member_id':  ,
                //'request_type' : ,
                'approved': 'true',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('error-' + err)
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it.only('TC5-IncorrectApproved-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': '',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('error-' + err)

                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-IncorrectAuthToken-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': '',
                'note': 'Editing a Request',
                'auth_token': ''
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err EditingRequest is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC7-IncorrectReqId-When-RequestData-is-ready-Then-Editing-a-Request-is-failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': '',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/0`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err EditingRequest is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC8-CorrectMethod-When-everything-is-ready-Then-Editing-a-Request-is-Successfully', function (done) {
            this.timeout(8000);

            let data = qs.stringify({
                'start': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'end': `${Inquiry_CurrentDate}+00:00:00+UTC`,
                'metadata[example_boolean]': 'false',
                'metadata[feedback]': 'Some+oher+textbox+text',
                'metadata[extraapproval][boss]': 'true',
                'metadata[extraapproval][superboss]': 'true',
                'metadata[extraapproval][Ultraboss]': 'true',
                'metadata[secret]': 'Golden-Circle',
                'metadata[nkids]': '3',
                'allDay': 'true',
                //'member_id':  ,
                //'request_type' : ,
                'approved': 'true',
                'note': 'Editing a Request',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'Get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err EditingRequest is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        // End of Describe an Editing a Request

        //'Delete a Request'
        it('TC1-CorrectRequestData-When-everything-is-ready-Then-deleting-a-Request-is-Successfully', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err deleting Request  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-InCorrectRequestID-When-everything-is-ready-Then-deleting-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/0`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err deleting Request  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-InCorrectAuthtoken-When-everything-is-ready-Then-deleting-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': '0'//Inquiry_auth_token
            });

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    //  console.log(JSON.stringify(err.response.data));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-InCorrectMethod-When-everything-is-ready-Then-deleting-a-Request-is-Failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response List Requests for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //delete a request that was deleted before
        it('TC5-NotExistsRequestData-When-everything-is-ready-Then-deleting-a-Request-is-failed', function (done) {
            this.timeout(5000);
            let data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            let config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        // End of Describe an delete a Request

        //'List Requests for a User'

        it('TC1-Correct-List-Requests-for-user-When-everything-is-ready-Then-UserListRequest-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=${user_id}&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .then(response => {
                    console.log('response List Requests for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List Requests for a team  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })


        it('TC2-InCorrect-UserID-When-everything-is-ready-Then-UserListRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=0&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                }).catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-InCorrect-AuthToken-When-everything-is-ready-Then-UserListRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=${user_id}&from_date=2023-02-20&to_date=2023-03-09&auth_token=0`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC4-InCorrect-FromDate-When-everything-is-ready-Then-UserListRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=${user_id}&from_date=&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-InCorrect-to_date-When-everything-is-ready-Then-UserListRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=${user_id}&from_date=&to_date=0&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-InCorrect-Method-When-everything-is-ready-Then-UserListRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?user_id=${user_id}&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        // End of Describe List Requests for a User

        //'List Requests for a team'
        it('TC1-Correct-List-Requests-for-team-Data-When-everything-is-ready-Then-TeamList-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List Requests for a team  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List Requests for a team  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })


        it('TC2-InCorrect-team_id-When-everything-is-ready-Then-TeamList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=0&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-InCorrect-AuthToken-When-everything-is-ready-Then-TeamList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-09&auth_token=0`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-InCorrect-FromDate-When-everything-is-ready-Then-TeamList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=${Inquiry_TeamId}&from_date=&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                }).catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-InCorrect-to_date-When-everything-is-ready-Then-TeamList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                }).catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-InCorrect-Method-When-everything-is-ready-Then-TeamList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests?team_id=${Inquiry_TeamId}&from_date=2023-02-20&to_date=2023-03-09&auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })




        //'Retrieving Request details'
        it('TC1-Correct-Requests-Data-When-everything-is-ready-Then-RetrievingRequest-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response List Retrieving is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List Requests  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })




        it('TC2-InCorrect-ReqID-When-everything-is-ready-Then-RetrievingRequest-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/0?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log(JSON.stringify(err.response.data) + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })




        it('TC3-NotFound-Requests-Data-When-everything-is-ready-Then-RetrievingRequest-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/619270?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-WrongMethod-Data-When-everything-is-ready-Then-RetrievingRequest-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC5-IncorrectAuthToken-Data-When-everything-is-ready-Then-RetrievingRequest-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/requests/${Inquiry_ReqId}?auth_token=0`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        //end of Describe Retrieving Request details
    });

});  //end of main describe

