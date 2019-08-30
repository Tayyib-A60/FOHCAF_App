import { createSelector } from 'reselect';

const selectPosts = state => state.blogPosts;

export const selectBlogPosts = createSelector(
    [selectPosts],
    blogPosts => blogPosts.blogPosts
);