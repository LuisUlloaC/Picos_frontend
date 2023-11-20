export const userLogin = async (api, username, password) => { 
    let result = null;
    let state_data = {};
    let sucess = false;

    await api.post('/login/', {
        username: username,
        password: password})
    .then(res => {
        state_data = {
            access: res.data.token,
            };
        result = res;
        sucess = true })
    .catch(res => {
        sucess = false;
            result = res; 
          })

    return (
        {
            result: result,
            sucess: sucess,
            state_data: state_data
        }
    )
}