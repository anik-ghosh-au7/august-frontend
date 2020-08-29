import axios from "axios";

const axiosDefaultConfig = {
  baseUrl: "https://august-frontend.herokuapp.com/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json",
  },
  responseType: "json",
};

const createConfig = () => {
  const authToken = localStorage.getItem("access_token");
  const isAuth = !!authToken;
  if (isAuth) {
    axiosDefaultConfig.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return axiosDefaultConfig;
};

const httpRequest = (options) => {
  const { data, url, method } = options;
  const axiosOption = createConfig();
  return axios({
    method,
    url,
    data,
    ...axiosOption,
  });
};

export default httpRequest;
