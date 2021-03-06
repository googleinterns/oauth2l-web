import axios from "axios";

// TODO: Deploy backend on a Google Cloud service
const BASE_URL = "http://localhost:8080/api";

export const getOAuthToken = (credentials) => {
  const requestString = `${BASE_URL}`;
  const oauthTokenFail = "GET_OAUTH_TOKEN_FAIL";
  return axios.post(requestString, credentials).catch((error) => ({
    type: oauthTokenFail,
    error,
  }));
};

export const getNewCredentialToken = (oldToken) => {
  const requestString = `${BASE_URL}/jwt/token`;
  const credentialTokenFail = "GET_CREDENTIAL_TOKEN_FAIL";
  return axios.post(requestString, oldToken).catch((error) => ({
    type: credentialTokenFail,
    error,
  }));
};

export const validateToken = (requestOptions) => {
  return axios.post(`${BASE_URL}`, requestOptions).catch((error) => {
    return JSON.parse(JSON.stringify({ Error: error }));
  });
};

export const getHTTPResponse = (requestBody) => {
  return axios(requestBody).catch((error) => {
    return JSON.parse(JSON.stringify({ Error: error }));
  });
};
