const axios = require('axios');
const config = require('./consts');
// Get all posts from ghost blog
exports.GetPostsFromGhost = async function () {
    try {
        const response = await axios.get(`${config.url.blogUrl}/ghost/api/v3/content/posts`, {
            params: {
                key: process.env.GHOST_API_KEY, // Ersetze dies durch deinen Ghost-API-Schlüssel
                include: 'tags,authors', // Optional: Hier kannst du weitere Parameter hinzufügen, um zusätzliche Informationen zu erhalten
            },
        });

        const posts = response.data.posts;
        return posts;
    } catch (error) {
        console.error('Error while getting posts:', error.message);
    }
}




// Get all posts from ghost blog
exports.GetBlogSettings = async function (slug) {
    try {
        const response = await axios.get(`${config.url.blogUrl}/ghost/api/v3/content/settings`, {
            params: {
                key: process.env.GHOST_API_KEY 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching authors:', error.message);
    }
}




exports.GetAuthorBySlug = async function (slug) {
    try {
        const response = await axios.get(`${config.url.blogUrl}/ghost/api/v3/content/authors/slug/${slug}/`, {
            params: {
                key: process.env.GHOST_API_KEY 
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching author:', error.message);
    }
}

// Get all posts from ghost blog
exports.GetAuthors = async function () {
    try {
        const response = await axios.get(`${config.url.blogUrl}/ghost/api/v3/content/authors`, {
            params: {
                key: process.env.GHOST_API_KEY 
            },
        });
        return response.data.authors;
    } catch (error) {
        console.error('Error fetching authors:', error.message);
    }
}