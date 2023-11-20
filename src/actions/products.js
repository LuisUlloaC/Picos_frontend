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
        //result = res.data.products;
    });
    return({sucess: sucess, response:response, result:result})
}


export const setProduct = async (api) => {

}