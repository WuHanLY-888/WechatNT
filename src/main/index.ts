import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import WindowManager from './services/windowManager'
import user from './services/userManager'
import { WechatyBuilder, ScanStatus, Message, Contact } from './src/mods/mod.js'

import { FileBox } from 'file-box'
import { WechatyInterface } from './src/wechaty/wechaty-impl'

console.log(import.meta.env.VITE_MY_VARIABLE)

function AppReady(): void {
    // 在macOS上，dock图标被点击时，会触发

    const win = WindowManager.init()
    // 此处用 isLogin判断登陆状态，后修改代码可用token结合后台判断登陆状态
    const main = user.getUserData('isLogin') ? win.mainWin() : win.loginWin()
    // 拿到窗口实例，并展示
    main.show()
}

// 程序准备就绪，可以使用一些api了
app.whenReady().then(() => {
    // Set app user model id for windows
    console.log('app.ready')

    electronApp.setAppUserModelId('com.electron')

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
        type BrowserWindowEvent = 'maximize' | 'minimize'

        const eventList: BrowserWindowEvent[] = ['maximize', 'minimize']

        eventList.map((eventName: BrowserWindowEvent) => {
            window.on(eventName as 'will-resize', () => {
                window?.webContents.send('window-event', { type: eventName })
            })
        })
        optimizer.watchWindowShortcuts(window, {
            escToCloseWindow: true,
            zoom: true
        })
    })

    AppReady()

    optimizer.registerFramelessWindowIpc()
    app.on('activate', function () {
        AppReady()
    })
    const options = {
        name: 'ding-dong-bot'
    }

    const bot = WechatyBuilder.build(options)
    bot.on('logout', onLogout)
        .on('login', onLogin)
        .on('scan', onScan)
        .on('error', onError)
        .on('message', (e: Message) => onMessage(bot, e))

        .start()
        .catch(async (e) => {
            console.error('Bot start() fail:', e)
            await bot.stop()
            process.exit(-1)
        })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        console.log({ qrcode })

        // qrTerm.generate(qrcode)

        const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join(
            ''
        )

        console.info('onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
        console.info('onScan: %s(%s)', ScanStatus[status], status)
    }
}

function onLogin(user: Contact) {
    console.info(`${user.name()} login`)
}

function onLogout(user: Contact) {
    console.info(`${user.name()} logged out`)
}

function onError(e: Error) {
    console.error('Bot error:', e)
}

async function onMessage(bot: WechatyInterface, msg: Message) {
    console.info(msg.toString())

    if (msg.self()) {
        console.info('Message discarded because its outgoing')
        return
    }

    if (msg.age() > 2 * 60) {
        console.info('Message discarded because its TOO OLD(than 2 minutes)')
        return
    }

    if (msg.type() !== bot.Message.Type.Text || !/^(ding|ping|bing|code)$/i.test(msg.text())) {
        console.info('Message discarded because it does not match ding/ping/bing/code')
        return
    }

    /**
     * 1. reply 'dong'
     */
    await msg.say('dong')
    console.info('REPLY: dong')

    /**
     * 2. reply image(qrcode image)
     */
    const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')

    await msg.say(fileBox)
    console.info('REPLY: %s', fileBox.toString())

    /**
     * 3. reply 'scan now!'
     */
    await msg.say(
        [
            'Join Wechaty Developers Community\n\n',
            'Scan now, because other Wechaty developers want to talk with you too!\n\n',
            '(secret code: wechaty)'
        ].join('')
    )
}
