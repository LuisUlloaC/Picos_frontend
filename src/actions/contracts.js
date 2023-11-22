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


export const createContractIssue = async (api, contract_id, template_id,
    bank_office, bank_location, bank_name, account_number) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.post("/issues/", {contract_id, template_id, form_data:{
        bank_office: bank_office, 
        bank_location: bank_location, 
        bank_name: bank_name, 
        account_number: account_number
    }})
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