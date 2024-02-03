import { app } from 'electron'
import { electronApp, optimizer } from '@electron-toolkit/utils'
import WindowManager from './services/windowManager'
import user from './services/userManager'
import { Default } from './services/ipcMain'

// console.log(import.meta.env.VITE_MY_VARIABLE)

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
    electronApp.setAppUserModelId('com.electron')

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

    Default()
    optimizer.registerFramelessWindowIpc()
    app.on('activate', function () {
        AppReady()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
