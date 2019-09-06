import { BlogPostActionTypes } from './blog-post.types';
import _ from 'lodash';
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
        case BlogPostActionTypes.CREATE_BLOG_POST:
            return {
                ...state,
                blogPost: action.payload
            };
        case BlogPostActionTypes.DELETE_BLOG_POST:
                return _.omit(state, action.payload);
        default: return state;
    }
};

export default blogPostReducer;