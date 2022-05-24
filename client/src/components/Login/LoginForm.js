import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../../redux/actions';
import { AlertScreen } from '../';
import styles from './Login.module.css';

const LoginForm = () => {

    const dispatch = useDispatch();

    const { alertAction } = useSelector( state => state.app );
    const { errorInfo } = useSelector( state => state.user );

    const { register, handleSubmit } = useForm();

    const loginHandle = data => {
        dispatch(loginThunk(data));
    }

    return (
        <div className={styles.container_login}>
            <div className={styles.name_app}>
                <h3><i className="fa-solid fa-calendar"></i> Organizer App</h3> 
            </div>
            <form onSubmit={handleSubmit(loginHandle)} className={styles.form_login}>
                <p>Email</p>
                <input 
                    type="text"
                    {...register("email", { required: true })}
                />
                <p>Password</p>
                <input 
                    type="password"
                    {...register("password", { required: true })}
                />
                <Link to={'/register'}>
                    Create an account!
                </Link>
                <button>Log In</button>
            </form>
        </div>
    );
};

export default LoginForm;