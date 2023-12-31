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
        id: "",
        published: "",
        sensitive: false,
        summary: "",
        visibility: "public",
        language: "en",
        uri: "",
        url: "",
        atomUri: "",
        content: "",
        type: "Article",
        to: [
            "https://www.w3.org/ns/activitystreams#Public"
        ],
        attributedTo: `https://${config.url.rootDomain}/activitypub/actors/${userid}`,
        tag: []
    };
    data.content = post.html;
    data.id = `https://${config.url.rootDomain}/activitypub/actors/${userid}/${post.id}`;
    data.summary = post.excerpt;
    data.published = post.created_at;
    data.url = post.url;
    data.atomUri = data.id
    data.uri = data.id
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
        if (post.primary_author.slug==userid){
            const data = ConvertToPubArticle(post, userid);
            result.push(data);
        }

    });  // end foreach
    return result;
}



exports.OutboxRoute = async function (req, res, next) {
    console.log("Got outbox request:", req.params.userId)


    var posts = await GetOutboxFiles(req.params.userId);

    const outboxData = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        summary: 'Outbox for ' + req.params.userId,
        type: 'OrderedCollection',
        totalItems: posts.length,
        orderedItems: posts,
    };
    res.setHeader('Content-Type', 'application/jrd+json');

    res.json(outboxData);
}