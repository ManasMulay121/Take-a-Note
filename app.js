let posts = [];

var bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.status(200);
    res.render(path.join(__dirname + '/views/home.ejs'));
})

app.get('/createBlog', (req, res)=> {
    res.render(path.join(__dirname + '/views/create_page.ejs'))
})

app.get('/viewPost/:id', (req, res) => {
    let postNo = req.params.id - 1;
    const title = posts[postNo][1].title;
    const blog = posts[postNo][1].blog;
    let post = {title, blog};
    res.render(path.join(__dirname + '/views/view_post.ejs'), {post});
})

app.post("/postBlog", (req, res) => {
    const len = posts.length;
    const title = req.body["Title"];
    const blog = req.body["Blog"];
    posts.push([len + 1, {title, blog}]);
    console.log(posts[posts.length - 1][1].title);
    res.render(path.join(__dirname + '/views/home.ejs'), {posts});
})

app.get("/deletePost/:id", (req, res) => {
    const index = req.params.id - 1;
    posts.splice(index, 1);
    res.render(path.join(__dirname + '/views/home.ejs'), {posts});
})

app.listen(port, () => {
    console.log("i'm all ears daddy, uhmmmmm :>");
})