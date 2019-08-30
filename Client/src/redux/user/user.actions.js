import UserActionTypes from './user.types';

export const createUser = user => ({
    type: UserActionTypes.CREATE_USER,
    payload: user
});

export const signInUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});