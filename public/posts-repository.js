import api from './api.js';

/**
* @class Responsible for storing and manipulating Spacebook posts, in-memory
*/

class PostsRepository {
    constructor(api) {
        this.posts = [];
        this.api = api;
    }

    // async dataInit() {
    //     try {
    //     this.posts = await api.fetch()
    //     }
    //     catch (e) {
    //         console.log('there was an error');
    //         console.log(e);
    //     }
    // }

    //my code
    dataInit(){
       return  api.fetch().then((data)=>{
            this.posts = data;
         });
    }

    // addPost(postText) {
    //     return  $.ajax({
    //         method: "POST",
    //         url: '/posts',
    //         data: newPostText
    //     }).then(()=>{
    //         this.posts.push({ text: postText, comments: []})
    //     });  
    // }

    async addPost(postText) {
        try {
            var newPostText = { text: postText };
            let result = await $.ajax({
                method: "POST",
                url: '/posts',
                data: newPostText
            });
            this.dataInit();
            this.posts.push(result);
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
    }

    async removePost(id) {
        console.log(id)
            return $.ajax({
                method: "DELETE",
                url: '/posts/' + id ,
            })
             this.dataInit();
        
       
    }

    async addComment(newComment, postId) {
        try{
        let result = await $.ajax({
            method: "POST",
            url: '/comment/'+  postId ,
            data: newComment
        })
         this.posts[postIndex].comments.push(newComment);
         this.dataInit();
        }
        catch (e) {
            console.log('there was an error');
            console.log(e);
        }
        
    };

    deleteComment(postIndex, commentIndex) {
        this.dataInit();
        //this.posts[postIndex].comments.splice(commentIndex, 1);
    };
}

export default PostsRepository