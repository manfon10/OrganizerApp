export const appActions = {
    setErrorIfo: "ERROR_APP",
    setAlert: "ALERT_ACTION"
}

export const setErrorApp = error => ({
    type: appActions.setErrorIfo,
    payload: error
});

export const setAlertAction = isAlert => ({
    type: appActions.setAlert,
    payload: isAlert
});