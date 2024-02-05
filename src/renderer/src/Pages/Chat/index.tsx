import React, { useState } from 'react'
import { Breadcrumb, Layout } from 'antd'
import { Link, Outlet, useLocation } from 'react-router-dom'
import WinControl from '@renderer/components/WinControl'
import MainMenu from '@renderer/layout/MainMenu'

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

    return (
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
    )
}

export default App
