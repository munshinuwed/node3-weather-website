const request = require('request')


const forecast = (latitude, longitude, callback) => {
      const url = 'http://api.weatherstack.com/current?access_key=e60f8acabb047727007fa747b4649756&query=' + latitude + ',' + longitude + '&units=m'
      request({ url, json: true }, (error, { body }) => {

            if (error) return callback('Unable to connect to weather service.', undefined)
            else if (body.error) callback('unable to find location', undefined)
            else {
                  desc = body.current.weather_descriptions[0]
                  temp = body.current.temperature
                  feelsLike = body.current.feelslike
                  forecastString = desc + '.It is currently ' + temp + ' degrees out.It Feels like ' + feelsLike + ' in ' + body.location.name
                  callback(undefined, forecastString)

            }
      })
}


module.exports = forecast