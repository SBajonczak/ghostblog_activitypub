const config = require('./consts');
const ghostHandler= require('./ghostHandler');

exports.WellknownHandler =  async function (req, res, next) {
    const resource = req.query.resource;
    console.log("Got Finger Request with resource:", req.query.resource)
    if (!resource) {
        return res.status(400).json({ error: 'Resource parameter is required.' });
    }
    res.setHeader('Content-Type', 'application/jrd+json');


    let plainuser = resource.split('@')[0];
    if (plainuser.indexOf(':') >= 0) {
        plainuser = plainuser.split(':')[1];
    }

    const setting = await  ghostHandler.GetBlogSettings();
    const users = await  ghostHandler.GetAuthorBySlug(plainuser);
    // Set profilepage, first set default one, given by the config
    let profilePage= process.env.PROFILE_HOMEPAGE
    let avatarimage= config.url.images.AvatarImage;
    if (users!= null){
        const user= users.authors[0];
        profilePage= user.url;
        avatarimage= user.profile_image;
    }

    // Generate WebFinger response
    const webFingerResponse = {
        subject: resource,
        aliases: [
            `${resource}`,
            `https://${config.url.rootDomain}/activityPub/actors/${plainuser}`,
        ],
        links: [
            {
                rel: 'http://webfinger.net/rel/profile-page',
                type: 'text/html',
                href: `${profilePage}`
            },
            {
                rel: 'self',
                type: 'application/activity+json',
                href: `https://${config.url.rootDomain}/activityPub/actors/${plainuser}`
            },
            {
                rel: 'http://ostatus.org/schema/1.0/subscribe',
                template: 'https://hachyderm.io/authorize_interaction?uri={uri}'
            },
            {
                rel: 'avatar',
                href: `${avatarimage}`,
                type: 'image/png',
            }],
    };

    res.json(webFingerResponse);
}