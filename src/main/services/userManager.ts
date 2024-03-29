import { ipcHelper } from '@electron-toolkit/utils'
import WindowManager from './windowManager'

import { WechatyBuilder, ScanStatus, Contact } from '../src/mods/mod.js'
import { WechatyInterface } from '../src/wechaty/wechaty-impl'
import Store from 'electron-store'
import MsgManager from './Message'

const store = new Store()
interface userdata {
    // [key: string]: unknown
    isLogin: boolean
    name?: string
    city?: string
    realName?: string
    nickName?: string
    avatar?: string
    token?: string
    sex?: 'male' | 'female' | 'unknown'
    id?: string
    email?: string
}
interface qrcodeStatusTypes {
    qrcode: string
    status: ScanStatus
}
class userManager {
    private constructor() {
        const options = {
            name: 'ding-dong-bot'
        }

        this.bot = WechatyBuilder.build(options)
        this.bot
            .on('logout', (e) => this.onLogout.call(this, e))
            .on('login', (e) => this.userlogin.call(this, e))
            .on('scan', (...e) => this.onScan.apply(this, e))
            .on('error', (e) => this.onError.call(this, e))
            .on('message', (e) => MsgManager.onMessage(e, this.bot))

            .start()
            .catch(async (e) => {
                console.error('Bot start() fail:', e)
                await this.bot?.stop()
                process.exit(-1)
            })
        // 用户信息
        ipcHelper.handle('set-userdata', (_, data) => {
            this.userdata = {
                ...this.userdata,
                ...data
            }
        })

        ipcHelper.handle('get-userdata', (_, key?: keyof userdata | Array<keyof userdata>) =>
            this.getUserData(key)
        )

        ipcHelper.handle('user-logout', () => this.logout())

        ipcHelper.handle('get-scan', () => this.getScanInfo())
    }
    private qrcodeInfo: qrcodeStatusTypes = {
        qrcode: '',
        status: 0
    }

    private bot: WechatyInterface
    private userdata: userdata = {
        isLogin: false
    }

    private onScan(qrcode: string, status: ScanStatus, data?: string) {
        this.qrcodeInfo.qrcode = qrcode
        this.qrcodeInfo.status = status
        const loginWin = WindowManager.init().loginWindow

        loginWin?.webContents.send('user-scan', { qrcode, status, data })
        console.log({ qrcode, status, data })

        switch (status) {
            case ScanStatus.Waiting || ScanStatus.Timeout:
                const qrcodeImageUrl = [
                    'https://wechaty.js.org/qrcode/',
                    encodeURIComponent(qrcode)
                ].join('')
                console.info('onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)

            case ScanStatus.Scanned:
                data && store.set('userAvatar', data)
                this.userdata.avatar = data

            default:
                console.log({ qrcode, status, data })
                break
        }
    }

    private onLogout(user: Contact) {
        console.info(`${user.name()} logged out`)
    }

    private onError(e: Error) {
        console.error('Bot error:', e)
        this.bot.start()
    }

    /**
     * getScanInfo
     */
    public getScanInfo(): qrcodeStatusTypes {
        const { status, qrcode } = this.qrcodeInfo

        return { status, qrcode }
    }

    public getUserData<T extends keyof userdata>(key?: T | Array<keyof userdata>): unknown {
        // 如果没有传入key，则返回全部userdata
        if (key === undefined) {
            return this.userdata as userdata
        }
        // 如果传入的是一个数组，则返回userdata中对应的字段
        if (Array.isArray(key)) {
            return key.reduce((result, currentKey) => {
                result[currentKey] = this.userdata[currentKey]
                return result
            }, {})
        }
        // 如果传入的是一个字符串，则返回userdata中对应的字段
        return this.userdata[key]
    }

    public setUserdata(data: userdata): void {
        this.userdata = {
            ...this.userdata,
            ...data
        }
    }
    public async userlogin(contact: Contact) {
        const file = await contact.avatar()
        const name = file.name
        await file.toFile(name, true)

        this.userdata = {
            ...this.userdata,
            isLogin: true,
            name: contact.payload?.name,
            city: contact.city()
        }
        const win = WindowManager.init()
        const main = win.mainWin()
        // 创建主窗口

        main.on('ready-to-show', () => {
            main.show()
            win.loginWindow?.destroy()
            win.loginWindow = null
        })
    }
    public logout() {
        const win = WindowManager.init()
        const loginWin = win.loginWin()
        // 创建主窗口

        loginWin.on('ready-to-show', () => {
            loginWin.show()
            win.mainWindow?.destroy()
            win.mainWindow = null
        })

        this.userdata = {
            isLogin: false
        }
    }

    // 单实例
    public static init(): userManager {
        if (!userManager.instance) {
            userManager.instance = new userManager()
        }

        return userManager.instance
    }
    private static instance: userManager | null = null
}
// const usermanager = userManager.init()

export default userManager.init()
