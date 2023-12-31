const config = require('./consts') 

exports.Liked = async function (req, res, next) 
{
    const user= req.params.user;
    console.log("Got liked request for " + user);

    const result = {
        '@context': [
            "https://www.w3.org/ns/activitystreams",
            {
                toot: "http://joinmastodon.org/ns#",
                discoverable: "toot:discoverable",
                Hashtag: "as:Hashtag"
            }
        ],
        id: `https://${config.url.rootDomain}/activitypub/actors/${user}/liked`,
        type: "OrderedCollection",
        totalItems: 0,
        first: null,
        last: null,
        orderedItems: []
    }

    res.json(result);
}