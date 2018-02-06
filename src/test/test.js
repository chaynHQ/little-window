const addChatLog = require('../database/queries');
const test = require('tape');
const runDbBuild = require('../database/db_build');
const checkChat = require('./checkChat');

test('tape is working', t => {
    const num = 2;
    t.equal(num, 2, 'should return 2');
    t.end();
});

const dummyChat = {
    user: 'hello',
    bot: 'hi'
}

test('addChatLog is working', t => {
    runDbBuild((err, res) => {
        addChatLog(dummyChat).then(checkChat).then(res => {
            t.equal(res[0].id, 1, 'addChatLog is working')
            t.end();
        })
    })
})