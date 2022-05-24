import React from 'react';
import Alert from '@mui/material/Alert';

const AlertScreen = ({ message, severity }) => {
    return (
        <div className="alert_app">
            <Alert severity={severity}>
                { message }
            </Alert>
        </div>
    );
}

export default AlertScreen;