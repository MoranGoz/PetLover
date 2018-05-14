class EventsHandler {
    constructor(postsRepository, postsRenderer) {
        this.postsRepository = postsRepository;
        this.postsRenderer = postsRenderer;
        this.$posts = $(".posts");
    }

    registerAddPost() {
        $('#addpost').on('click', () => {
            let $input = $("#postText");
            if ($input.val() === "") {
                alert("Please enter text!"); 
            } else {
                this.postsRepository.addPost($input.val()).then(()=>{this.postsRenderer.renderPosts(this.postsRepository.posts)});
                // this.postsRenderer.renderPosts(this.postsRepository.posts);
                $input.val("");
            }
            });        
    }

   async registerRemovePost() {
        this.$posts.on('click', '.remove-post', (event) => {
            let index = $(event.currentTarget).closest('.post').index();;
            // i chenged the argument that wil sent for femove to be an id instad of index
            let id = $(event.currentTarget).closest('.post').attr("data-id");
            console.log(id);
            this.postsRepository.removePost(id).then(()=>{this.postsRenderer.renderPosts(this.postsRepository.posts)});
            // this.postsRenderer.renderPosts(this.postsRepository.posts);
          });

    }

    registerToggleComments() {
        this.$posts.on('click', '.toggle-comments', (event) => {
            let $clickedPost = $(event.currentTarget).closest('.post');
            $clickedPost.find('.comments-container').toggleClass('show');
          });
    }

    registerAddComment() {
        this.$posts.on('click', '.add-comment', (event) => {
            let $comment = $(event.currentTarget).siblings('.comment');
            let $user = $(event.currentTarget).siblings('.name');
          
            if ($comment.val() === "" || $user.val() === "") {
              alert("Please enter your name and a comment!");
              return;
            }
            let postId = $(event.currentTarget).closest('.post').attr("data-id");
            //let postIndex = $(event.currentTarget).closest('.post').index();
            let newComment = { text: $comment.val(), user: $user.val() };
          
            this.postsRepository.addComment(newComment, postId).then(()=>{this.postsRenderer.renderPosts(this.postsRepository.posts)});;
          //  this.postsRenderer.renderComments(this.postsRepository.posts, postId);
            $comment.val("");
            $user.val("");
          });

    }

    registerRemoveComment() {
        this.$posts.on('click', '.remove-comment', (event) => {
            let $commentsList = $(event.currentTarget).closest('.post').find('.comments-list');
            let postIndex = $(event.currentTarget).closest('.post').index();
            let commentIndex = $(event.currentTarget).closest('.comment').index();
            this.postsRepository.deleteComment(postIndex, commentIndex);
            this.postsRenderer.renderComments(this.postsRepository.posts, postIndex);
        });
    }
}

export default EventsHandler