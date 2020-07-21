import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://yousefa-step-2020.uc.r.appspot.com/api"
    : "http://localhost:8080/api";

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
  return axios.post(`${BASE_URL}`, requestOptions).catch(function (error) {
    return JSON.parse(JSON.stringify({ Error: error }));
  });
};
