const fs = require('fs');
const path = require('path');
const dataParsers = require('./parsers');

const FILE_TO_READ = path.resolve(__dirname, 'data', '2015-05_GeneralElection.json');

//load in dataSet
const dataSet = JSON.parse(fs.readFileSync(FILE_TO_READ, "utf8"));
const nationalPartyList = dataParsers.getListOfParties(dataSet);
const nationalSeatCount = dataParsers.getAvailableSeatCount(dataSet);


console.log('---------------------------------------\n');
//-------------------------------------------------------------------//
//                    FIRST PAST THE POST                            //
//-------------------------------------------------------------------//
const firstPastPost = require('./voteSystems/Plurality/firstPastPost.js');
const Constituencies = dataParsers.getConstituencyList(dataSet);

const FPP_results = Constituencies.reduce((acc, constituency)=>{
    //get applicants for that Constituency
    const constituencyData = dataParsers.filterByConstituency(dataSet, constituency);
    //get parties on that area:
    const partyVotes = dataParsers.getPartyVotesObject(constituencyData);
        //console.log(`Votes in ${constituency}`,partyVotes);
    //get winner for that constituency:
    const winner = firstPastPost(partyVotes);
    //Add to results
    acc[constituency] = winner;
    return acc;
},{});

const FPP_seatDistribution = Constituencies.reduce(
    (acc, constituency)=>{
        const winner = FPP_results[constituency];
        //increment that parties seat count
        acc[winner]++;
        return acc;
    }, //the start object is all party seats at 0
    nationalPartyList.reduce((acc,party)=>{acc[party] = 0; return acc;},{})
);
console.log('First Past post gave this distribution:\n',  dataParsers.getOrderedArrayFromTally(FPP_seatDistribution,'party', 'seatCount'));
console.log('---------------------------------------\n');

//-------------------------------------------------------------------//
//                Party List Proportional (national)                 //
//-------------------------------------------------------------------//

const nationalVotesPerParty = dataParsers.getPartyVotesObject(dataSet);
const dHondtSeatDistribution = require('./voteSystems/PartyListProportionalRepresentation/distributions/dHondt.js');
const PLP_dhondtNationalResults = dHondtSeatDistribution(nationalVotesPerParty, nationalSeatCount);
console.log('Party List Proportional at a national level gives:\n', dataParsers.getOrderedArrayFromTally(PLP_dhondtNationalResults,'party', 'seatCount'));
console.log('---------------------------------------\n');

//-------------------------------------------------------------------//
//             Party List Proportional (at County level)             //
//-------------------------------------------------------------------//
const counties = dataParsers.getListOfCounties(dataSet);

const PLP_dhondtCountyResults = counties.reduce((acc, county)=>{
    //Get just the data for this county
    const countyData = dataParsers.filterByCounty(dataSet, county);
    const countySeats = dataParsers.getAvailableSeatCount(countyData);
    const countyVotes = dataParsers.getPartyVotesObject(countyData);
    //use D'Hondt method to get seats assigned by this county
    const dHondtCountyResults = dHondtSeatDistribution(countyVotes, countySeats);

    //add results to accumulated results:
    const keys = Object.keys(dHondtCountyResults);
    keys.forEach((party)=>{
        if(!!acc[party]){   //if party has some previous results...
            acc[party] += dHondtCountyResults[party];       //...add the new ones
        } else {
            acc[party] = dHondtCountyResults[party];     //else, start them off
        }
    });

    return acc;
},{});
console.log('Party List Proportional at a county level gives:\n', dataParsers.getOrderedArrayFromTally(PLP_dhondtCountyResults,'party', 'seatCount'));
console.log('---------------------------------------\n');
