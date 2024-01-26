import { useEffect, useState } from 'react'
import { QRCode, QRCodeProps } from 'antd'

const App: React.FC = () => {
    useEffect(() => {
        setTimeout(setStatus, 1000, 'active')
        setTimeout(setStatus, 1000 * 100, 'expired')
    }, [])
    const [status, setStatus] = useState<QRCodeProps['status']>('loading')
    const reFreshQRcode = () => {
        setStatus('loading')
        // 请求接口
        setTimeout(setStatus, 1000, 'active')
    }
    return (
        <div>
            <QRCode
                style={{ margin: '0 auto' }}
                errorLevel="H"
                size={300}
                status={status}
                iconSize={60}
                onRefresh={reFreshQRcode}
                value="请使用相应的App扫码登陆"
                icon="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            />
        </div>
    )
}
export default App
