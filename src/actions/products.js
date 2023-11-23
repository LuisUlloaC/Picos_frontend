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


export const createProduct = async (api, name, stock, price) => {
    let result = null;
    let response = null;
    let sucess = false;

    await api.post('/products/',{name, stock, price})
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


export const editProduct = async (api, id, name, stock, price) => {

    let result = null;
    let response = null;
    let sucess = false;

    await api.patch('/products/'+id ,{name, stock, price})
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

export const getProductImage = async (api,id) => {
    let result = null;
    let response = null;
    let sucess = false;


    await api.get('/products/images/'+id,
        {responseType: 'arraybuffer'})
    .then(res => {
        sucess = true;
        response = res;
        const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
        result = 'data:'+res.headers['content-type']+';base64,'+base64;
        
    })
    .catch(res => {
        sucess = false;
        response = res;
    });
    
    return({sucess: sucess, response:response, result:result})
}