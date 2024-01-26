import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

class Axios {
    private instance = axios.create({
        baseURL: 'http://localhost', // 设置默认的请求地址
        timeout: 5000 // 设置请求超时时间
    })

    // 请求拦截器
    private requestInterceptor(config?: AxiosRequestConfig): AxiosRequestConfig {
        const returnConfig = { ...config }
        // 如果有token，可以加进去，等后面弄了状态管理在搞一下
        // console.log('Request Interceptor:', returnConfig);
        return returnConfig
    }

    // 响应拦截器
    private responseInterceptor(response: AxiosResponse): AxiosResponse {
        // 对响应数据做点什么
        // console.log('Response Interceptor:', response)
        return response
    }

    // 处理请求错误
    private handleError(error: any): Promise<never> {
        console.error('Request Error:', error)
        return Promise.reject(error)
    }

    // 发起 GET 请求
    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            const newConfig = this.requestInterceptor(config)
            const response = await this.instance.get<T>(url, newConfig)
            return this.responseInterceptor(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    // 发起 POST 请求
    public async post<T>(
        url: string,
        data?: any,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse<T, any>> {
        try {
            const newConfig = this.requestInterceptor(config)
            const response = await this.instance.post<T>(url, data, newConfig)
            return this.responseInterceptor(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    // 其他类型的请求可以根据需要添加

    // 其他公共方法可以根据需要添加
}

export default new Axios()
