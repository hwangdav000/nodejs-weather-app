const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=30dc1c4fa23b273f491620a79166a521&query=' + lat + ',' + long + '&units=f'

    request({ url: url , json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if (body.error) {
            callback('Unable to find location' + '\nlat: ' + lat + '\nlong: ' + long);
        } else {
            let degrees = body.current.temperature;
            let feel = body.current.feelslike;
            let description = body.current.weather_descriptions[0];
            callback(undefined, {
                degrees:degrees,
                feel: feel,
                description: description,
            });
        }
    })
}

module.exports = forecast;