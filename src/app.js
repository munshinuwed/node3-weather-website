const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
      res.render('index', {
            title: 'Weather App',
            name: 'Nuwed'
      })
})

app.get('/about', (req, res) => {
      res.render('about', {
            title: 'About Me',
            name: 'Nuwed'
      })
})

app.get('/help', (req, res) => {
      res.render('help', {
            title: 'Help',
            name: 'Nuwed',
            msg: 'This is the help page'
      })
})


app.get('/weather', (req, res) => {
      const address = req.query.address
      if (!address) {
            res.send({
                  error: 'You must provide an address.'
            })
      } else {
            geocode(address, (error, { latitude, longitude, location } = {}) => {
                  if (error) {
                        return res.send({ error })
                  }
                  forecast(latitude, longitude, (error, forecastData) => {
                        if (error) {
                              return res.send({ error })
                        }
                        res.send({
                              forecast: forecastData,
                              location

                        })

                  })
            })

      }
})

app.get('/products', (req, res) => {
      res.send({
            products: []
      })
})

app.get('/help/*', (req, res) => {
      res.render('404', {
            title: '404',
            name: 'Nuwed',
            errorMessage: 'Help Article Not found'
      })
})


app.get('*', (req, res) => {
      res.render('error', {
            title: '404',
            name: 'Nuwed',
            errorMessage: 'Page Not Found'
      })
})

app.listen(port, () => {
      console.log('server is up on port ' + port)
})