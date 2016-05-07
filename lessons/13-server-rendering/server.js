import express from 'express'
import path from 'path'
import compression from 'compression'

import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import routes from './modules/routes'

var app = express()

app.use(compression())

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, 'public')))

// send all requests to index.html so browserHistory works
app.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname, 'public', 'index.html'))
  match({ routes: routes, location: req.url }, (err, redirect, props) => {

      /**
       * @description - RouterContext - is the what "Router" renders. "Router"
       * keeps these "props" in its state as it listens to "browserHistory".
       * But on the server our app is stateless, so we need to use "match" to
       * get these props before rendering.
       */
       const appHtml = renderToString(<RouterContext {...props}/>);


       /**
        * @description - Dump the HTML into a template lots of ways to dow this,
        * but none are really influenced by React Router, so we're just using a
        * little function called "renderPage"
        */
        res.send(renderPage(appHtml));

        renderPage(appHtml) => {
            return `
                <!doctype html public="storage">
                <html>
                <meta charset=utf-8/>
                <title>My First React Router App</title>
                <link rel="stylesheet" href=/index.css>
                <div id=app>${appHtml}</div>
                <script src="/bundle.js"></script>
            `
        }

  })
})

var PORT = process.env.PORT || 8080
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
})
