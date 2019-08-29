const request = require('request')

function geocode (address, callback)
{
    var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' 
    + encodeURIComponent(address)
    + '.json?access_token=pk.eyJ1IjoiYWxwaG9uc28wNiIsImEiOiJjanowcWJtbG8wMGhjM2NxbnVudTA4bmN5In0.Mfoh8YM17Aa3WLoutFUCRQ&limit=1'

    request({url, json: true}, function (error, {body:api})
    {
        if (error)
        {
            callback('Unable to connect to location services.' 
            + 'Check your network connection and try again.', undefined)
        }

        else if (api.features.length === 0)
        {
            callback('Location unavailable. Try another search', undefined)
        }

        else
        {
            callback(undefined, 
                {
                    longitude: api.features[0].center[0],
                    latitude: api.features[0].center[1],
                    location: api.features[0].place_name
                })
        }
    })
}

module.exports = geocode