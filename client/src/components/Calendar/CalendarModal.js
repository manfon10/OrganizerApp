import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { useSelector, useDispatch  } from 'react-redux';
import { useForm } from 'react-hook-form';
import { setIsCloseModal, createEventThunk, setEventCreate, updateEventThunk, updateEventAsignThunk } from '../../redux/actions';
import getConfig from '../../utils/getConfig';
import styles from './Calendar.module.css';

export const CalendarModal = () => {

    const openModal = useSelector( state => state.events);
    const { eventSelected } = useSelector( state => state.events);
    const { isOpenModal, isCloseModal } = useSelector( state => state.events);
    const { user } = useSelector( state => state.user.userInfo);

    const { register, handleSubmit, setValue } = useForm();

    const [ users, setUsers ] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        if(eventSelected.id) {
            setValue("id", eventSelected.id);
            setValue("title", eventSelected.title);
            setValue("start", eventSelected.start);
            setValue("end", eventSelected.end);
            setValue("description", eventSelected.description);
            setValue("status", eventSelected.status);
        }
    }, [eventSelected]);

    const closeModal = () => {
        dispatch(setIsCloseModal(false));
    }

    const newEvent = (data, e) => {
        e.preventDefault();
        if(eventSelected.id) {
            dispatch(updateEventThunk(data, user?.id));
            dispatch(setIsCloseModal(false));
        }else if(eventSelected.permission) {
            dispatch(updateEventAsignThunk(data, user?.id));
            dispatch(setIsCloseModal(false));
        }else {
            dispatch(setEventCreate());
            dispatch(createEventThunk(data, user?.id));
            dispatch(setIsCloseModal(false));
        }
    }

    useEffect(() => {
        axios.get('http://localhost:4904/api/v1/users', getConfig())
            .then( res => setUsers(res.data.users) );
    }, []);

    const validated = (e) => {
        if( openModal && isOpenModal?.modal === "update_event") {
            return isOpenModal;
        } else if( openModal && isOpenModal?.modal === "create_event") {
            return isOpenModal;
        }else {
            return isCloseModal;
        }
    }

    return (
        <Modal 
            isOpen={ validated() }
            onRequestClose={closeModal}
            className="modal" 
            overlayClassName="modal-fondo"
        >
           <h2>{ isOpenModal?.modal === "create_event" ? "Create Event" : "Update Event" }</h2>
                <form onSubmit={handleSubmit(newEvent)} className={styles.form_modal}>
                    <div className={styles.flex_row}>
                        <div>
                            <p>Start</p>
                            <input 
                                type="date"
                                {...register("start", { required: true })}
                            />
                        </div>
                        <div>
                            <p>End</p>
                            <input 
                                type="date"
                                {...register("end", { required: true })}
                            />
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div>
                            <p>Title</p>
                            <input 
                                type="text"
                                {...register("title", { required: true })}
                                placeholder="Title"
                            />
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div>
                            <p>Description</p>
                            <textarea 
                                cols="20" 
                                rows="5"
                                {...register("description", { register: true })}
                            ></textarea>
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div>
                            <p>Asign to User</p>
                            <select>
                                {
                                    users.map( user => (
                                        <option value={user.id}>{user.name}</option>  
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <p>Permission</p>
                            <select>
                                <option value="writing">writing</option>
                                <option value="read">read</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.flex_row}>
                        <div>
                        <p>Status</p>
                        <select {...register("status", { required: true })}>
                            <option value="Progress">Progress</option>
                            <option value="Terminated">Terminated</option>
                        </select>
                        </div>
                    </div>
                    <button>{ isOpenModal?.modal === "create_event" ? ("Create") : ("Update")}</button>
                </form>
        </Modal>
    );
};