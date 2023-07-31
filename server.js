// import dependencies
const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');
// create new express app and save it as "app"
const app = express();

//cwd = current working directory
const cwd = process.cwd();
// server configuration
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// make the server listen to requests
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}
);

