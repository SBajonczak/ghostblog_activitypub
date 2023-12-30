const express = require('express');
const outbox = require('./outbox')
const bodyParser = require('body-parser');
// Import express imddelware
const { Actor, HttpService } = require('activitypub');
const axios = require('axios');
const ghostApiEndpoint = 'https://blog.bajonczak.com/ghost/api/v4/content/posts/';
const app = express();
const port = 3000;

// Middleware for parsing JSON
app.use(bodyParser.json());



app.post('/activitypub/inbox', async (req, res) => {
    const { body } = req;
  
    try {
      const result = await actor.receive(body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

app.get('/', (req, res) => {
    res.send('');
});



// Benutzerobjekt erstellen
const user = {
    '@context': 'https://www.w3.org/ns/activitystreams',
    type: 'Person',
    id: 'https://example.com/activityPub/users/sascha',
    name: 'Sascha',
    preferredUsername: 'Sascha',
    summary: 'Blogger, Fahter, Beekeper, Iot passionist',
    inbox: 'https://bajonczak.com/activityPub/users/alice/inbox',
    outbox: 'https://bajonczak.com/activityPub/users/alice/outbox',
  };

// Route für Benutzerprofil
app.get('/activityPub/users/:user', (req, res) => {
    const userId = req.params.user;
    if (userId.toLowerCase() !== 'sascha') {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user);
  });

  function myJson(data) {
    return JSON.stringify(data, null, 2);
  }
  


  

// Get inbox and outbox

  app.get('/activityPub/users/:user/inbox', (req, res) => {
    const inboxData = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      summary: 'Inbox for Sascha',
      type: 'OrderedCollection',
      totalItems: 0,
      orderedItems: [],
    };
    res.setHeader('Content-Type', 'application/jrd+json');
  
    res.send(myJson(inboxData));
  });
  
  // Route für Outbox
  app.get('/activityPub/users/:user/outbox', async (req, res) => {
    var posts= await outbox.GetOutboxFiles();
    console.log(posts);
    const outboxData = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      summary: 'Outbox for Sascha',
      type: 'OrderedCollection',
      totalItems: 0,
      orderedItems: posts,
    };
    res.setHeader('Content-Type', 'application/jrd+json');
  
    res.send(myJson(outboxData));
  });


  // WebFinger endpoint
app.get('/.well-known/webfinger', (req, res) => {
    const resource = req.query.resource;

    if (!resource) {
        return res.status(400).json({ error: 'Resource parameter is required.' });
    }
    res.setHeader('Content-Type', 'application/jrd+json');

    // Generate WebFinger response
    const webFingerResponse = {
        subject: resource,
        aliases: [
            'https://hachyderm.io/@Sascha',
            'https://hachyderm.io/users/Sascha'
        ],
        links: [
            {
                rel: 'http://webfinger.net/rel/profile-page',
                type: 'text/html',
                href: 'https://hachyderm.io/@Sascha'
            },
            {
                rel: 'self',
                type: 'application/activity+json',
                href: 'https://bajonczak.com/activityPub/users/Sascha'
            },
            {
                rel: 'http://ostatus.org/schema/1.0/subscribe',
                template: 'https://hachyderm.io/authorize_interaction?uri={uri}'
            },
            {
                rel: 'http://schemas.google.com/g/2010#updates-from',
                href: 'https://mastodon.social/@sashca',
                type: 'application/activity+json',
            },
            {
                rel: 'avatar',
                href: `https://blog.bajonczak.com/content/images/2022/10/20221014_171637.png`,  
                type: 'image/png',
              },
            {
                rel: 'alternate',
                type: 'application/rss+xml',
                href: 'https://blog.bajonczak.com/rss/',
            }],
    };

    res.json(webFingerResponse);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
