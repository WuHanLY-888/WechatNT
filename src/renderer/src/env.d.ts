/// <reference types="vite/client" />

declare global {
    interface Window {
        _AMapSecurityConfig: string // 替换any为你的属性类型
    }
}

interface ImportMetaEnv {
    readonly VITE_ADDRESS: string
    readonly VITE_MY_VARIABLE: string
    // more env variables...
}
