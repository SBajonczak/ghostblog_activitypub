const express = require('express');
require('dotenv').config();

const outbox = require('./outbox')
const featrues = require('./featured')
const bodyParser = require('body-parser');
// Import express imddelware
const app = express();
const port = 3000;
const config = require('./consts')
const profile = require('./profile')
const follower = require('./followers')
const likehandler = require('./likes');
const inboxHandler = require('./inbox');
const featuredHandler = require('./featured');

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


app.get('/', (req, res) => {
    res.redirect(config.url.blogUrl);
});


// Benutzerobjekt erstellen
app.get('/activityPub/actors/:user', profile.Profile);
// Get follower handlers
app.get('/activitypub/actors/:user/following', follower.following);
app.get('/activitypub/actors/:user/followers', follower.followers);
// Route für Benutzerprofil
app.get('/activitypub/actors/:user/liked', likehandler.Liked);


app.get('/activityPub/actors/:user/inbox', inboxHandler.Inbox);


// Route für featrued
app.get('/activityPub/actors/:user/featured', featuredHandler.GetFeaturedPosts);
app.get('/activityPub/actors/:userId/outbox', outbox.OutboxRoute);

// WebFinger endpoint
app.get('/.well-known/webfinger', (req, res) => {
    const resource = req.query.resource;
    console.log("Got Finger Request with resource:", req.query.resource)
    if (!resource) {
        return res.status(400).json({ error: 'Resource parameter is required.' });
    }
    res.setHeader('Content-Type', 'application/jrd+json');

    // Generate WebFinger response
    const webFingerResponse = {
        subject: resource,
        aliases: [
            `${resource}`,
            `https://${config.url.rootDomain}/activityPub/actors/sascha`,
            'https://hachyderm.io/@Sascha',
            'https://hachyderm.io/users/Sascha'
        ],
        links: [
            {
                rel: 'http://webfinger.net/rel/profile-page',
                type: 'text/html',
                href: `${process.env.PROFILE_HOMEPAGE}`
            },
            {
                rel: 'self',
                type: 'application/activity+json',
                href: `https://${config.url.rootDomain}/activityPub/actors/sascha`
            },
            {
                rel: 'http://ostatus.org/schema/1.0/subscribe',
                template: 'https://hachyderm.io/authorize_interaction?uri={uri}'
            },
            {
                rel: 'avatar',
                href: `${config.url.images.AvatarImage}`,
                type: 'image/png',
            }],
    };

    res.json(webFingerResponse);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port} for configured domain ${config.url.blogDomain}`);
});
