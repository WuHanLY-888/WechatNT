import { useEffect, useState } from 'react'
import { Avatar, Button, QRCode, QRCodeProps } from 'antd'
import { ScanStatus } from 'wechaty-puppet/types'
import { IpcRendererEvent } from 'electron/renderer'
import styles from './login.module.less'

interface qrcodeStatusTypes {
    qrcode: string
    status: ScanStatus
    data?: string
}

const App: React.FC = () => {
    useEffect(() => {
        const { invoke, on: ipcOn } = window.ipc

        ipcOn('user-scan', (_: IpcRendererEvent, data: qrcodeStatusTypes) => {
            setCodeVal(data.qrcode)
            setStatus('active')
            setLoginStatus(data.status)
            switch (data.status) {
                case 0: // 未知
                    break
                case 1: // 取消
                    break
                case 2: // 等待
                    break
                case 3: // 被扫了
                    setUserAvatar(data.data)
                    break
                case 4: // 完成了
                    break
                case 5: // 超时
                    break
                default:
                    break
            }
        })
        invoke('get-scan').then((data: qrcodeStatusTypes) => {
            setLoginStatus(data.status)
            if (!data.qrcode) return
            setCodeVal(data.qrcode)
            setStatus('active')
        })
    }, [])
    const [status, setStatus] = useState<QRCodeProps['status']>('loading')
    const [codeVal, setCodeVal] = useState<string>('-')
    const reFreshQRcode = () => {
        setStatus('loading')
        // 请求接口
        setTimeout(setStatus, 1000, 'active')
    }

    const [userAvatarUrl, setUserAvatar] = useState<string>()
    const [loginStatus, setLoginStatus] = useState<ScanStatus>(ScanStatus.Unknown)
    const scanCancel = () => {
        setLoginStatus(ScanStatus.Cancel)
        setUserAvatar(void 0)
    }

    return (
        <div>
            {(loginStatus <= 2 || loginStatus === 5) && (
                <div className="ant-motion-fade">
                    <div className={styles.top}>
                        <p style={{ marginTop: 4 }}>请扫码登陆《丐版微信》</p>
                    </div>
                    <QRCode
                        style={{ margin: '0 auto', padding: '0', borderRadius: '0' }}
                        errorLevel="H"
                        size={150}
                        color="#424242" // #fcfcfd
                        bordered={false}
                        status={status}
                        onRefresh={reFreshQRcode}
                        value={codeVal}
                    />
                </div>
            )}
            {loginStatus >= 3 && loginStatus <= 4 && (
                <div className="ant-motion-fade">
                    <div className={styles.top} style={{ height: 400 }}>
                        <Avatar shape="square" size={80} src={userAvatarUrl} />
                        <p style={{ marginTop: 30 }}>
                            {loginStatus === 3 ? '需要在手机上进行确定' : '正在登陆'}
                        </p>
                        <Button
                            type="link"
                            className={styles.cancelBtn}
                            onClick={scanCancel}
                            style={{
                                color: '#5b6b92'
                            }}
                        >
                            取消
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default App
