const request = require('request')

function forecast (latitude, longitude, callback)
{
    const url = 'https://api.darksky.net/forecast/533530b2af746ad0947ca7465f236d30/' 
    + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, function (error, {body:api})
    {
        if (error)
        {
            callback('Unable to connect to weather services.' 
            + 'Please check your network connection and try again.', undefined)
        }

        else if (api.error)
        {
            callback('Location unavailable. Please check your coordinates and try again.')
        }

        else
        {
            callback(undefined, 
                api.currently.summary + '. It is currently ' 
                + api.currently.temperature + '°C out. ' 
                + 'There is ' + api.currently.precipProbability + '% chance to rain. '
                + 'Wind speed is at ' + api.currently.windSpeed + 'm/s.')
        }
    })
}

module.exports = forecast