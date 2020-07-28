'use strict';

const apiKey = 'wJMtqDzxvqOqVSCAYqRyeyg5Ip5cYrzPRR015y2A'

function getParks(states, maxResults) {
    fetch(`https://api.nps.gov/api/v1/parks?stateCode=${states}&limit=${maxResults}&api_key=${apiKey}`)
    .then(response => response.json())
    .then(responseJson =>
        displayResults(responseJson))
    .catch(error => {console.log(error);
        $('.result-parks').empty();
        $('.result-parks').append(`<h2>An error has occured. Try again later.</h2>`);
    });

}

function displayResults(responseJson) {

    let resultsTotal = 0;
    if (parseInt(responseJson.total) > parseInt(responseJson.limit)) {
      resultsTotal = responseJson.limit;
      
    } else {
      resultsTotal = responseJson.total;
      
    }
    $('.result-parks').empty(); //show messages over and over again
    if (resultsTotal == 0) {
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
}
    
function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const state = $('#js-state').val();
        const max = $('#js-maxResults').val();
        
        getParks(state, max);
    });
}

$(function() {
    
    watchForm();
})
