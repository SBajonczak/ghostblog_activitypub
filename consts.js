

const urlPaths = {
    domain: process.env.ROOT_DOMAIN,
    staticImages: `${process.env.ROOT_PATH}img`,
    tags:`https://${process.env.ROOT_DOMAIN}/activitypub/tags/`
  }    
const imagePaths=
{
  AvatarImage:process.env.IMAGE_AVATAR_URL, 
  AvatarIcon:process.env.ICON_AVATAR_URL, 
}
exports.url = {
    publicKey:process.env.PUB_KEY,
    images:imagePaths,
    path: urlPaths,
    rootDomain: urlPaths.domain,
    rootPath: process.env.ROOT_PATH,
    blogDomain: process.env.GHOST_BLOG_DOMAIN,
    blogUrl: `https://${process.env.GHOST_BLOG_DOMAIN}`
}

