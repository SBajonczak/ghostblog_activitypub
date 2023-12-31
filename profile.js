const config = require('./consts')



function GetProfilePayload(username) {
    const user = {
        '@context': ['https://www.w3.org/ns/activitystreams',
            "https://w3id.org/security/v1",
            {
                PropertyValue: "schema:PropertyValue",
                value: "schema:value",
                toot: "http://joinmastodon.org/ns#",
                discoverable: "toot:discoverable",
                Hashtag: "as:Hashtag",
                featured: {
                    '@id': "toot:featured",
                    '@type': "@id"
                },
                alsoKnownAs: {
                    '@id': "as:alsoKnownAs",
                    '@type': "@id"
                },
                publicKeyBase64: "toot:publicKeyBase64"
            }
        ],
        type: 'Service',
        id: `https://${config.url.rootDomain}/activityPub/actors/${username}`,
        name: 'sascha',
        preferredUsername: 'sascha',
        url: 'https://blog.bajonczak.com',
        summary: 'Blogger, Father, Beekeper, Iot passionist.',
        following: `https://${config.url.rootDomain}/activitypub/actors/${username}/following`,
        followers: `https://${config.url.rootDomain}/activitypub/actors/${username}/followers`,
        featured: `https://${config.url.rootDomain}/activitypub/actors/${username}/featured`,
        liked: `https://${config.url.rootDomain}/activitypub/actors/${username}/liked`,
        inbox: `https://${config.url.rootDomain}/activityPub/actors/${username}/inbox`,
        outbox: `https://${config.url.rootDomain}/activityPub/actors/${username}/outbox`,
        manuallyApprovesFollowers: false,
        discoverable: true,
        attachment: [
            {
                "type": "PropertyValue",
                "name": "Website",
                "value": `<a href=\"${config.url.blogUrl}\" target=\"_blank\" rel=\"nofollow noopener noreferrer me\"><span class=\"invisible\">https://</span><span class=\"\">${config.url.blogDomain}</span><span class=\"invisible\"></span></a>`
            }
        ],
        icon: {
            type: "Image",
            mediaType: "image/png",
            url: `${config.url.images.AvatarImage}`
        },
        image: {
            type: "Image",
            mediaType: "image/png",
            url: `${config.url.images.AvatarIcon}`
        },

        publicKey: {
            id: `https://${config.url.rootDomain}/activitypub/actors/${username}#main-key`,
            owner: `https://${config.url.rootDomain}/activitypub/${username}/sascha`,
            publicKeyPem: "-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3X8NZQk2NP/IVL+l62fTL/WMVuiNOoeoZSB8UTs6ESTBjqqqm7T8aVwv+oFQfdOBHrcROu4TyFGj5BGuNVv9P1af/bFwNqwkG0HPxFcFjYmaWyH6p7Z9uwMQa+HAADyVovUuETeeG5wqS3PeD5Fs0sAZg2kEIqBm5RJ/PfCxPsE7ng517QLIiIlT4BbWMWF/q0MhTHZvTtMMjgN5E05UINv0b3e24bX2+dvmEl5+SI+9DEDsCZqi76pODOBN/+ONQ03JcoowM8j2//3IzcnXqG3OcVx9FBOoMKYiuwns9jLWsnlWvdRUXSMZsF+cYgO0HF9bXwBrgvOMAltEPxwzlQIDAQAB-----END PUBLIC KEY-----"
        }
    };
    return user;
}

exports.Profile = async function (req, res, next) {

    const acceptType = req.get('Accept')    
    const user = req.params.user;
    console.log("Got user request: " + acceptType, req.params.user);

    if (acceptType && acceptType.includes('text/html') && !req.path.endsWith('.json')) {
        res.redirect(config.url.blogUrl)
        return
    }
    console.log("Sending JSON profile reponse");

    res.json(GetProfilePayload(user));
}