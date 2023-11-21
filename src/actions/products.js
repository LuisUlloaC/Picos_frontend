export const getProducts = async (api) => {
    let result = null;
    let response = null;
    let sucess = false;

    await api.get('/products')
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    });
    return({sucess: sucess, response:response, result:result})
}


export const createProduct = async (api) => {

}

export const deleteProduct = async (api, id) => {
    let result = null;
    let response = null;
    let sucess = false;

    await api.delete('/products/'+id)
    .then(res => {
        sucess = true;
        response = res;
    })
    .catch(res => {
        sucess = false;
        response = res;
    });
    
    return({sucess: sucess, response:response, result:result})

}