const express = require('express');
// Import express imddelware
const app = express();
const port = 3000;

require('dotenv').config();

const fs = require('fs');
const wellknownHandler = require('./wellknown');
const outbox = require('./outbox')
const featrues = require('./featured')
const bodyParser = require('body-parser');
const config = require('./consts')
const profile = require('./profile')
const follower = require('./followers')
const likehandler = require('./likes');
const inboxHandler = require('./inbox');
const featuredHandler = require('./featured');
const googlehandler = require('./googlehandler');
// Middleware for parsing JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({ type: 'application/activity+json' })) // support json encoded bodies


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*'])
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    res.append('Access-Control-Allow-Headers', 'Content-Type')
    next()
})


// deny all post requrests
app.post('*', (req, res) => {
    res.status(404)
    res.send('Resource not found')
})


app.use('/activitypub/img', express.static('img'))


const addtxtFilepath = __dirname + '/add.txt';
app.use(express.static(__dirname));


app.get('/', (req, res) => {
    res.redirect(config.url.blogUrl);
});


// Benutzerobjekt erstellen
app.get('/activityPub/actors/:user', profile.ProfileHandler);
// Get follower handlers
app.get('/activitypub/actors/:user/following', follower.following);
app.get('/activitypub/actors/:user/followers', follower.followers);
// Route für Benutzerprofil
app.get('/activitypub/actors/:user/liked', likehandler.Liked);


app.get('/activityPub/actors/:user/inbox', inboxHandler.InboxHandler);


// Route für featrued
app.get('/activityPub/actors/:user/featured', featuredHandler.GetFeaturedPosts);
app.get('/activityPub/actors/:user/outbox', outbox.OutboxHandler);
// WebFinger endpoint
app.get('/.well-known/webfinger', wellknownHandler.WellknownHandler);
// app.get('/add.txt', googlehandler.HandleAddTxt);

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} for configured domain ${config.url.blogDomain}`);
});
