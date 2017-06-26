/**
 * Created by ehsan on 6/13/17.
 */
const https = require('https');
var q = require('q');

var PersistingService = require('./data-persist.service.server')();

setInterval(importUpdates, (60*1000));

var NEXT_FETCH_ID = 1;

function importUpdates() {
    console.log('going to make request');
    doRequest()
        .then(
            function (response) {
                if(response.ok) {
                    var importedData = response.result;
                    if(importedData.length > 0) {
                        NEXT_FETCH_ID = parseInt(importedData[importedData.length - 1].update_id) + 1;
                    }
                    PersistingService
                        .persistImportedData(importedData);
                }
            }
        );
}

function doRequest() {
    var deferred = q.defer();
    https.get({
        host: 'api.telegram.org',
        path: '/bot373205519:AAGhSpu9yi4QmkB_HgY1LedhnNDmxQkxxWc/getUpdates?offset=' + NEXT_FETCH_ID,
        headers: {
            "Accept": "application/json"
        }
    }, function(response) {
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {
            try {
                body = JSON.parse(body);
                deferred.resolve(body);
            } catch(e) {
                deferred.reject({error: e});
            }
        });
    });
    return deferred.promise;
}