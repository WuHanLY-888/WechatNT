import { Avatar, Breadcrumb, Layout } from 'antd'
import { UserOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import './index.less'
import style from './index.module.less'
import { Link, Outlet, useLocation } from 'react-router-dom'
import MainMenu from './MainMenu'
import LeftBar from './leftBar'
import WinControl from '@renderer/components/WinControl'
import { avatar } from '@renderer/store'

import { useAtom } from 'jotai';

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const pathSnippets = location.pathname.split('/').filter((i) => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
        const url = `${pathSnippets.slice(0, index + 1).join('/')}`
        return (
            <Breadcrumb.Item key={url}>
                <Link to={url}>{url}</Link>
            </Breadcrumb.Item>
        )
    })
    const [avatarUrl, setAvatar] = useAtom(avatar)
    useEffect(() => {
        window.ipc.invoke('get-userAvatar').then(setAvatar)
    }, [])
    return (
        <Layout style={{ minHeight: '100vh', background: '#ffffff00' }}>
            <Sider width="60"
                style={{
                    height: '100vh',
                    backgroundColor: '#e3e3e300',
                }}
            >
                <div className={style.userAvatar}>
                    <Avatar shape="square" src={avatarUrl}
                        size={40} icon={<UserOutlined />} />
                </div>
                <LeftBar />
            </Sider>
            <Layout>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="logo" style={{ marginTop: window.platform === 'darwin' ? 30 : 0 }}>
                        <h2 style={{ textAlign: 'center', lineHeight: '30px' }}>logo</h2>
                    </div>
                    <MainMenu />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{
                            paddingLeft: '20px',
                            paddingRight: '20px',
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                    >
                        <Breadcrumb style={{ lineHeight: '64px' }}>{extraBreadcrumbItems}</Breadcrumb>
                        <WinControl />
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Outlet />
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>

            </Layout>
        </Layout>
    )
}

export default App
