const express = require('express');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3052;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// if MONGODB_URI exists, connect to that DB
// otherwise short-circuit to local MongoDB server's DB
// MongoDB finds and connects to DB if exists or creates if it doesn't
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-api", {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// log mongo queries being executed
mongoose.set("debug", true);

app.use(require('./routes'));

app.listen(PORT, () => console.log('Connected on localhost:${PORT}'));
