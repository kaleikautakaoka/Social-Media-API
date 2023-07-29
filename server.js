// import dependencies
const express = require('express');
//body parser is used to parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const bodyParser = require('body-parser');
const db = require('./db');
const router = require('./routes');

//cwd = current working directory
const cwd = process.cwd();

// server configuration
const PORT = process.env.PORT || 3001;
// create new express app and save it as "app"
const app = express();

