import axios from "axios";

const BASE_URL = process.env.BACKEND_URL ?? "http://localhost:8080/api";

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
