//* LIB
const algoliasearch = require('algoliasearch');

//* IMPORT
const { NameIndex } = require('../common/index/cart');

const client = algoliasearch(process.env.APP_ID, process.env.ADMIN_API_KEY);

const index = client.initIndex(NameIndex);

module.exports = index;
