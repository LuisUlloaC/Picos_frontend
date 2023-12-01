export const getBills = async (api) => {
  let sucess = false;
  let response = null;
  let result = null;

  await api
    .get("/bills")
    .then((res) => {
      sucess = true;
      response = res;
      result = res.data;
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });

  return {
    sucess: sucess,
    response: response,
    result: result,
  };
};

export const getBillSummaryByDate = async (api, year, month) => {
  let sucess = false;
  let response = null;
  let result = null;

  await api
    .get("/bills/summary?year=" + year + "&month=" + month)
    .then((res) => {
      sucess = true;
      response = res;
      result = res.data;
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });

  return {
    sucess: sucess,
    response: response,
    result: result,
  };
};

export const closeBill = async (api, bill_id) => {
  let sucess = false;
  let response = null;

  await api
    .post("/bills/" + bill_id + "/close")
    .then((res) => {
      sucess = true;
      response = res;
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });
};

export const getBillSummaryPDFByDate = async (api, year, month) => {
  let sucess = false;
  let response = null;
  let result = null;
  let edgeURL = null;

  await api
    .get("/bills/summary/pdf?year=" + year + "&month=" + month, {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    })
    .then((res) => {
        sucess = true;
        response = res;
        const fileBlob = new Blob([res.data]);
        const edgeBlob = new Blob([res.data], {type: 'application/pdf'});
        result = window.URL.createObjectURL(fileBlob);
        edgeURL = window.URL.createObjectURL(edgeBlob);
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });
  return {
    sucess: sucess,
    response: response,
    result: result,
    edgeURL: edgeURL,
  };
};

export const getBillPDF = async (api, bill_id) => {
  let sucess = false;
  let response = null;
  let result = null;
  let edgeURL = null;

  await api
    .get("/bills/" + bill_id + "/pdf", {
      responseType: "arraybuffer",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/pdf",
      },
    })
    .then((res) => {
      sucess = true;
        response = res;
        const fileBlob = new Blob([res.data]);
        const edgeBlob = new Blob([res.data], {type: 'application/pdf'});
        result = window.URL.createObjectURL(fileBlob);
        edgeURL = window.URL.createObjectURL(edgeBlob);
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });
  return {
    sucess: sucess,
    response: response,
    result: result,
    edgeURL: edgeURL,
  };
};

export const checkoutOrder = async (api, items) => {
  let sucess = false;
  let response = null;
  let result = null;

  await api
    .post("/checkout", { items: items })
    .then((res) => {
      sucess = true;
      response = res;
      result = res.data;
    })
    .catch((res) => {
      sucess = false;
      response = res;
    });
    if(sucess){
      let file = await getBillPDF(api, result.billing_id);
      const link = document.createElement("a");
      link.href = file.result;
      link.setAttribute("download", "orden.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(file.result);
    }

  return {
    sucess: sucess,
    response: response,
    result: result,
  };
};
