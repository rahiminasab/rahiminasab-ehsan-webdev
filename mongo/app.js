/**
 * Created by ehsan on 6/5/17.
 */


var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;

mongoose.connect('mongodb://localhost/webdev_summer1_2017');

var blogPostSchema = mongoose.Schema({
   title: String,
    body: String,
    postDate: {type: Date, default: Date.now()},
    thumbsUp: {type: Number, default: 0}
}, {collection: 'blogpost'});

var blogModel = mongoose.model("BlogPost", blogPostSchema);

function createBlogPost(blogPost) {
    blogModel.create(blogPost,
        function (err, doc) {
            console.log(doc);
        }
    );

    //or
    blogModel
        .create(blogPost)
        .then(
            function (doc) {
                console.log(doc);
            },
            function (err) {

            }
        );

}

function findAllBlogPosts() {
    return blogModel.find()
}

var posts = findAllBlogPosts()
    .then(
        function (posts) {

        }
    );

function findBlogPostById(postId) {
    //return blogModel.findOne({_id: postId});
    return blogModel.findById(postId);
}

var post = findBlogPostById
    .then(
        function (blogPost) {

        }
    );

function updateBlogPost(postId, newPost) {
    blogModel
        .update({_id: postId},{
            $set: newPost/*{
                title: newPost.title,
                body: newPost.title
            }*/
        })
}

function deleteBlogPost(postId) {
    blogModel
        .remove({_id: postId})
}