interface FetchOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' // 其他HTTP方法可继续添加
    headers?: { [key: string]: string }
    body?: unknown
}
export const custFetch = async (url: string, options: FetchOptions = {}) => {
    // 处理请求方法
    const method = options.method || 'GET'

    // 处理请求头部
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    // 处理请求体
    let body
    if (options.body) {
        body = JSON.stringify(options.body)
    }

    // 发起fetch请求
    try {
        console.log({ method, headers, body })

        const response = await window.fetch(url, { method, headers, body })

        // 检查响应状态
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`${response.status} - ${errorText}`)
        }

        // 假定响应数据为JSON格式，进行解析
        const data = await response.json()

        // 返回数据
        return data
    } catch (error) {
        // 错误处理
        console.error('Fetch Error:', error)
        throw error // 如果需要让错误进一步传递，则重新抛出
    }
}
