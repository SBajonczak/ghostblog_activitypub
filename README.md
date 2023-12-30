# About
This Project will host an activitypub for the Ghost blogging engine. 
So this will help do publish the Blog articles through Mastodon or elsewhere in the fediverse.

In general it uses the webfinger spec from w3wc to publish the metadata from your profile and your blog. 


# Requirements
You need a custom domain to run this application


# Run locally 
Just run the following command
```
npm run dev
``

# Build Container
Simply build the container with
```
docker build -t webfinger .
```