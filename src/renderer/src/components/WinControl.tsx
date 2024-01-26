import React, { useEffect, useState } from 'react'
import {
    CloseOutlined,
    FullscreenOutlined,
    MinusOutlined,
    FullscreenExitOutlined
} from '@ant-design/icons'

const Controls: React.FC = () => {
    if (window.platform === 'darwin') return <div></div>
    const [isFullBtn, setFullBtn] = useState<boolean>(false)
    useEffect(() => {
        window.ipc.on('window-event', (_, { type }) => {
            setFullBtn(type === 'maximize')
        })

        return () => {
            window.ipc.removeAllListeners('window-event')
        }
    }, [])
    return (
        <div className="controlsBtn">
            <MinusOutlined onClick={() => window.ipc.send('win:invoke', 'min')} />
            {isFullBtn ? (
                <FullscreenExitOutlined onClick={() => window.ipc.send('win:invoke', 'max')} />
            ) : (
                <FullscreenOutlined onClick={() => window.ipc.send('win:invoke', 'max')} />
            )}
            <CloseOutlined onClick={() => window.ipc.send('win:invoke', 'close')} />
        </div>
    )
}

export default Controls
