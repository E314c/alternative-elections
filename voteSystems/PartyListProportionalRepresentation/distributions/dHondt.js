/**
    @param votes Object { ['party1']: voteCount, ['party2']: voteCount }
    @param seats count of available seats
    @returns object of { ['party1']: seatCount, ['party2']: seatCont }
*/
function dHondtSeatDistribution(votes, seats) {

    if(seats < 0){ throw('[dHondtSeatDistribution] Available seats must be >0');}

    /*modify the votes object for eaiser processing*/
    //get list of parties in set:
    const parties = Object.keys(votes);
    parties.forEach((party)=>{
        votes[party] = {
            votes: votes[party],
            seatCount: 0
        }
    });

    /*D'Hondt method for seat distribution*/
    while (seats > 0) {
        //get party with most weighted votes
        const seatWinner = parties.reduce((winner, otherParty)=>{
            if(determinePartyWeigtedVotes(votes[otherParty]) > determinePartyWeigtedVotes(votes[winner])){
                return otherParty;
            } else if(determinePartyWeigtedVotes(votes[otherParty]) === determinePartyWeigtedVotes(votes[winner])){
                //Tie breaker decided by which had the most total votes.
                return votes[otherParty].votes > votes[winner].votes ? otherParty : winner;
            }else {
                return winner;
            }
        },'');
        //assign the seat
        votes[seatWinner].seatCount++;
        seats--;
    }

    //reduce down to seat county
    parties.forEach((party)=>{
        votes[party] = votes[party].seatCount;
    });
    return votes;
}

function determinePartyWeigtedVotes(party) {
    return party ? party.votes/(party.seatCount+1) : 0 ;
}


module.exports= dHondtSeatDistribution;
