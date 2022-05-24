import { combineReducers } from 'redux';
import LoginReducer from './LoginReducer';
import EventsReducer from './EventReducer';
import AppReducer from './AppReducer';

const rootReducer = combineReducers({
    user: LoginReducer,
    events: EventsReducer,
    app: AppReducer
});

export default rootReducer;