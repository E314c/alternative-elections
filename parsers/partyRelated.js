/**
* Party related parsers for the dataset objects
*/

function getMapOfPartyCodeToPartyName(data) {
    return data.reduce((acc,applicant)=>{
        return Object.assign(acc, {[applicant["Party abbreviation"]]: applicant["Party name identifier"]});
    },{});
}

function getTotalVotesForParty(data, partyName){
    return data.reduce((acc, applicant)=>{
        if(applicant["Party name identifier"] === partyName){
            acc += parseInt(applicant.Votes);
        }
        return acc;
    },0);
}

function getListOfParties(data){
    return data.reduce((acc, applicant)=>{
        if(!acc.includes(applicant["Party name identifier"])) {
            acc.push(applicant["Party name identifier"]);
        }
        return acc;
    },[]);
}

function getPartyVotesObject(data){
    const parties = getListOfParties(data);
    return parties.reduce((votes, party)=>{
        votes[party] = getTotalVotesForParty(data,party);
        return votes;
    },{});
}

function filterByPartyName(data, partyName){
    return data.reduce((acc, applicant)=>{
        if(applicant["Party name identifier"] === partyName){
            acc.push(applicant);
        }
        return acc;
    });
}

module.exports = {
    getMapOfPartyCodeToPartyName,
    getTotalVotesForParty,
    getListOfParties,
    getPartyVotesObject,
    filterByPartyName
};
