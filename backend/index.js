const { Sequelize, Op, Model}= require('sequelize');
const {winston} = require('./lib/common');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 8080;
const router = require('./router/index');
const db = require('./lib/db');

// const whitelist = ['http://localhost:8081','http://localhost:8080']
// const corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   },
//   credentials: true,
// }
// app.use(cors(corsOptions));

app.use(cors());

app.use(bodyParser.json({limit : 50000000}));
app.use(router.basicRouter);
app.use(async (err, req, res, next)=> {
  if(err){
    console.log(err.message);
    next();
  }
})

app.get('/ping', async(req, res) => {
    res.send('pong');
})


app.listen(port, '0.0.0.0', async () => {
    await db.initialize();
    winston.info(`Listening on port ${port}`);
    // { emerg: 0, alert: 1, crit: 2, error: 3, warning: 4, notice: 5, info: 6, debug: 7 }
})