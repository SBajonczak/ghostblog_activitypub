const ghostHandler = require('./ghostHandler');
const config = require('./consts');

function ConvertToFeaturedArticle(post, userid) {
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

async function GetFeaturesPosts(userid) {
    const posts = await ghostHandler.GetPostsFromGhost();
    const result = [];
    posts.forEach(post => {
        if (post.featured && post.primary_author.slug == userid) {
            const data = ConvertToFeaturedArticle(post, userid);
            result.push(data);
        }
    });  // end foreach
    return result;
}


exports.GetFeaturedPosts = async function (req, res, next) {
    const user = req.params.user;
    console.log("Got featured request for " + user);

    var posts = await GetFeaturesPosts(user);
    console.log(posts.length);
    const outboxData = {
        '@context': [
            "https://www.w3.org/ns/activitystreams",
            {
                Hashtag: "as:Hashtag",
                toot: "http://joinmastodon.org/ns#"
            }
        ],
        summary: 'Outbox for ' + user,
        type: 'OrderedCollection',
        id: `https://${config.url.rootDomain}/activitypub/actors/${user}/featured`,
        totalItems: posts.length,
        orderedItems: posts,
    };
    res.json(outboxData);
}