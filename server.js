/*const express = require('express');
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//app.use(express.static('public'));

// if MONGODB_URI exists, connect to that DB
// otherwise short-circuit to local MongoDB server's DB
// MongoDB finds and connects to DB if exists or creates if it doesn't
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/social-network-api", {
    //useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
}, err => {
    if (err) throw err;
    console.log('Connected to MongoDB!!!')
});

// log mongo queries being executed
mongoose.set("debug", true);

app.use(require('./routes/index'));

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));*/




const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
  //useFindAndModify:true,
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true
});

//mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));
