import axios from 'axios'

export const API_URL = '/api'

const $api = axios.create({
	baseURL: API_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

$api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('accessToken')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

$api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			try {
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) {
					console.error('No refresh token found in localStorage')
					throw new Error('No refresh token available')
				}
				console.log('Attempting to refresh token with:', refreshToken)
				const response = await axios.post(`${API_URL}/auth/refresh`, {
					refreshToken,
				})
				const { accessToken } = response.data
				console.log('New access token received:', accessToken)
				localStorage.setItem('accessToken', accessToken)
				originalRequest.headers.Authorization = `Bearer ${accessToken}`
				return $api(originalRequest)
			} catch (refreshError) {
				console.error('Token refresh failed:', refreshError)
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/ru/auth/login'
				return Promise.reject(refreshError)
			}
		}
		return Promise.reject(error)
	}
)

export default $api

// import axios from 'axios'

// export const API_URL = '/api'

// const $api = axios.create({
// 	baseURL: API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// })

// $api.interceptors.request.use(
// 	config => {
// 		const token = localStorage.getItem('accessToken')
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}`
// 		}
// 		return config
// 	},
// 	error => Promise.reject(error)
// )

// $api.interceptors.response.use(
// 	response => response,
// 	async error => {
// 		const originalRequest = error.config
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true
// 			try {
// 				const refreshToken = localStorage.getItem('refreshToken')
// 				const response = await axios.post(`${API_URL}/auth/refresh`, {
// 					refreshToken,
// 				})
// 				const { accessToken } = response.data
// 				localStorage.setItem('accessToken', accessToken)
// 				originalRequest.headers.Authorization = `Bearer ${accessToken}`
// 				return $api(originalRequest)
// 			} catch (refreshError) {
// 				localStorage.removeItem('accessToken')
// 				localStorage.removeItem('refreshToken')
// 				window.location.href = '/ru/auth/login'
// 				return Promise.reject(refreshError)
// 			}
// 		}
// 		return Promise.reject(error)
// 	}
// )

// export default $api

// import axios from "axios";

// export const API_URL = "http://localhost:3001/api";

// const $api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// $api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("accessToken");
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// $api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const refreshToken = localStorage.getItem("refreshToken");
//         const response = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
//         const { accessToken } = response.data;
//         localStorage.setItem("accessToken", accessToken);
//         originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//         return $api(originalRequest);
//       } catch (refreshError) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/ru/auth/login";
//         return Promise.reject(refreshError);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default $api;
