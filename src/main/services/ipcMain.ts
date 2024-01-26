import { ipcHelper } from '@electron-toolkit/utils'
import WindowManager from './windowManager'

export const Default = (win: WindowManager) => {
    ipcHelper.handle('example', () => {
        return win.loginWindow?.id
    })
}
