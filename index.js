'use strict';

const apiKey = 'wJMtqDzxvqOqVSCAYqRyeyg5Ip5cYrzPRR015y2A'
const searchUrl =  'https://api.nps.gov/api/v1/parks';

function getParks(states, maxResults) {

fetch(searchUrl + GetQueryParams(states,maxResults,apiKey))
.then(response => response.json())
.then(responseJson =>
displayResults(responseJson))
.catch(error => {console.log(error);
$("#searchBtn").val('SEARCH');
$('.result-parks').empty();
$('.result-parks').append(`<h2>An error has occured. Try again later.</h2>`);
});

}

function GetQueryParams(states,maxResults,apiKey){
states = encodeURIComponent(states);
maxResults = encodeURIComponent(maxResults);
apiKey = encodeURIComponent(apiKey);
return `?stateCode=${states}&limit=${maxResults}&api_key=${apiKey}`;
}

function displayResults(responseJson) {

let resultsTotal = 0;
if (parseInt(responseJson.total) > parseInt(responseJson.limit)) {
resultsTotal = responseJson.limit;

} else {
resultsTotal = responseJson.total;

}
$('.result-parks').empty(); 
if (resultsTotal == 0) {
$("#searchBtn").val('SEARCH');
$('.result-parks').append(`<h2>Something went wrong. Try again.</h2>`);
return
}

for (let index=0; index<resultsTotal; index++) {

const address = responseJson.data[index].addresses.length>0?`
<p>${responseJson.data[index].addresses[0].city?responseJson.data[index].addresses[0].city:""}</p>
<p>${responseJson.data[index].addresses[0].line2}</p>
<p>${responseJson.data[index].addresses[0].stateCode}</p>
<p>${responseJson.data[index].addresses[0].postalCode}</p>`:""
$('.result-parks').append(`
<h2>${responseJson.data[index].fullName}</h2>
${address}
<p>${responseJson.data[index].description}</p>
<a target="_blank" href=${responseJson.data[index].url}>For park website click here</a>
<br>`);

}
$("#searchBtn").val('SEARCH');
}

function watchForm() {
$('form').submit(event => {
event.preventDefault();
const state = $('#js-state').val();
const max = $('#js-maxResults').val();
$("#searchBtn").val('Searching...');
getParks(state, max);
});
}

$(watchForm);