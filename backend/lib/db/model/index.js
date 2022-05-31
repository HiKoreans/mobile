const user = require('./user');
const board = require('./board');
const bComment = require('./bComment');
const secondhand = require('./secondhand');
const shComment = require('./shComment');
const recruitment = require('./recruitment');

const modelList = [
    'user',
    'board',
    'bComment',
    'secondhand',
    'shComment',
    'recruitment',
];

module.exports = {
    modelDefines : {
        user,board, bComment, secondhand, shComment, recruitment
    },
    modelList
}