import { ScanStatus } from 'wechaty-puppet/types'

export interface qrcodeStatusTypes {
    qrcode: string
    status: ScanStatus
    data?: string
}