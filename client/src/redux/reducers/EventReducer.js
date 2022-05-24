import { eventsActions } from '../actions';

const INITIAL_STATE = {
    events: [],
    isOpenModal: {
        isOpen: false,
        modal: ""
    },
    eventSelected: {},
    eventsAsign: []
}

const EventsReducer = ( state = INITIAL_STATE, action) => {
    switch (action.type) {
        case eventsActions.getEvents:
            return {
                ...state,
                events: action.payload
            }
        
        case eventsActions.isOpenModal:
            return {
                ...state,
                isOpenModal: action.payload
            }

        case eventsActions.isCloseModal:
            return {
                ...state,
                isOpenModal: action.payload
            }

        case eventsActions.eventSelected:
            return {
                ...state,
                eventSelected: action.payload
            }

        case eventsActions.eventsAsign:
            return {
                ...state,
                eventsAsign: action.payload
            }
    
        default:
            return state;
    }
}

export default EventsReducer;