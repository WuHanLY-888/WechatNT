import React, { useState } from 'react'
import { Layout } from 'antd'
import { Outlet, useParams } from 'react-router-dom'
import WinControl from '@renderer/components/WinControl'
import MainMenu from './MainMenu'
import HeaderSearch from './HeaderSearch'

const { Header, Content, Footer, Sider } = Layout

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const params = useParams()
    const userIntroduce = () => {
        console.log('userIntroduce')
    }

    return (
        <Layout>
            <Sider
                collapsible
                collapsed={collapsed}
                width={260}
                theme="light"
                onCollapse={(value) => setCollapsed(value)}
            >
                <HeaderSearch />
                <MainMenu />
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        paddingLeft: '20px',
                        paddingRight: '20px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        userSelect: 'none'
                    }}
                >
                    <span onClick={userIntroduce} className="no-drag">
                        {params.id}
                    </span>
                    <div>
                        <h1 onClick={userIntroduce} className="no-drag" style={{ fontSize: 25 }}>
                            ···
                        </h1>
                        <WinControl />
                    </div>
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
