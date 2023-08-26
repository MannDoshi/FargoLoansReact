const getAuthUser = () => {
    return JSON.parse(localStorage.getItem('user'));
}  
export default getAuthUser;