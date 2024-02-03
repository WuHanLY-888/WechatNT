import { BrowserWindowConstructorOptions, WebPreferences } from 'electron'
import { is } from '@electron-toolkit/utils'
import icon from '../../../resources/icon.png?asset'
import { join } from 'path'

export const webPreferences: WebPreferences = {
    preload: join(__dirname, '../preload/index.js'),
    devTools: is.dev,
    sandbox: false,
    webSecurity: false
}
const config: BrowserWindowConstructorOptions = {
    titleBarStyle: 'hidden',
    width: 900,
    height: 600,
    autoHideMenuBar: true,
    trafficLightPosition: {
        x: 3,
        y: 5
    },
    ...(process.platform === 'linux' ? { icon } : {}),
    show: false,
    webPreferences
}

export default config
