import { ipcHelper } from '@electron-toolkit/utils'
import { ipcMain } from 'electron'
import Store from 'electron-store'
// import WindowManager from './windowManager'
// import user from './userManager'

export const Default = () => {
    const store = new Store()
    ipcHelper.handle('example', () => {
        return 'win.loginWindow?.id'
    })

    ipcMain.handleOnce('get-userAvatar', () => store.get('userAvatar'))
    // ipcHelper.handle('get-scan', () => {
    //     const data = user.getScanInfo()
    //     return data
    // })
}
