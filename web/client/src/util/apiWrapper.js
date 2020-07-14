import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yousefa-step-2020.uc.r.appspot.com/api"
    : "http://localhost:8080/api";

export const getCacheToken = (credentials) => {
  const requestString = `${BASE_URL}`;
  const credentialFail = "GET_CREDENTIAL_TOKEN_FAIL";
  return axios.post(requestString, credentials).catch((error) => ({
    type: credentialFail,
    error,
  }));
};

export const validateToken = (requestOptions) => {
  return axios.post(`${BASE_URL}`, requestOptions).catch(function (error) {
    return JSON.parse(JSON.stringify({ Error: error }));
  });
};

export const getHTTPResponse = (values) => {
  const param = {
    url: values.URI,
    method: values.httpMethod.toLowerCase(),
    headers: {
      Authorization: "Bearer " + values.token,
      ...(values.contentType ? { "Content-Type": values.contentType } : {}),
      ...(values.reqBody ? { data: values.reqBody } : {}),
    },
  };
  let i;
  for (i = 0; i < values.headers.length; i++) {
    if (
      values.headers[i].headerName.length !== 0 &&
      values[i].headerValue.length !== 0
    ) {
      param.headers[values.headers[i].headerName] =
        values.headers[i].headerValue;
    }
  }
  return axios(param).catch(function (error) {
    return JSON.parse(JSON.stringify({ Error: error }));
  });
};
