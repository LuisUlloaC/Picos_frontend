export const getBills = async (api) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get('/bills')
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    })

    return({
        sucess: sucess,
        response: response,
        result: result
    })
}


export const checkoutOrder = async (api, items) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.post('/checkout', {items})
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    })

    return({
        sucess: sucess,
        response: response,
        result: result
    })
}

