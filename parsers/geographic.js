/**
* Geography related parsers
*/

function getListOfCounties(data){
    return data.reduce((acc, applicant)=>{
        if(!acc.includes(applicant.County)) {
            acc.push(applicant.County);
        }
        return acc;
    },[]);
}

function getAvailableSeatCount(data){
    return filterNonDuplicateConstituency(data).length;
}

function getAvailableSeatCountForCounty(data, county){
    return getAvailableSeatCount(filterByCounty(data, county));
}

function getConstituencyList(data){
    return data.reduce((acc, applicant)=>{
        if(!acc.includes(applicant["Constituency Name"])) {
            acc.push(applicant["Constituency Name"]);
        }
        return acc;
    },[]);
}

function filterByCounty(data, county){
    return data.reduce((acc, applicant)=>{
        if(applicant.County === county) {
            acc.push(applicant);
        }
        return acc;
    },[]);
}

function filterByConstituency(data, constituency){
    return data.reduce((acc, applicant)=>{
        if(applicant["Constituency Name"] === constituency) {
            acc.push(applicant);
        }
        return acc;
    },[]);
}

function filterByConstituencyId(data, constituencyId){
    return data.reduce((acc, applicant)=>{
        if(applicant["Constituency ID"] === constituencyId) {
            acc.push(applicant);
        }
        return acc;
    },[]);
}

function filterNonDuplicateConstituency(data){
    let ConstituenciesSeen = [];
    return data.reduce((acc, applicant)=>{
        if(!ConstituenciesSeen.includes(applicant["Constituency ID"])) {
            acc.push(applicant);
            ConstituenciesSeen.push(applicant["Constituency ID"]);
        }
        return acc;
    },[]);
}

module.exports = {
    getListOfCounties,
    getAvailableSeatCount,
    getAvailableSeatCountForCounty,
    getConstituencyList,
    filterByCounty,
    filterByConstituency,
    filterByConstituencyId,
    filterNonDuplicateConstituency
};
