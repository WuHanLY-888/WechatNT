import { is } from '@electron-toolkit/utils'
import { BrowserWindow, BrowserWindowConstructorOptions } from 'electron'

class BW extends BrowserWindow {
    constructor(options: BrowserWindowConstructorOptions) {
        super(options)
    }
    public load(url) {
        if (is.dev) return this.loadURL(url)
    }
}

export default BW
