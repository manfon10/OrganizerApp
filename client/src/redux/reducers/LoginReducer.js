import { loginActions } from '../actions';

const INITIAL_STATE = {
    userInfo: [],
    errorInfo: {}
}

const LoginReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case loginActions.setUserInfo:
            return {
                ...state,
                userInfo: action.payload
            }

        case loginActions.setUserError:
            return {
                ...state,
                errorInfo: action.payload
            }
    
        default:
            return state;
    }
}

export default LoginReducer;