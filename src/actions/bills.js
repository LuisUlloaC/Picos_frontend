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

export const getBillSummaryByDate = async (api, year, month) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get('/bills/summary?year='+year+'&month='+month)
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response= res;
    })
    
    return({
        sucess: sucess,
        response: response,
        result: result
    })

}

export const closeBill = async (api, bill_id) => {
    let sucess = false;
    let response = null;
    
    await api.post('/bills/'+bill_id+'/close')
    .then(res => {
        sucess = true;
        response = res;
    })
    .catch(res => {
        sucess = false;
        response = res;
    })
}

export const getBillSummaryPDFByDate = async (api, year, month)  => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get('/bills/summary/pdf?year='+year+'&month='+month, {
        reponseType: 'arraybuffer', encode: 'null'})
    .then(res => {
        sucess = true;
        response = res
        const fileBlob = new Blob([res.data], { type: 'application/pdf' });
        
        result = URL.createObjectURL(fileBlob)
        console.log(result);
    })
    .catch(res => {
        sucess = false;
        response = res;
        console.log(response)
    })
    return({
        sucess: sucess,
        response: response,
        result: result
    })
}

export const getBillPDF = async (api, bill_id) => {
    let sucess = false;
    let response = null;
    let result = null;

    await api.get('/bills/'+bill_id+'/pdf', {
        reponseType: 'arraybuffer'})
    .then(res => {
        sucess = true;
        response = res
        const base64 = btoa(
            new Uint8Array(res.data).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );
        result = 'data:'+res.headers['content-type']+';base64,'+base64;
        console.log(base64)
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
    console.log('INICIOREUQEST');

    await api.post('/checkout', {items: items})
    .then(res => {
        sucess = true;
        response = res;
        result = res.data;
    })
    .catch(res => {
        sucess = false;
        response = res;
    })

    console.log('TerminoREUQEST');
    return(
        {
        sucess: sucess,
        response: response,
        result: result
    })
}

