import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getCacheToken = (credentials) => {
  const requestString = `${BASE_URL}/token`;
  const res = axios.post(requestString, credentials).catch((error) => ({
    type: "GET_CREDENTIAL_TOKEN_FAIL",
    error,
  }));
  return res;
};

export const validateToken = (requestOptions) => {
  return axios.post(`${BASE_URL}`, requestOptions);
};
