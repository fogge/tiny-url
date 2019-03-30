# TINY-URL
#### A small app that shortens links.

## Installing
npm install will install all requirements on all levels. It's getting the whole react-package so be sure to wait for all installations to complete before trying to start.
```
$ npm install
```

## Running
Make sure MongoDB is running. 
### Development-mode
Then npm run start:dev
```
$ npm run start:dev
```

### Production-mode
Then run npm start
```
$ npm start
```
This will build and start up the server.

### What's in it?
#### Server:
* Express (backend framework)
* MongoDB/Mongoose (database + handler)
* Cors (needed for client-side to call server-side)
* Morgan (logger)

#### Client:
* React (frontend framwork
* Node-sass (to be able to import sass into react)
* Http-proxy-middleware (makes it possible to make requests with /api/request)

#### Others:
* Postinstall (to call something after the npm install is complete)
* Concurrently (run more than one script at one time)

#### NN === Not needed
