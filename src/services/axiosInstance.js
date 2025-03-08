import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

export const HR_API = axios.create({
  baseURL: `https://hr.ncaa.gov.ng/old_hr/apis/`,
});
HR_API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem("memo-auth-session"))?.state
    ?.userData?.token;

  req.headers["token"] = token || "";
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});

export const API = axios.create({
  baseURL: `http://lamp3.ncaa.gov.ng/`,
});
API.interceptors.request.use((req) => {
  // Get the token dynamically on each request
  const token = JSON.parse(localStorage.getItem("memo-auth-session"))?.state
    ?.userData?.token;

  req.headers["token"] = token || "";
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});

export const AUTH_API = axios.create({ baseURL: `http://lamp3.ncaa.gov.ng/` }); //https://hrnew.creditclan.com/api/index.php/
AUTH_API.interceptors.request.use((req) => {
  // const token = JSON.parse(localStorage.getItem('memo-auth-session'))
  //   ?.state?.userData?.token;

  // req.headers['Token'] = token || '';
  req.headers["Content-type"] = "application/json";
  req.headers["Accept"] = "application/json";
  return req;
});


const http = axios.create({
  baseURL,
});

http.interceptors.request.use((config) => {
  const { intercept = true } = config;
  if (!intercept) return config;
  const token = JSON.parse(localStorage.getItem("og-auth-session"))?.state;
  console.log(token)
  if (token) config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default http;
