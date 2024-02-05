import { Avatar, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import './index.less'
import style from './index.module.less'
import { Outlet } from 'react-router-dom'

import LeftBar from './leftBar'
import { avatar } from '@renderer/store'

import { useAtom } from 'jotai'

const { Sider } = Layout

const App: React.FC = () => {
    const [avatarUrl, setAvatar] = useAtom(avatar)
    useEffect(() => {
        window.ipc.invoke('get-userAvatar').then((data: string) => {
            setAvatar(data)
        })
    }, [])
    return (
        <Layout style={{ minHeight: '100vh', background: '#ffffff00' }}>
            <Sider
                width="60"
                style={{
                    height: '100vh',
                    backgroundColor: '#e3e3e380'
                }}
            >
                <div className={style.userAvatar}>
                    <Avatar shape="square" src={avatarUrl} size={40} icon={<UserOutlined />} />
                </div>
                <LeftBar />
            </Sider>
            <Outlet />
        </Layout>
    )
}

export default App
