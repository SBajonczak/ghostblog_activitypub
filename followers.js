const ghostHandler = require('./ghostHandler');
const config = require('./consts');

exports.followers = async function (req, res, next) {
    const user = req.params.user;
    console.log("Got followers request for " + user);
    const authors = await ghostHandler.GetAuthors()
    console.log(JSON.stringify(authors));
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    const result = {

        '@context': "https://www.w3.org/ns/activitystreams",
        id: `https://${config.url.rootDomain}/activitypub/actors/${user}/followers`,
        type: "OrderedCollection",
        totalItems: 0,
        first: null
    }

    res.json(result);

}

exports.following = async function (req, res, next) {
    const user = req.params.user;
    console.log("Got following request for " + user);
    console.log("Sending JSON");
    const result = {

        '@context': "https://www.w3.org/ns/activitystreams",
        id: `https://${config.url.rootDomain}/activitypub/actors/${user}/following`,
        type: "OrderedCollection",
        totalItems: 0,
        first: null
    }

    res.json(result);

}



