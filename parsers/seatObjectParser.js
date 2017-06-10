/**
Functions used to convert objects in the form { [partyName]: seatCount, [partyName]: seatCount, ...}
*/

function getOrderedArrayFromTally(dataObject,keyName, valueName){
    const keys = Object.keys(dataObject);
    return keys.reduce((acc, key)=>{
        const value = dataObject[key];

        //I'm gonna filter out 0 seats:
        if(value < 1){return acc;}

        //insert at appropriate area of array:
        if(acc.length === 0) {
            return [{[keyName]: key, [valueName]: value}];
        }
        //  start at middle:
        let min = 0;
        let max = acc.length;
        let mid = Math.floor((max-min)/2);

        do{
            if( value >= acc[mid][valueName]) {
                max = mid ;
            } else {
                min = mid + 1;
            }
            mid = min + Math.floor((max-min)/2);
        } while(min !== max);

        //insert at position
        acc.splice(mid, 0, {[keyName]: key, [valueName]: value});
        return acc;
    },[]);
}


module.exports={getOrderedArrayFromTally}
