import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
    interface Window {
        ipc: ElectronAPI.ipcRenderer
        electron: ElectronAPI
        api: unknown
        platform: any
    }
}
