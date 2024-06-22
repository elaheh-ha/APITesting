const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');

axios.defaults.withCredentials = true
const createMobilePhoneNumber = require("random-mobile-numbers");


let fakePhone = createMobilePhoneNumber("USA"); // prints "+905728945627"
let Inquiry_auth_token = '';


describe('XAi_UsersApi', async () => {
    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
    })


    describe('Register a new User', async () => {

        it('TC1-Given-CorrectUserData-When-everything-is-ready-Then-userSignUp-Successfully', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users`,
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



        it('TC2-Given-DuplicateEmail-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };
            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-Given-wrongEmail-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': 'test1gmail.com',
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC4-Given-wrongfname&lname-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '',
                'lname': '',
                'email': `test${fakeEmail}@hotmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        ///why api accept @@@ in fname and lname?????????????
        it('TC5-Given-wrongfname&lname(2)-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '@@@@',
                'lname': '@@@@',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-Given-wrongfname&lname(3)-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '11',
                'lname': '11',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC7-Given-wrongfname&lname(4)-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '1111111111111111#######################################################################11111111111111111111111111111111111111111111111111111111111111111111111111111111',
                'lname': '122222222222222222222%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%2222222222222222222222222222222222222222222222222222222222222222222222222221',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC8-Given-wrongfname&lname(5)-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                // 'fname': '11',
                // 'lname': '11',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    //   console.log('err signup is->' +JSON.stringify( err.response.data));
                    console.log('err signup is->' + err);
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC9-Given-wrongfname&lname(6)-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                // 'fname': '11',
                // 'lname': '11',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC10-Given-RemovedEmail-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                // 'fname': '11',
                // 'lname': '11',
                // 'email': 'test6@gmail.com',
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 500, `\r\nExpected: ${500}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC11-Given-Removedphone&SendingCorrectemail-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(10000);

            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '11',
                'lname': '11',
                'email': `test${fakeEmail}@gmail.com`,
                //'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err signup is->' + JSON.stringify(err.response.data));
                    console.log('err signup is->' + err.response.status);
                    assert.equal(err.response.status, 500, `\r\nExpected: ${500}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        //*************************Report---------------------------------------------------------
        ///if I send a correct email and wrong phone number, it successfully add user without checking required fields like phone
        it('TC12-Given-Wrongphone&Correctemail-When-everything-is-ready-Then-userSignup-passed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '11',
                'lname': '11',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1@@@@@@@@@@',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 500, `\r\nExpected: ${500}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC13-Given-Removedphone&email-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': '11',
                'lname': '11',
                //'email': 'test6@gmail.com',
                //'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 500, `\r\nExpected: ${500}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC14-Given-wrongfname&lname&phone&email-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmllllllllllllail.com`,
                'phone': '',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC15-Given-wrongTimezone-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '',
                'lname': '',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('err signup is->' + response.status);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC16-Given-EmptyTimezone-When-everything-is-ready-Then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '',
                'lname': '',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': '',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('err signup is->' + response.status);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC17-Given-EmptyOrganization_name-When-Email-is-ok-then-userSignup-success', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC18-Given-LongStringOrganization_name-When-Email-is-ok-then-userSignup-success', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);
            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '33333333333333333333333333^^^^^^^^^^^^^^^^^^^^^^^JUJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJJDFFFFFFFFFFddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response->' + response.status);
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC19-Given-EmptyPassword-When-Email-is-ok-then-userSignup-success', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC20-Given-removedPassword-When-Email-is-ok-then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                //   'password': '1',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC21-Given-WrongPassword-When-Email-is-ok-then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '@@@@@@@@@@@@@@@@@@@@@@$$$$$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%%%%%VVVVVVVVV',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC22_Given-Zero-disclaimer-When-Email-is-ok-then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '%%%%%%%%VVVVVVVVV',
                'disclaimer': '0'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC23_Given-otherDomain&HostEmail-When-Email-is-ok-then-userSignup-passed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.ir`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '%%%%%%%%VVVVVVVVV',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC24_Given-extraBodyData-When-Email-is-ok-then-userSignup-failed', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': '1',
                'lname': '1',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': '1',
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': '',
                'password': '%%%%%%%%VVVVVVVVV',
                'disclaimer': '1',
                'test': '999999999999999988888888888888888ggggggggggggggggggggggxszxnnxnxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })




    })// End of signup describe
    describe('Header Check in Register a new User', async () => {

        it('TC1-Given-WrongHost-When-everything-is-ready-Then-userSignUp-faild', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
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



        it('TC2-Given-DuplicateHost-When-everything-is-ready-Then-userSignUp-faild', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
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


        it('TC3-Given-DuplicateHost-When-everything-is-ready-Then-userSignUp-faild', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response signup is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    done(err)
                })
        })


        it('TC4-Given-DuplicateHost-When-everything-is-ready-Then-userSignUp-faild', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 406, `\r\nExpected: ${406}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC5-Given-extraHeader-When-everything-is-ready-Then-userSignUp-faild', function (done) {
            this.timeout(8000);
            let fakeEmail = Math.floor(Math.random() * 10000);

            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'email': `test${fakeEmail}@gmail.com`,
                'phone': `${fakePhone}`,
                'time_zone': 'Eastern Time (US & Canada)',
                'organization_name': 'x+Scheduling',
                'password': '1234abcd',
                'disclaimer': '1'
            });

            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 406, `\r\nExpected: ${406}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })//end of Header check describe

    describe('Getting user details', async () => {

        it('TC1-Given-CorrectAuthToken-When-everything-is-ready-Then-Getting-user-details-successful', function (done) {
            this.timeout(8000);
            var config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/?auth_token=${Inquiry_auth_token}`,
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

        it('TC2-Given-incorrectAuthToken-When-everything-is-ready-Then-Getting-user-details-faild', function (done) {
            this.timeout(8000);
            var config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users?auth_token=`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-Given-incorrectAuthToken-When-everything-is-ready-Then-Getting-user-details-faild', function (done) {
            this.timeout(8000);
            var config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users?@@@@@auth_token=`,
                headers: ApiConfig.headers,

            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC4-Given-incorrectAuthToken-When-everything-is-ready-Then-Getting-user-details-faild', function (done) {
            this.timeout(8000);
            var config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users?auth_token=111111111111111111111111`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-Given-ExpiredAuthToken-When-everything-is-ready-Then-Getting-user-details-faild', function (done) {
            this.timeout(8000);
            var config = {
                method: 'GET',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users?auth_token=gxIQl4CNMOvVbvJ2s7JE8uOpveeZ2KbWjSHtUxQgJF/pDfT6vVQNPgS9vWInGZdvSSLywchpPTin5HPEU7jtQQ==`,
                headers: ApiConfig.headers,
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })// end of describe Getting user details



    describe('Deleting a User', async () => {

        it('TC1-Given-CorrectAuthToken-When-everything-is-ready-Then-User_Delete-successful', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'DELETE',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/6464`,
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

        it('TC2-Given-incorrectAuthToken-When-everything-is-ready-Then-User_Delete-details-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'DELETE',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/00000000000000000000000000000000000`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })

        })

        it('TC3-Given-incorrectAuthTokenAndCorrectUserID-When-everything-is-ready-Then-User_Delete-details-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'DELETE',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/6464`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC4-Given-EmptyAuthTokenAndUserID-When-everything-is-ready-Then-User_Delete-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'auth_token': ''
            });

            var config = {
                method: 'DELETE',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC5-Given-IncorrectAuthToken&ID-When-everything-is-ready-Then-User_Delete-failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'auth_token': 'TRY6h4oa4TRaTtp1VM0SXAY/JV5N3EBJw=='
            });

            var config = {
                method: 'DELETE',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/@@@@@@@@@@@@`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })// end of describe Deleting a User



    describe('Editing User Details', async () => {

        it('TC1-Given-CorrectAuthTokenAndCorrectUserID-When-everything-is-ready-Then-User-Edit-successful', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'get_email_news': 'True',
                'auth_token': Inquiry_auth_token
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/994`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    assert.equal(response.status, 202, `\r\nExpected: ${202}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    done()
                })
        })

        it('TC2-Given-CorrectAuthTokenAndWrongID-When-everything-is-ready-Then-User-Edit-Failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'get_email_news': 'True',
                'auth_token': '6zCpQVZUoSko/R78FoEuxZYuljkf5mO5c6asOp8fMJK33fR/ttZhvWEQjp8Glf/eOzhF8YoFUe4/pEEtwV6VFw=='
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/1`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



        it('TC3-Given-EmptyAuthToken-When-everything-is-ready-Then-User-Edit-Failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': 'John',
                'lname': 'Smith',
                'get_email_news': 'True',
                'auth_token': ''
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/1`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-Given-EmptyAuthToken&Emptyfname&Lname-When-everything-is-ready-Then-User-Edit-Failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': '',
                'lname': '',
                'get_email_news': 'True',
                'auth_token': ''
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/1`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        // Auth-token and id is ok, now api go for other fields
        it('TC5-Given-Emptyfname&Lname-When-everything-is-ready-Then-User-Edit-Failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': '',
                'lname': '',
                'get_email_news': 'True',
                "id": 994,
                'auth_token': 'zpMB6vaZRKVcL50sh/X7mMMZVfj/4S58bv/ry7T7oGwmiH0CNgkdOPlbzJ7qF4JOyMDJtuRCRHRLKDXGStOUDg=='
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/994`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC6-Given-WrongIDWrongLname&Fname-When-everything-is-ready-Then-User-Edit-Failed', function (done) {
            this.timeout(8000);
            var data = qs.stringify({
                'fname': '@@@@@@@@@@@',
                'lname': '++++++++12364',
                'get_email_news': '',
                "id": 0 - 2,
                'auth_token': 'zpMB6vaZRKVcL50sh/X7mMMZVfj/4S58bv/ry7T7oGwmiH0CNgkdOPlbzJ7qF4JOyMDJtuRCRHRLKDXGStOUDg==',
                "email": "",
            });

            var config = {
                method: 'PATCH',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/users/994`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })// end of Editing User Details

});

