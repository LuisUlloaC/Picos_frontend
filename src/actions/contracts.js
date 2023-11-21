export const getContracts = async (api) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get("/contracts")
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    });

    return({
        sucess: sucess,
        response: response,
        result: result
    })
}

export const getContractInfo = async (api, contract_id) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get("/contracts/"+contract_id)
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    });

    return({
        sucess: sucess,
        response: response,
        result: result
    })
}