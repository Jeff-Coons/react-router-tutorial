var express = require('express');
var path = require('path');
var compression = require('compression');

var app = express();

app.use(compression());

// Serve static stuff - i.e. Index.css
app.use(express.static(path.join(__dirname, 'public')));

// Send all requests to index.html so browserHistory in React Router Works
app.get('*', function (request, response) {
    response.sendFile(path.join(__dirname, 'public','index.html'));
});

var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('Production Express server runnin at localhost:' + PORT);
});
