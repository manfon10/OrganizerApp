import axios from 'axios';
import history from '../../utils/history';
import { setAlertAction } from '../actions';

export const loginActions = {
    setUserInfo: "LOGIN_USER",
    setUserError: "LOGIN_ERROR"
}

export const setUserInfo = userInfo => ({
    type: loginActions.setUserInfo,
    payload: userInfo
});

export const setError = error => ({
    type: loginActions.setUserError,
    payload: error
});

export const loginThunk = data => {
    return dispatch => {
        axios
            .post('http://localhost:4904/api/v1/users/login', data)
            .then( res => {
                dispatch(setUserInfo(res.data));
                localStorage.setItem('tokenUser', res.data.token);
                history.replace("/");
            })
            .catch(err => {
                dispatch(setError(err.response.data.message));
                setTimeout(() => {
                    dispatch(setError({}));
                }, 4000);
            });
    };
};

export const signupThunk = data => {
    return dispatch => {
        axios
            .post('http://localhost:4904/api/v1/users/signup', data)
            .then( res => {
                dispatch(setAlertAction(true));
                history.replace("/login");
                setTimeout(() => {
                    dispatch(setAlertAction(false));
                }, 3000);
            })
            .catch(err => {
                dispatch(setError(err.response.data.message));
                dispatch(setAlertAction(true));
            });
    };
};