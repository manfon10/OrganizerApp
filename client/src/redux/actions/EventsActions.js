import axios from 'axios';
import { setErrorApp } from './AppAction';
import getConfig from '../../utils/getConfig';

export const eventsActions = {
    getEvents: "GET_EVENTS",
    isOpenModal: "OPEN_MODAL_EVENT",
    isCloseModal: "CLOSE_MODAL_EVENT",
    eventSelected: "EVENT_SELECTED",
    eventUpdate: "EVENT_UPDATE",
    eventCreate: "EVENT_CREATE",
    eventsAsign: "GET_EVENTS_ASIGN"
}

export const setEvents = events => ({
    type: eventsActions.getEvents,
    payload: events
});

export const setIsOpenModal = (isOpen, modal) => ({
    type: eventsActions.isOpenModal,
    payload: {
        isOpen,
        modal
    }
});

export const setEventSelected = event => ({
    type: eventsActions.eventSelected,
    payload: event
});

export const setEventCreate = () => ({
    type: eventsActions.eventCreate,
});

export const setEventUpdate = () => ({
    type: eventsActions.eventUpdate,
});

export const setIsCloseModal = (isClose) => ({
    type: eventsActions.isCloseModal,
    payload: isClose
});

export const setEventsAsign = events => ({
    type: eventsActions.eventsAsign,
    payload: events
});

export const eventThunk = (idUser) => {
    return dispatch => {
        return axios
            .get(`http://localhost:4904/api/v1/events/${idUser}`, getConfig() )
            .then( res => {
                dispatch(setEvents(res.data.event));
            })
            .catch(err => dispatch(setErrorApp(err.response.data.message)));
    };
};

export const createEventThunk = (data, idUser) => {
    return dispatch => {
        axios
            .post('http://localhost:4904/api/v1/events', data, getConfig())
            .then( res => {
                dispatch(eventThunk(idUser));
            })
            .catch(err => dispatch(setErrorApp(err.response.data.message)));
    };
};

export const updateEventThunk = (data, idUser) => {
    return dispatch => {
        axios
            .patch(`http://localhost:4904/api/v1/events/${data.id}`, data, getConfig() )
            .then( res => {
                dispatch(setEventUpdate());
                dispatch(eventThunk(idUser));
            })
            .catch(err => dispatch(setErrorApp(err.response.data.message)));
    };
};

export const getEventAsignThunk = (idUser) => {
    return dispatch => {
        return axios
            .get(`http://localhost:4904/api/v1/events/list_asign_event/${idUser}`, getConfig() )
            .then( res => {
                dispatch(setEventsAsign(res.data.events));
            })
            .catch(err => dispatch(setErrorApp(err.response.data.message)));
    };
};

export const updateEventAsignThunk = (data, idUser) => {
    return dispatch => {
        axios
            .patch(`http://localhost:4904/api/v1/events/update_asign_event/${data.id}`, data, getConfig() )
            .then( () => {
                dispatch(setEventUpdate());
                dispatch(getEventAsignThunk(idUser));
            })
            .catch(err => dispatch(setErrorApp(err.response.data.message)));
    };
};