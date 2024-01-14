const ghostHandler = require('./ghostHandler');
const config = require('./consts')

function ConvertToPubArticle(post, userid) {
    const data =
    {
        '@context': [
            'https://www.w3.org/ns/activitystreams',
            {
                Hashtag: "as:Hashtag",
                toot: "http://joinmastodon.org/ns#"
            }
        ],
        id: `https://${config.url.rootDomain}/activitypub/actors/${userid}/${post.id}`,
        published: post.created_at,
        sensitive: false,
        summary: post.excerpt,
        visibility: "public",
        language: "en",
        uri: `https://${config.url.rootDomain}/activitypub/actors/${userid}/${post.id}`,
        url: post.url,
        atomUri: post.url,
        content: post.html,
        type: "Article",
        to: [
            "https://www.w3.org/ns/activitystreams#Public"
        ],
        cc: [
            `https://${config.url.rootDomain}/activitypub/actors/${userid}/followers`
        ],
        attributedTo: `https://${config.url.rootDomain}/activitypub/actors/${userid}`,
        tag: []
    };
    post.tags.forEach(tag => {
        data.tag.push(
            {
                type: "Hashtag",
                href: `${config.url.tags}${tag.name}`,
                name: "#" + tag.name
            }
        )

    });
    return data;
}

async function GetOutboxFiles(userid) {
    const posts = await ghostHandler.GetPostsFromGhost();
    const result = [];
    posts.forEach(post => {
        if (post.primary_author.slug == userid) {
            const data = ConvertToPubArticle(post, userid);
            result.push(data);
        }

    });  // end foreach
    return result;
}



exports.OutboxHandler = async function (req, res, next) {
    console.log("Got outbox request:", req.params.user)


    var posts = await GetOutboxFiles(req.params.user);

    const outboxData = {
        '@context': [
            'https://www.w3.org/ns/activitystreams',
            {
                toot: "http://joinmastodon.org/ns#",
                discoverable: "toot:discoverable",
                Hashtag: "as:Hashtag"
            }
        ],
        id: `https://${config.url.rootDomain}/activitypub/actors/${req.params.user}/outbox`,
        type: 'OrderedCollection',
        totalItems: posts.length,
        orderedItems: posts,
    };

    res.json(outboxData);
}