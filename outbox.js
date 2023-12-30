const axios = require('axios');

// Get all posts from ghost blog
exports.GetPostsFromGhost = async function () {
    const ghostBlogUrl = 'https://blog.bajonczak.com'; 
    try {
        const response = await axios.get(`${ghostBlogUrl}/ghost/api/v3/content/posts`, {
            params: {
                key: 'b9c346fb03c5fa53bbbb79bc6a', // Ersetze dies durch deinen Ghost-API-Schlüssel
                include: 'tags,authors', // Optional: Hier kannst du weitere Parameter hinzufügen, um zusätzliche Informationen zu erhalten
            },
        });

        const posts = response.data.posts;
        const result =[];
        posts.forEach(post => {
            
            const data = 
            {
                "@context": [
                    "https://www.w3.org/ns/activitystreams",
                    {
                        "Hashtag": "as:Hashtag",
                        "toot": "http://joinmastodon.org/ns#"
                    }
                ],
                "id": "",
                "published": "",
                "sensitive": false,
                "summary": "",
                "visibility": "public",
                "language": "en",
                "uri": "",
                "url": "",
                "atomUri": "",
                "content": "",
                "type": "Article",
                "to": [
                    "https://www.w3.org/ns/activitystreams#Public"
                ],
                "attributedTo": "https://bajonczak.com/activitypub/actors/sascha",
                "tag": []};
                data.content = post.html;
                data.id="https://bajonczak.com/activitypub/actors/sascha/" +post.id;
                data.summary = post.excerpt;
                data.published= post.created_at;
                data.url= post.url;
                data.atomUri = data.id
                data.uri = data.id
                post.tags.forEach( tag =>{
                    data.tag.push(
                        {
                            type: "Hashtag",
                            href: "https://bajonczak.com/activitypub/tags/" + tag.name ,
                            name: "#" +tag.name
                        }
                    )
    
                })
                result.push(data);

        });  // end foreach
        return result;
    } catch (error) {
        console.error('Fehler beim Abrufen der Posts:', error.message);
    }



}


exports.GetOutboxFiles = async function () {
    return await this.GetPostsFromGhost();
    // return [
    //     {
    //         "@context": [
    //             "https://www.w3.org/ns/activitystreams",
    //             {
    //                 "Hashtag": "as:Hashtag",
    //                 "toot": "http://joinmastodon.org/ns#"
    //             }
    //         ],
    //         "id": "https://quigs.blog/activitypub/actors/quigs_blog/64f5f0bcb4dea22413172426_1693844145865",
    //         "published": "2023-09-04T12:15:45.000-04:00",
    //         "sensitive": false,
    //         "summary": "How to write a custom CoreData NSMergePolicy\n\nDocumenting Apple's undocumented and unclear code. Last month I encountered my first need for a custom CoreData merge policy and turned to the Apple documentation for guidance. There wasn't much and I was getting a weird crash that made no sense to me.",
    //         "visibility": "public",
    //         "language": "en",
    //         "uri": "https://quigs.blog/activitypub/actors/quigs_blog/64f5f0bcb4dea22413172426_1693844145865",
    //         "url": "https://quigs.blog/how-to-write-a-custom-coredata-nsmergepolicy/",
    //         "atomUri": "https://quigs.blog/activitypub/actors/quigs_blog/64f5f0bcb4dea22413172426_1693844145865",
    //         "content": "Test content",
    //         "type": "Article",
    //         "to": [
    //             "https://www.w3.org/ns/activitystreams#Public"
    //         ],
    //         "cc": [
    //             "https://quigs.blog/activitypub/actors/quigs_blog/followers"
    //         ],
    //         "attributedTo": "https://quigs.blog/activitypub/actors/quigs_blog",
    //         "tag": [

    //             {
    //                 "type": "Hashtag",
    //                 "href": "https://quigs.blog/activitypub/tags/swift",
    //                 "name": "#Swift"
    //             }
    //         ]
    //     }
    // ]
}