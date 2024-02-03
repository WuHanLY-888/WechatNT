import { BrowserWindow, app } from 'electron'
import userdata from './userManager'
import configs from '../config'
import { is } from '@electron-toolkit/utils'
import { join } from 'path'
import userManager from './userManager'

const server = process.env['ELECTRON_RENDERER_URL']
const baseURL = is.dev && server ? server : join('file://', __dirname, '../renderer/index.html')

type BrowserWindowInit = BrowserWindow | null
class WindowManager {

    private constructor() {
        // 窗口初始化
        const win = userdata.getUserData('isLogin') ? this.mainWin() : this.loginWin()
        win.on('ready-to-show', () => {
            win.show()
        })
    }
    public mainWindow: BrowserWindowInit = null
    public loginWindow: BrowserWindowInit = null

    mainWin(): BrowserWindow {
        if (!this.mainWindow) {
            this.mainWindow = new BrowserWindow({
                ...configs.browser,
                width: 1000,
                height: 700,
                vibrancy: 'medium-light',
                visualEffectState: 'active'
            })
            this.mainWindow.loadURL(baseURL + '#ipcCommunication')
            this.mainWindow.on('close', () => {
                this.mainWindow?.destroy()
                this.mainWindow = null
            })
        }
        return this.mainWindow
    }
    loginWin(): BrowserWindow {
        if (!this.loginWindow) {
            this.loginWindow = new BrowserWindow({
                ...configs.browser,
                width: 280,
                height: 400,
                frame: false,
                resizable: false,
                minimizable: false
            })
            this.loginWindow.setTitle('登陆')
            this.loginWindow.loadURL(baseURL + '#login')
            this.loginWindow.once('close', () => {
                if (!userManager.getUserData('isLogin')) app.quit()
                this.loginWindow?.destroy()
                this.loginWindow = null
            })
        }

        return this.loginWindow
    }
    public static init(): WindowManager {
        if (!WindowManager.instance) {
            WindowManager.instance = new WindowManager()
        }

        return WindowManager.instance
    }
    private static instance: WindowManager | null = null
}

export default WindowManager