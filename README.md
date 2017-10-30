# React Project Template

Features:

* based on <https://github.com/umn-5117-f17/express-project-template>
* based on <https://github.com/facebookincubator/create-react-app>
* includes bulma css
* includes <https://github.com/ReactTraining/react-router>

Example code:

* mongodb

## setup and run in development

* create account at [mlab](https://mlab.com/)
* create account at [auth0](https://auth0.com
    * create a client
    * In the APIs section of the Auth0 dashboard, click Create API
      (pick any name, any identifier)
* install [heroku command line app](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)
* edit file `web/.env` to configure react, and commit the changes
* create file `.env` in root of project to configure express, something like this:

```
    DEBUG=app:*

    PORT=3000
    EXPRESS_PORT=3001

    AUTH0_DOMAIN=TODO
    AUTH0_CLIENT_ID=TODO
    AUTH0_CLIENT_SECRET=TODO
    AUTH0_CALLBACK_URL=http://localhost:3000/callback
    AUTH0_API_ID=TODO

    DB_URI=mongodb://5117:5117iscool@ec2-54-175-174-41.compute-1.amazonaws.com:80/5117-f17-individual-hw

    SESSION_SECRET=TODOanythingisfinehere
```

* run:

```
    npm install
    npm run dev
```

## deploy to heroku

* run these commands (one-time setup, or whenever these values need to change):

```
    # add all of the config variables from .env, except DEBUG
    # warning: some of them will require a different value (e.g., AUTH0_CALLBACK_URL)
    heroku config:set AUTH0_DOMAIN=(foo).auth0.com AUTH0_CALLBACK_URL=http://(heroku-dns)/callback
```

* add the callback to "allowed callback URLs" list in auth0 client settings: `http://(heroku-dns).herokuapp.com/callback`

* check the code in and `git push heroku master`
