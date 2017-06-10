/**
    @param votes Object { ['party1']: voteCount, ['party2']: voteCount }
    @param seats count of available seats
*/
function firstPastPost(votes) {
    //it's just who had the most....
    const parties = Object.keys(votes);
    return parties.reduce((winner, otherParty)=>{
        if(!votes[winner]){ //if current winner is undefined in votes ( or got zero votes )
            return otherParty;
        } else {
            return votes[otherParty] > votes[winner] ? otherParty : winner;
        }
    },'');
}


module.exports= firstPastPost;
