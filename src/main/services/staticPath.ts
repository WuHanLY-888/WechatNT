import { is } from '@electron-toolkit/utils'
import { join } from 'path'

const instance = {
    baseURL: '',
    loginURL: '',
    mainURL: ''
}

const server = process.env['ELECTRON_RENDERER_URL']
if (is.dev && server) {
    instance.baseURL = server
} else {
    instance.baseURL = join('file://', __dirname, '../renderer/index.html')
}

export default instance
