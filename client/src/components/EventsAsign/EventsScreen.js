import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEventSelected, setIsOpenModal, getEventAsignThunk, setEventUpdate } from '../../redux/actions';
import styles from './Events.module.css';

const EventsScreen = () => {

    const dispatch = useDispatch();

    const { user } = useSelector( state => state.user.userInfo);
    const { eventsAsign } = useSelector( state => state.events);

    const eventSelected = ({event, permission}) => {
        const eventData = {
            id: event.id,
            start: event.start,
            end: event.end,
            title: event.title,
            description: event.description,
            status: event.status,
            permission
        }
        dispatch(setEventSelected(eventData));
        dispatch(setIsOpenModal(true, "update_event"));
    }

    useEffect(() => {
        dispatch(setEventUpdate());
        dispatch(getEventAsignThunk(user?.id));
    }, [setEventUpdate]);

    return (
        <div className={styles.container_events}>
            <h3>
                {
                    eventsAsign.length === 0 ? "You have no events assigned" : "Events asing"
                }
            </h3>
            {
                eventsAsign.map( eventAsign => (
                    <div key={eventAsign.id} className={styles.container_events_asign}>
                        <p><strong>{eventAsign.event.title}</strong></p>
                        <button onClick={ () => eventSelected(eventAsign) }>Ver</button>
                    </div>
                ))
            }
        </div>
    );
};

export default EventsScreen;