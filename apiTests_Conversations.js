const ApiConfig = require('./config');
const FuncAssis = require('./FuncAssis');
let assert = require('chai').assert;
const axios = require('axios');
var qs = require('qs');
axios.defaults.withCredentials = true

let Inquiry_auth_token = '';
let Inquiry_TeamId = '';


describe('XAi-Conversations', async () => {

    before('outer', async function () {
        this.timeout(8000);
        Inquiry_auth_token = await FuncAssis.getAuthToken()
        console.log('Inquiry_auth_token--' + JSON.stringify(Inquiry_auth_token))
    })

    //This lists all users that a user could contact with a conversation.
    describe('1- List a users contacts', async () => {
        it('TC1-Correct-UserData-When-everything-is-ready-Then-GettingUserContactList-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/contacts?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response UserContactList is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err UserContactList  is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-WrongMethod-Data-When-everything-is-ready-Then-GettingUserContactList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/contacts?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingUserContactList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/contacts?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-emptyAuthToken-Data-When-everything-is-ready-Then-GettingUserContactList-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/contacts?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

    describe('2- List a users conversations', async () => {
        it('TC1-Correct-UserData-When-everything-is-ready-Then-GettingUsersConversations-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-WrongMethod-Data-When-everything-is-ready-Then-GettingUsersConversations-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingUsersConversations-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-emptyAuthToken-Data-When-everything-is-ready-Then-GettingUsersConversations-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })
    })

    //Query a users’s contacts to only those in a filtered set.
    describe('3- Query a users contacts', async () => {
        it('TC1-3-Correct-QueryData-When-everything-is-ready-Then-QueryUsersContacts-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=${Inquiry_auth_token}&
                                         selectors[][type]=Team&selectors[][id]=19&
                                         selectors[][job_id]=257&
                                         selectors[][shift_option]=on_now&selectors[][shift_option]=off_now`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-3-Correct-QueryData-When-everything-is-ready-Then-QueryUsersContacts-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=${Inquiry_auth_token}&
                                         selectors[][type]=Team&selectors[][id]=19&
                                         selectors[][shift_option]=on_now&selectors[][shift_option]=off_now`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC3-3-Correct-QueryData-When-everything-is-ready-Then-QueryUsersContacts-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=${Inquiry_auth_token}&
                                         selectors[][shift_option]=on_now&selectors[][shift_option]=off_now`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC4-3-Correct-QueryData-When-everything-is-ready-Then-QueryUsersContacts-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };


            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC5-3-IncorrectAuthToken-Data-When-everything-is-ready-Then-QueryUsersContacts-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=0000000000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-3-emptyAuthToken-Data-When-everything-is-ready-Then-QueryUsersContacts-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/audience?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

    })

    describe('4- Replying to a conversation', async () => {
        it('TC1-Correct-UserData-When-everything-is-ready-Then-ReplyingConversation-is-Successfully', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-IncorrectConversationID-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/000000000/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-EmptyConversationID-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-LongConversationText-Data-When-everything-is-ready-Then-ReplyingConversation-is-Successfully', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-EmptyConversationText-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': '',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-WrongMethod-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC7-IncorrectAuthToken-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': '000000'
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC8-emptyAuthToken-Data-When-everything-is-ready-Then-ReplyingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': ''
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023/reply`,
                headers: ApiConfig.headers,
                data: data
            };


            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


    })

    describe('5- Retrieving conversation details', async () => {
        it('TC1-Correct-ConversationData-When-everything-is-ready-Then-GettingConversationsDetails-is-Successfully', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-IncorrectConversationID-Data-When-everything-is-ready-Then-GettingConversationsDetails-is-Failed', function (done) {
            this.timeout(8000);

            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/000000000?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC3-EmptyConversationID-Data-When-everything-is-ready-Then-GettingConversationsDetails-is-Successfully', function (done) {
            this.timeout(8000);

            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.status))
                    assert.equal(err.response.status, 422, `\r\nExpected: ${422}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-WrongMethod-Data-When-everything-is-ready-Then-GettingConversationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023?auth_token=${Inquiry_auth_token}`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-IncorrectAuthToken-Data-When-everything-is-ready-Then-GettingConversationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023?auth_token=0000`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-emptyAuthToken-Data-When-everything-is-ready-Then-GettingConversationsDetails-is-Failed', function (done) {
            this.timeout(8000);
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations/3023?auth_token=`,
                headers: ApiConfig.headers
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


    })

    describe('6- Starting a conversation', async () => {

        it('TC1-6-Correct-UserData-When-everything-is-ready-Then-StartingConversation-is-Successfully', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err   is->' + JSON.stringify(err.response.data) +
                        'with status Code=' + err.response.status);
                    done(err)
                })
        })

        it('TC2-6-LongSubjectText-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI TestingAPI Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })


        it('TC3-6-EmptySubjectText-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                // 'subject': '',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC4-6-LongConversationText-Data-When-everything-is-ready-Then-StartingConversation-is-Successfully', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.Sure,I can send it to you right away by API.',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC5-6-EmptyConversationText-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': '',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC6-6-WrongRecipientId-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '2300000000000000,6283,000000000000',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC7-6-EmptyRecipientId-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(8000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC8-6-WrongMethod-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(18000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': Inquiry_auth_token
            });
            var config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .then(response => {
                    console.log('response  is->' + JSON.stringify(response.data));
                    assert.equal(response.status, 200, `\r\nExpected: ${200}\r\nActual: ${JSON.stringify(response.status)}`);
                    done();
                })
                .catch((err) => {
                    console.log('err  is->' + JSON.stringify(err.response.status));
                    assert.equal(err.response.status, 404, `\r\nExpected: ${404}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC9-6-IncorrectAuthToken-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(18000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': '00000000000'
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };

            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })

        it('TC10-6-emptyAuthToken-Data-When-everything-is-ready-Then-StartingConversation-is-Failed', function (done) {
            this.timeout(18000);
            let data = qs.stringify({
                'subject': 'API Testing',
                'recipient_user_ids': '23,6283',
                'body': 'Sure,I can send it to you right away by API. ',
                'auth_token': ''
            });
            var config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${ApiConfig.targetUrl}/conversations`,
                headers: ApiConfig.headers,
                data: data
            };


            axios(config)
                .catch((err) => {
                    assert.equal(err.response.status, 401, `\r\nExpected: ${401}\r\nActual: ${JSON.stringify(err.response.status)}`);
                    done()
                })
        })



    })

});  //end of main describe

