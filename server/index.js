const express = require('express');
const bodyParser = require('body-parser');
const mc = require(`./controllers/messages_controller`);
const expressSession = require('express-session');
require('dotenv').config();
const createInitialSession = require('./middlewares/session');
const filter = require('./middlewares/filter');

const app = express();

app.use(bodyParser.json());
app.use(express.static(`${__dirname}/../build`));

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 10000
    }
}))

app.use(createInitialSession);

app.post("/api/messages", filter, mc.create);
app.get("/api/messages", mc.read);
app.put("/api/messages", filter, mc.update);
app.delete("/api/messages", mc.delete);

const port = process.env.PORT || 3000
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });