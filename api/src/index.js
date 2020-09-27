const express = require('express');
const {connectDb} = require('./helpers/db');
const mongoose = require('mongoose');
const {port, host, db} = require('./configuration');
const postSchema = new mongoose.Schema({
  name: String
});
const Post = new mongoose.model('Post', postSchema);

const app = express();

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api services! on port ${port}`);
    console.log(`On host ${host}`);
    console.log(`Our database ${db}`)

    // Post.find(function (err, posts) {
    //   if (err) return console.log(err);
    //   console.log('posts', posts);
    // });

    const silence = new Post({name: "Silence"});
    silence.save(function (err, savedSilence) {
      if (err) return console.log('error', err);
      console.log('savedSilence', savedSilence);
    })
  });
};

app.get('/test', (req, res) => {
  res.send('Our api server is working correctly');
});

connectDb()
  .on('error', console.log)
  .on('disconnected', connectDb)
  .once('open', startServer);