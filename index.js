'use strict';

const apiKey = 'wJMtqDzxvqOqVSCAYqRyeyg5Ip5cYrzPRR015y2A'

function getParks(states, maxResults) {
    fetch(`https://api.nps.gov/api/v1/parks?stateCode=${states}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
    .catch(error => console.log(error));
}

function displayResults(responseJson) {

    let resultsTotal = 0;
    if (responseJson.total > responseJson.limit) {
      resultsTotal = responseJson.limit;
    } else {
      resultsTotal = responseJson.total;
    }

        console.log(responseJson);
        $('.result-parks').empty();
        for (let index=0; index<resultsTotal; index++) {
            console.log("index" + index);
            let address = responseJson.data[index].addresses.length>0?`
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
}
    
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        let state = $('#js-state').val();
        let max = $('#js-maxResults').val();
        console.log(state);
        console.log(max);
        getParks(state, max);
    });
}

$(function() {
    console.log('App loaded! Waiting for submit!');
    watchForm();
})
