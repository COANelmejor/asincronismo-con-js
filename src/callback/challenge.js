const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const API = 'https://rickandmortyapi.com/api/character/';


function fetchData(url, callback) {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, true);
    xhttp.onreadystatechange = function(event) {
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error(`Error ${url}`);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

fetchData(API, function(error1, data1) {
    console.log('Pidiendo personajes...');
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2) {
        console.log('Pidiendo personaje...');
        if (error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3, data3) {
            console.log('Pidiendo origen...');
            if (error3) return console.error(error3);
            console.log('==========');
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        })
    })
})