# About
this project will host an Activity Pub Feed for your Ghost blog instance. 
So in general it can be host beside the Ghost blog. 

# Requirements
You must create an Api-Key within the Ghost Blog and add this into config variables.
For local deployment you can set into the .env file.

For running it in your production environment, you must set ths variables into the enironment variables. 




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


# Publish Container

``
docker tag webfinger webfinger:1.3
``