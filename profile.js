const config = require('./consts')
const ghostHandler = require('./ghostHandler');


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
        name: '',
        preferredUsername: '',
        url: '',
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
            publicKeyPem: `${config.url.publicKey}`
        }
    };
    return user;
}

exports.ProfileHandler = async function (req, res, next) {
    const acceptType = req.get('Accept')
    const user = req.params.user;
    console.log(`Got user request: ${acceptType} ${req.params.user}! Try to resolve ghost author `);
    // Fetch data from ghost blog
    const setting = await ghostHandler.GetBlogSettings();
    const authorsFromGhost = await ghostHandler.GetAuthorBySlug(req.params.user)

    const userResponse = GetProfilePayload(user)
    if (authorsFromGhost != null) {

        const authorFromGhost = authorsFromGhost.authors[0];
        console.log(authorFromGhost);
        userResponse.name = authorFromGhost.name;
        if (authorFromGhost.cover_image != null) {
            userResponse.image.url = authorFromGhost.cover_image;
        } else {
            if (setting.settings.cover_image != null) {
                userResponse.image.url = setting.settings.cover_image;
            }
            else {
                userResponse.image = null;
            }
        }
        if (authorFromGhost.profile_image != null) {
            userResponse.icon.url = authorFromGhost.profile_image;
        } else {
            userResponse.icon = null;
        }
    } else {
        // Getting profile image if not present.
        userResponse.image = null;
        userResponse.icon = null;

    }

    userResponse.url = setting.settings.url;


    if (acceptType && acceptType.includes('text/html') && !req.path.endsWith('.json')) {
        res.redirect(config.url.blogUrl)
        return
    }
    console.log("Sending JSON profile reponse");

    res.json(userResponse);
}