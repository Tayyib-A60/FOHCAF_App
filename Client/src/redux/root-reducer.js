import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducers';
import blogPostReducer from './blog-posts/blog-post.reducer';



const persistConfig = {
    key: 'root',
    storage
};

const rootReducer = combineReducers({
    user: userReducer,
    blogPosts: blogPostReducer
});

export default persistReducer(persistConfig, rootReducer);