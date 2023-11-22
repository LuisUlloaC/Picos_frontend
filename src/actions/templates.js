export const getTemplates = async (api) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get("/templates")
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

export const getTemplateInfo = async (api, template_id) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get("/templates/"+template_id)
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