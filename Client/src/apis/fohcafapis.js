import axios from './axios';

export const createUserAPI = user => ( axios.post('/user/register', user) );
export const signInAPI = user => ( axios.post('/user/authenticate', user) );
export const createBlogPostAPI = blogPost => ( axios.post('/fohcaf/createBlogPost', blogPost) );
export const fetchBlogPostAPI = id => ( axios.get(`/fohcaf/getBlogPost/${id}`) );
export const fetchBlogPostsAPI = queryParams => ( axios.get(`/fohcaf/getBlogPosts?${toQueryString(queryParams)}`) );
export const updateBlogPostAPI = (id, blogPost) => ( axios.put(`/fohcaf/updateBlogPost/${id}`, blogPost) );
export const deleteBlogPostAPI = id => ( axios.delete(`/fohcaf/deleteBlogPost/${id}`) );
export const subscribeAPI = subscriber => ( axios.post('/subscribe', subscriber) );
export const broadcastToSubscribersAPI = broadcastMessage => ( axios.post('/broadcastToSubscribers', broadcastMessage) );
export const uploadPictureAPI = (id, photo) => ( axios.post(`/photos/${id}`, photo ) );
export const fetchBlogPostPhotos = id => ( axios.get(`/photos/${id}/getPhotos`) );
export const fetchBlogPostPhoto = id => ( axios.get(`/photos/${id}/getPhoto`) );
export const makeMainPhotoAPI = (blogPostId, id) => ( axios.put(`/photos/${blogPostId}/makeMain/${id}`) );
export const deletePhotoAPI = (blogPostId, id) => ( axios.delete(`/photos/${blogPostId}/${id}`) );
export const postCommentAPI = (comment) => ( axios.post('/fohcaf/postComment', comment) );
export const fetchCommentsAPI = (blogPostId, commentQuery) => ( axios.get(`/fohcaf/getComments/${blogPostId}?${toQueryString(commentQuery)}`) );
export const postSubscriberAPI = email => ( axios.post('/fohcaf/subscribe', email) );
export const sendBroadcastMessageAPI = broadcastMessage => ( axios.post('/fohcaf/broadcastToSubscribers', broadcastMessage));
export const sendSingleMessageAPI = message => ( axios.post('/fohcaf/sendSingleMessage', message));

const toQueryString = (obj) => {
    const parts = [];
    for (const property in obj) {
      const value = obj[property];
      if (value != null && value !== undefined) {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }
    return parts.join('&');
  }