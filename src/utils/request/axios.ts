import axios, { type AxiosResponse, type InternalAxiosRequestConfig, AxiosError } from 'axios'
import { getLocalStorage } from '../storage';
import { ElMessage } from 'element-plus';
import { ElMessageBox } from 'element-plus';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 3000,
})

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token: TokenI | null = getLocalStorage<TokenI>("token")
    if (token) {
      config.headers[token.tokenName] = token.tokenValue;
    }
    config.headers.T = new Date().getTime()

    return config
  },
  (error: AxiosError) => {
    Promise.reject(error)
  }
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, result } = response.data;
    if (code === 200) {
      return result;
    }
    // 响应数据为二进制流处理(Excel导出)
    if (response.data instanceof ArrayBuffer) {
      return response;
    }

    ElMessage.error(message || '系统出错');
    return Promise.reject(new Error(message || 'Error'));
  },
  (error: any) => {
    if (error.response.data) {
      const { code, message } = error.response.data;
      // token 过期,重新登录
      if (code === 403) {
        ElMessageBox.confirm('当前页面已失效，请重新登录', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        }).then(() => {
          localStorage.clear();
          window.location.href = '/login';
        });
      } else {
        ElMessage.error(message || '系统出错');
      }
    }
    return Promise.reject(error.message);
  }
)

export default axiosInstance
