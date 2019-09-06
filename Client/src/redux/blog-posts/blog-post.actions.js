import BlogPostActionTypes from "./blog-post.types";

export const CreateBlogPost = blogPost => ({
    type: BlogPostActionTypes.CREATE_BLOG_POST,
    payload: blogPost
});

export const FetchBlogPosts = blogPosts => ({
    type: BlogPostActionTypes.FETCH_BLOG_POSTS,
    payload: blogPosts
});

export const UploadBlogPostPhoto = photo => ({
    type: BlogPostActionTypes.UPLOAD_PHOTO,
    payload: photo
});
export const DeleteBlogPost = blogPostId => ({
    type: BlogPostActionTypes.DELETE_BLOG_POST,
    payload: blogPostId
});