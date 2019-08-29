// Imports
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Express Config
const app = express()
const port = process.env.PORT || 3000 //--> IMPORTANT FOR ONLINE DEPLOYMENT
const publicDirectory = path.join(__dirname, '..\\public')
app.use(express.static(publicDirectory))
const viewsPath = path.join(__dirname, '..\\templates\\views')//-> sets up the main hbs pages directory
const partialsPath = path.join(__dirname, '..\\templates\\partials')//-> sets up all the hbs partials

// Express Handlebars
const viewEngine = 'view engine'
const handlebars = 'hbs'
app.set(viewEngine, handlebars)
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Global Vars

// Routes
const routes =
{
    home: '',
    about: '/about',
    help: 
    {
        base: '/help',
        test: this.base + '/test'
    },
    weather: '/weather'
}

// Web Pages
app.get(routes.home, function (req, res)
{
    res.render('index', 
    {
        title: 'Weather App',
        name: 'Mikael Evangelista'
    })
})

app.get(routes.about, function (req, res)
{
    res.render('about',
    {
        title: 'About',
        name: 'Mikael Evangelista'
    })
})

app.get(routes.help.base, function (req, res)
{
    var title = 'Help'
    var name = 'Mikael Evangelista'

    res.render('help', 
    {
        title,
        name
    })
})

app.get(routes.weather, function(req, res)
{
    if (!req.query.address)
    {
        return res.send({
            error
        })
    }
    
    geocode(req.query.address, function (error, mapbox = {})
    {
        if (error)
        {
            // Display error from geocode's request param
            return res.send({ error })
        }

        forecast(mapbox.latitude, mapbox.longtitude, function (error, darksky)
        {
            if (error)
            {
                return res.send({
                    error
                })
            }

            res.send({
                location: mapbox.location,
                summary: darksky,
                address: req.query.address
            })
        })
    })
})

app.get('/products', function (req, res)
{
    if (!req.query.search)
    {
        return res.send({
            error: 'Please provide a search term'
        })
    }
    console.log(req.query.search)

    res.send({
        products: []
    })
})

app.get(routes.help.base + '/*', function (req, res)
{
    res.render('404',
        {
            title: 'Help',
            titlebar: 'Article not found',
            error: 'The help article you are looking for does not exist.',
            name: 'Mikael Evangelista'
        })
})

// 404 Page (must be placed last in the route list)
app.get('*', function (req, res)
{
    res.render('404',
    {
        title: 'Weather App',
        titlebar: 'Page not found.',
        error: 'The resource you requested has either moved or does not exist.',
        name: 'Mikael Evangelista'
    })
})

// Listening Server
app.listen(port, function ()
{
    console.log('Check out the server at localhost port' + port)
})