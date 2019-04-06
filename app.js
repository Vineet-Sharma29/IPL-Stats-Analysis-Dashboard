const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const db = require('./queries')
const port = 3000

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json()) 
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors())

app.get('/runs', db.getPlayers)

app.post('/year', db.getByYear)

app.get('/four',db.getCountFour)

app.post('/four/year',db.getCountFourYear)

app.get('/six',db.getCountSix)

app.post('/six/year',db.getCountSixYear)

app.get('/man-of-the-match',db.getManOfTheMatch)

app.post('/man-of-the-match/year',db.getManOfTheMatchYear)

app.get('/successful-teams',db.successfulTeams)

app.post('/successful-teams/year',db.successfulTeamsYear)

app.get('/toss',db.tossTrue)

app.post('/toss/year',db.tossTrueYear)

app.get('/decision',db.tossDecision)

app.post('/decision/year',db.tossDecisionYear)

app.get('/dots',db.getDots)

app.post('/dots/year',db.getDotsYear)

app.get('/extras',db.getExtra)

app.post('/extras/year',db.getExtraYear)

//Handle production

if(process.env.NODE_ENV === 'production' ){
    app.use(express.static(__dirname+'/public/'))

    //Handle SPA
    app.get(/.*/, (request, response) => response.sendFile(__dirname+'/public/index.html') );
}

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
