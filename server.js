var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var postModel = require('./models/postModel');
 mongoose.Promise = require('bluebird');

const SERVER_PORT = 8080;

mongoose.connect('mongodb://localhost/spacebookDB', function() {
  console.log("DB connection established!!!");
})
var postModel = require('./models/postModel');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// You will need to create 5 server routes
// These will define your API:

// 1) to handle getting all posts and their comments
app.get('/post', function (req, res) {
  postModel.Post.find().populate('comment').exec(function(err, posts){
    if (err){
      console.log(err)
    } else{
      // console.log(posts);
      res.send(posts);
    } 
  });
});
// 2) to handle adding a post
app.post('/posts', (req, res) => {
  //get the data the client sent
  // console.log(req.body) //{text: "whaterver"}
  //save a new Post
  var newPost = new postModel.Post(req.body);
  newPost.save((err, post) => {
      //after it saved return the saved post to the client, he'll get in the success function
      if (err) {
          console.log(err);
      } else {
          console.log('POST ADDED')
          res.send(post);
      }
  })
});

////my code
// //when the client ask to add new post
// app.get('/posts', function (req, res) {
//   console.log(req.body)
//   var newPost = new Post({
//     name: req.postText ,
//     reviews: []
//   })
//   newPost.save((err, post) => {
//     //after it saved return the saved post to the client, he'll get in the success function
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('ok')
//         res.send(post);
//     }
//   })
// });

// 3) to handle deleting a post
app.delete(`/posts/:id`, (req, res) => {
  var id = req.params.id;
  // console.log(id)
  postModel.Post.findByIdAndRemove(id).exec((err, post) => {
      if (err) {
          console.log(err)
      } else {
          console.log('ERMOVED   :'+post)
      }
  })
});


// 4) to handle adding a comment to a post
app.post('/comment', (req, res) => {
  var newcomment = new postModel.Comment(req.body);
  newcomment.save((err, post) => {
      //after it saved return the saved post to the client, he'll get in the success function
      if (err) {
          console.log(err);
      } else {
          console.log('Comment added')
          res.send(comment);
      }
  })
});
// 5) to handle deleting a comment from a post
app.post('/deletComment', (req, res) => {
  postModel.comment.remove({ id: req.body }, function(err) {
    if (err) throw err;
    // we have deleted the post
    console.log('post deleted!');
  });
});

app.listen(SERVER_PORT, () => {
  console.log("Server started on port " + SERVER_PORT);
});
