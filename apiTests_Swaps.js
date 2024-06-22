const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');

axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let assignment_id = '2285696';
let deal_Id = '';
describe('Desc-Swaps', async () => {
    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))

        // Inquiry_TeamId=await  FuncAssis.getTeamId()
        // console.log('Inquiry_TeamId----'+JSON.stringify(Inquiry_TeamId))
        // Inquiry_CurrentDate=await  FuncAssis.getCurrentDate()


        // describe('1-Creating a Shift', async () => {
        //
        //
        //     it('TC1-1-CorrectShiftData-When-everything-is-ready-Then-Create-a-Shift-is-Successfully', function (done) {
        //         this.timeout(5000);
        //         var data = qs.stringify({
        //             'team_id': Inquiry_TeamId,
        //             'start': `${Inquiry_CurrentDate}+00:00:00+PST`,
        //             'end': `${Inquiry_CurrentDate}+00:00:00+PST`,
        //             'allDay': 'true',
        //             'member_id': member_id,
        //             'job': '1',
        //             'note':'ShiftGeneratedByApiiiii',
        //             'auth_token' : Inquiry_auth_token
        //         });
        //
        //         var config = {
        //             method: 'post',
        //             maxBodyLength: Infinity,
        //             url: `${ApiConfig.targetUrl}/assignments`,
        //             headers: ApiConfig.headers,
        //             data : data
        //         };
        //
        //         axios(config )
        //             .then( response =>{
        //                 console.log('response is->' +JSON.stringify( response.data)) ;
        //                 assignment_id=response.data.id;
        //                 assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
        //                 done();
        //             })
        //             .catch( (err) => {
        //                 console.log('err is->' +JSON.stringify( err.response.data) +
        //                     'with status Code='+ err.response.status);
        //                 done(err)
        //             })
        //           })
        //        })

    })

    describe('1-Creating a Deal', async () => {

        it('TC1-1-CorrectDealData-When-everything-is-ready-Then-Create-a-Deal-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    deal_Id = response.data.id;
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err DuplicatedDeal is->' + err);
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC2-1-DuplicateDeal-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err DuplicatedDeal is->' + err);
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-1-WrongAssignment_id-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': '',
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC4-1-WrongAssignment_id-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': '1111111111111111111',
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC5-1-WrongAssignment_id-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': '@@@@@@@@@',
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC6-1-WrongAssignment_id-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                //  'assignment_id': '@@@@@@@@@',
                'note': 'Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC7-1-LongNote-When-dealData-is-ready-Then-Create-a-Deal-is-successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!Someone+take+this+shift!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC8-1-wrongAuthToken-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shift!',
                'auth_token': ''
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC9-1-wrongAuthToken-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shift!',
                //  'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC10-1-wrongAuthToken-When-dealData-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': '1642954',
                'note': 'Someone+take+this+shift!',
                'auth_token': 'Inquiry_auth_token'
            });

            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        //you cannot deal past shifts

        it('TC11-1-PastShiftData-When-everything-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': 5081,
                'note': 'Someone+take+this+shiftNOWWW!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC12-1-DirectDeal-When-everything-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shiftNOWWW!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
        //-------------
        //***************
        it('TC13-1-DirectDealwithNonExistMember-When-everything-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shiftNOWWW!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC14-1-DirectDealwithRequiredOffMember-When-everything-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shiftNOWWW!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC15-1-DirectDealwithOnVacationMember-When-everything-is-ready-Then-Create-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'assignment_id': assignment_id,
                'note': 'Someone+take+this+shiftNOWWW!',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    }) // End of describe creating Deal

    describe('2-Cancel a Deal', async () => {
        it('TC1-2-CorrectDealData-When-everything-is-ready-Then-delete-a-Deal-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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

        it('TC2-1-DuplicateDeal-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-2-WrongDealId-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/0000`,
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

        it('TC4-2-WrongDealId-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/@@@@@@@@@`,
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

        it('TC5-2-WrongDealId-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC6-2-wrongAuthToken-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': ''
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/66076`,
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

        it('TC7-2-wrongAuthToken-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                //  'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/66076`,
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

        it('TC8-2-wrongAuthToken-When-dealData-is-ready-Then-delete-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': 'Inquiry_auth_token'
            });

            var config = {
                method: 'delete',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/66076`,
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
    }) // End of Describe an delete a Deal

    describe('3-Accept/Approve a Deal', async () => {
        it('TC1-3-CorrectDealData-When-everything-is-ready-Then-Approve-a-Deal-is-Successfully', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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

        it('TC2-3-DuplicateApprove-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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
                    assert.equal(err.response.status, 409, `\r\nExpected: ${409}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-3-WrongDealId-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/0000`,
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

        it('TC4-3-WrongDealId-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/@@@@@@@@@`,
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

        it('TC5-3-WrongDealId-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps`,
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

        it('TC6-3-wrongAuthToken-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': ''
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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

        it('TC7-3-wrongAuthToken-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                //  'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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

        it('TC8-3-wrongAuthToken-When-dealData-is-ready-Then-Approve-a-Deal-is-failed', function (done) {
            this.timeout(5000);
            var data = qs.stringify({
                'auth_token': 'Inquiry_auth_token'
            });

            var config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps/${deal_Id}`,
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

    }) // End of describe Accept/Approve a Deal

    describe('4-List My/Open/Admin Deals', async () => {

        it('TC1-4-List-deals-When-everything-is-ready-Then-UserDealLists-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=${Inquiry_auth_token}&page=1&per_page=10`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err List for a user  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-4-IncorrectMethod-When-everything-is-ready-Then-UserDealLists-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=${Inquiry_auth_token}&page=1&per_page=10`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-4-IncorrectAuthorizeToken-When-everything-is-ready-Then-UserDealLists-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=&page=1&per_page=10`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-4-IncorrectAuthorizeToken-When-everything-is-ready-Then-UserDealLists-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=jjklvxnv&page=1&per_page=10`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-4-IncorrectAuthorizeToken-When-everything-is-ready-Then-UserDealLists-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?page=1&per_page=10`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    console.log('err is->' + err);
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-4-IncorrectPage-When-everything-is-ready-Then-UserDealLists-is-failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=${Inquiry_auth_token}&page=1000000&per_page=1000000000`,
                headers: ApiConfig.headers
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

        it('TC7-4-IncorrectPage-When-everything-is-ready-Then-UserDealLists-is-successful', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/swaps?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
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

    }) // End of Describe List Deal for a User




    describe('5-CmplxSenarios', async () => {
        describe('GiveDealScenario', async () => {
            it('TC1-5-', function (done) {
                this.timeout(5000);
                var data = qs.stringify({
                    'assignment_id': '1642954',
                    'note': 'Someone+take+this+shift!',
                    'auth_token': Inquiry_auth_token
                });

                var config = {
                    method: 'post',
                    maxBodyLength: Infinity,
                    url: `${ApiConfig.targetUrl}/swaps`,
                    headers: ApiConfig.headers,
                    data: data
                };

                axios(config)
                    .then(response => {
                        console.log('response is->' + JSON.stringify(response.data));




                        //  assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                        done();
                    })
                    .catch((err) => {
                        console.log('err is->' + JSON.stringify(err.response.data) +
                            'with status Code=' + err.response.status);
                        done(err)
                    })
            })

        })



        describe('TakeDealScenario', async () => {

        })

    })
});  //end of main describe

