# About
this project will host an Activity Pub Feed for your Ghost blog instance. 
So in general it can be host beside the Ghost blog. 

For Questions, contact me via mastodon sascha@bajonczak or via my blog https://blog.bajonczak.com 

# Requirements
You must create an Api-Key within the Ghost Blog and add this into config variables.
For local deployment you can set into the .env file.

For running it in your production environment, you must set ths variables into the enironment variables. 

# Configuration 
This section wil describe the config entries
|Name|Description|Example|
|-|-|-|
|ROOT_PATH|The root path, in which the application will be hosted| / |
|ROOT_DOMAIN|This is the default domain where the webfinger will behosted| bajonczak.com|
|GHOST_API_KEY|This is the generated api key from Ghost| No example yet|
|GHOST_BLOG_DOMAIN|When you host your blog on a different domain, or subdomein, you can define it here| blog.bajonczak.com|
|PROFILE_HOMEPAGE|This will be the dfault Profile Homepage that will be used, when the ActAuthro does not exists, so it will give you a fallback to a default one.| https://blog.bajonczak.com|
|IMAGE_AVATAR_URL|This is the Image (PNG Type) that will be used for the avatar|Https://....my.png|
|ICON_AVATAR_URL|This is the Image (PNG-Type) that will be used for the backgroun header|Https://....my.png|
|PUB_KEY|In this you can insert the public key that will be promoted to the profile|-----BEGIN PUBLIC KEY-----ABC-----END PUBLIC KEY-----|


# Run the docker
To run the docker image, I will suggest to use a docker-compose. In this you can define the configuration as enviornment variables. You can use the follwoing as starter example

```yaml
version: '3'
services:
  app:
    image: docker.io/beejay/webfinger:latest
    ports:
      - 80:3000
      - 443:3000
    environment:
      - ROOT_PATH=/
      - ROOT_DOMAIN=bajonczak.com
      - GHOST_API_KEY=
      - GHOST_BLOG_DOMAIN=blog.bajonczak.com
      - PROFILE_HOMEPAGE=https://blog.bajonczak.com
      - IMAGE_AVATAR_URL=https://blog.bajonczak.com/content/images/2022/10/20221014_171637.png
      - ICON_AVATAR_URL=https://blog.bajonczak.com/content/images/2022/10/20221014_171637.png
      - PUB_KEY=-----BEGIN PUBLIC KEY-----ABC-----END PUBLIC KEY-----
```

Just adjust the settings to your requirements.

# Development 
For those who want to contribute to this, here are some general information

## Run locally 
Before start the local development you must install the missing packages

```
npm install
```
Then create a .env File from the template. 
In this you must adjust the settings to your environment. 

After you did the configuring you can start it with

```
npm run dev
```

Now you are able to run requests against the local development server with postman.

