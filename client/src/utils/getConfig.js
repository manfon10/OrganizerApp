const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('tokenUser')}`}
});

export default getConfig;