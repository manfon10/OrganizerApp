import { appActions } from '../actions';

const INITIAL_STATE = {
    appError: {},
    alertAction: false
}

const AppReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case appActions.setErrorApp:
            return {
                ...state,
                appError: action.payload
            }

        case appActions.setAlertAction:
            return {
                ...state,
                alertAction: action.payload
            }
    
        default:
            return state;
    }
}

export default AppReducer;