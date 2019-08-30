import { BlogPostActionTypes } from './blog-post.types';

const INITIAL_STATE = {
    blogPosts: []
};

const blogPostReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case BlogPostActionTypes.FETCH_BLOG_POSTS:
            return {
                ...state,
                blogPosts: action.payload
            };
        case BlogPostActionTypes.FETCH_BLOG_POST:
            return {
                ...state,
                blogPost: action.payload
            };
        default: return state;
    }
};

export default blogPostReducer;