import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import 'moment/locale/es';
import { eventThunk, setIsOpenModal, setEventSelected } from '../../redux/actions';
import { CalendarModal } from './CalendarModal';
import EventsScreen from '../EventsAsign/EventsScreen';
import { Navbar } from '../';

const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { user } = useSelector( state => state.user.userInfo );
    const { events } = useSelector( state => state.events);

    const newEvents = events?.map(({ id, title, description, start, end, status}) => {
        return {
            id,
            title,
            description,
            start: new Date(start),
            end: new Date(end),
            status
        }
    });

    useEffect(() => {
        dispatch(eventThunk(user?.id));
    }, [dispatch]);

    const [ lastView, setLastView ] = useState(localStorage.getItem('lastView') || 'month');

    const localizer = momentLocalizer(moment);

    moment.locale('es');

    const onViewChange = e =>{
        setLastView(e);
        localStorage.setItem('lastView', e);
    }

    const messages = {
        allDay: 'Todo el día',
        previous: '<',
        next: '>',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        agenda: 'Agenda',
        date: 'Fecha',
        time: 'Hora',
        event: 'Evento',
        noEventsInRange: 'No hay eventos en este rango',
        showMore: total => `+ Ver más (${total})`
    };

    const eventStyleGetter = ( event, start, end, isSelected ) => {

        const style = {
            backgroundColor: '#367cf7',
            borderRadius: '0px',
            opacity: 0.8,
            displey: 'block',
            color: 'white'
        }
    
        return {
            style
        }
    }

    const onDoubleClick = (e) => {
        dispatch(setIsOpenModal(true, "update_event"));
    }

    const onSelectEvent = ({id, start, end, title, description, status}) =>{
        const eventData = {
            id,
            start,
            end,
            title,
            description,
            status
        }
        dispatch(setEventSelected(eventData));
    }

    const onSelectSlot = (e) => {
        dispatch(setIsOpenModal(true, "create_event"));
    }

    return (
        <div>
            <Navbar />
            <div className="calendar-screen">
                <EventsScreen />
                <Calendar
                    events={newEvents}
                    localizer={localizer}
                    startAccessor="start"
                    endAccessor="end"
                    view={lastView}
                    onView={onViewChange}
                    messages={messages}
                    eventPropGetter={eventStyleGetter}
                    onDoubleClickEvent={onDoubleClick}
                    onSelectEvent={onSelectEvent}
                    selectable={true}
                    onSelectSlot={onSelectSlot}
                />
                <CalendarModal />
            </div>
        </div>
    );
};

export default CalendarScreen;