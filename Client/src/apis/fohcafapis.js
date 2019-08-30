import axios from './axios';

export const createUserAPI = user => ( axios.post('/user/register', user) );
export const signInAPI = user => ( axios.post('/user/authenticate', user) );
export const createBlogPostAPI = blogPost => ( axios.post('/fohcaf/createBlogPost', blogPost) );
export const fetchBlogPostAPI = id => ( axios.get(`/fohcaf/getBlogPost/${id}`) );
export const fetchBlogPostsAPI = () => ( axios.get('/fohcaf/getBlogPosts') );
export const updateBlogPostAPI = (id, blogPost) => ( axios.put(`/updateBlogPost/${id}`, blogPost) );
export const deleteBlogPostAPI = id => ( axios.delete(`/deleteBlogPost/${id}`) );
export const subscribeAPI = subscriber => ( axios.post('/subscribe', subscriber) );
export const broadcastToSubscribersAPI = broadcastMessage => ( axios.post('/broadcastToSubscribers', broadcastMessage) );
export const uploadPictureAPI = (id, photo) => ( axios.post(`/photos/${id}`, photo ) );
export const fetchBlogPostPhotos = id => ( axios.get(`/photos/${id}/getPhotos`) );
export const fetchBlogPostPhoto = id => ( axios.get(`/photos/${id}/getPhoto`) );
export const makeMainPhotoAPI = (blogPostId, id) => ( axios.put(`/photos/${blogPostId}/makeMain/${id}`) );
export const deletePhotoAPI = (blogPostId, id) => ( axios.delete(`/photos/${blogPostId}/${id}`) );