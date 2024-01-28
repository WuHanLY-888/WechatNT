import { ipcHelper } from '@electron-toolkit/utils'
// import WindowManager from './windowManager'
// import user from './userManager'

export const Default = () => {

    ipcHelper.handle('example', () => {
        return 'win.loginWindow?.id'
    })


    // ipcHelper.handle('get-scan', () => {
    //     const data = user.getScanInfo()
    //     return data
    // })
}
