/**
 * A Collection of parse functions, designed around the 2015-05 election data, to retreive certain information
*/

const partyRelatedParsers = require('./partyRelated.js');
const geographicParsers = require('./geographic.js');
const seatObjectParsers = require('./seatObjectParser.js');

//Export them all!
module.exports = Object.assign(
    {},
    partyRelatedParsers,
    geographicParsers,
    seatObjectParsers
);
