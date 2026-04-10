import axios from "axios";
// axios({
//     method: "get",
//     url: "https://jsonplaceholder.typicode.com/posts",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
// const res = await axios.get(
//     "https://jsonplaceholder.typicode.com/posts"
//   );
//   console.log(res.data);
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 5000,
});

// 🔐 Request Interceptor (headers, auth token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔁 Response Interceptor (transform + error handling)
api.interceptors.response.use(
  (response) => {
    // 👉 response modify kar sakte ho
    return {
      data: response.data,
      status: response.status,
    };
  },
  async (error) => {
    const originalRequest = error.config;

    // 🔁 Retry logic (simple version)
    if (!originalRequest._retry) {
      originalRequest._retry = true;

      return api(originalRequest); // retry once
    }

    return Promise.reject(error);
  }
);

export default api;