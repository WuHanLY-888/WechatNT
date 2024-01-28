import { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Carousel, QRCode, QRCodeProps } from 'antd'
import { ScanStatus } from 'wechaty-puppet/types'
import { IpcRendererEvent } from 'electron/renderer'
import styles from './login.module.less'
import { CarouselRef } from 'antd/es/carousel'

interface qrcodeStatusTypes {
    qrcode: string
    status: ScanStatus
    data?: string
}
const App: React.FC = () => {
    useEffect(() => {
        const { invoke, on: ipcOn } = window.ipc

        ipcOn('user-scan', (_: IpcRendererEvent, data: qrcodeStatusTypes) => {
            console.log({ data });
            console.log(ScanStatus[data.status]);
            setCodeVal(data.qrcode)
            setStatus('active')
            switch (data.status) {
                case 0: // 未知

                    break;
                case 1: // 取消

                    break;
                case 2: // 等待

                    break;
                case 3: // 被扫了
                    setUserAvatar(data.data)
                    carRef.current?.next()
                    break;
                case 4: // 完成了

                    break;
                case 5: // 超时

                    break;
                default:
                    break;
            }
        })
        invoke('get-scan').then((data: qrcodeStatusTypes) => {
            console.log(data);

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

    const carRef = useRef<CarouselRef>(null)
    const [userAvatarUrl, setUserAvatar] = useState<string>()

    return (
        <div>
            <Carousel ref={carRef} dots={false}>
                <div>
                    <div className={styles.top}>
                        <p style={{ marginTop: 4 }}>
                            扫码登陆微信
                        </p>
                    </div>
                    <QRCode
                        style={{ margin: '0 auto', padding: '0', borderRadius: '0' }}
                        errorLevel="H"
                        size={150}
                        color='#424242'
                        bordered={false}
                        status={status}
                        onRefresh={reFreshQRcode}
                        value={codeVal}
                    />

                </div>
                <div>
                    <div className={styles.top}
                        style={{ height: 400 }}>
                        <Avatar shape="square" size={80}
                            src={userAvatarUrl} />
                        <p style={{ marginTop: 30 }}>
                            需要在手机上进行确定
                        </p>
                        <div className={styles.cancelBtn}>
                            <Button type="link"
                                style={{
                                    color: '#5b6b92',
                                }}>
                                取消
                            </Button>

                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    )
}
export default App
