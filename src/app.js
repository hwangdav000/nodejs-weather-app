const geocode = require('./utils/geocode'); // file extension is optional
const forecast = require('./utils/forecast');

const path = require('path')
const express = require('express')
const hbs = require('hbs');

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs');
// take path to where partials live
hbs.registerPartials(partialsPath)


// setup static directory to serve public assets
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    // renders view (no need for file extension)
    res.render('index', {
        title: 'Weather App',
        name: 'David Hwang'
    })
})

app.get('/about', (req, res) => {
    // renders view (no need for file extension)
    res.render('about', {
        title: 'About Page',
        name: 'David Hwang'
    })
})

app.get('/help', (req, res) => {
    // renders view (no need for file extension)
    res.render('404', {
        errorMessage: 'Help article not found',
        title: '404',
        name: 'David Hwang'
    })
})

app.get('/weather', (req, res)=> {
    if (!req.query.address) {
        res.send({
            error: "Must provide an address"
        })
    }
    else {
        geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({
                    error: "Error getting address"
                })
            } else {   

                forecast(latitude, longitude, (error, {description, degrees, feel} = {}) => {
                    if (error) {
                        res.send({
                            error: "Error getting data"
                        })
                    } else {
                    
                        let forecast = description + ". It is currently " + degrees + " degrees out.\nIt feels like " + feel + " degrees out."
                        res.send({
                            location: location,
                            description: description,
                            degrees: degrees,
                            feel: feel,
                            forecast: forecast,
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res)=> {
    if (!req.query.search) {
        res.send({
            error: 'You must provide search term'
        })

    }

    console.log(req.query.search)
    res.send([{
        products:[]
    }])
})

// match anything that has been matched so far
app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        errorMessage: 'This is an Error',
        name: 'David Hwang'
    })
})
// starts up server
// stay up and running until we stop
app.listen(3000, () => {
    console.log('server is up on port 3000')
});