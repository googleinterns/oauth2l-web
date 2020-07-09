import axios from "axios";

const BASE_URL = "http://localhost:8080";

export const getCacheToken = (credentials) => {
  const requestString = `${BASE_URL}/api`;
  const credentialFail = "GET_CREDENTIAL_TOKEN_FAIL";
  const res = axios.post(requestString, credentials).catch((error) => ({
    type: credentialFail,
    error,
  }));
  return res;
};
