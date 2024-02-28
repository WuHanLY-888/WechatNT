import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Avatar, ConfigProvider, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Image, { getImage } from '@renderer/components/Image'
import style from './index.module.less'

type MenuItem = Required<MenuProps>['items'][number]
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
): MenuItem {
    return {
        key,
        icon,
        label
    } as MenuItem
}


const App: React.FC = () => {

    const items: MenuItem[] = [
        getItem('ipc通信', '/ipcCommunication',
            <Avatar className={style.avatar} shape="square" src={getImage('Expression_1@2x')} size={30} icon={<UserOutlined />} />
        ),
        getItem('Antv Larkmap', '/map', <DesktopOutlined />),
        getItem('User', '/sub1', <UserOutlined />),
        getItem('Team', '/sub2', <TeamOutlined />),
        getItem('Files', '/9', <FileOutlined />)
    ]
    const navigateTo = useNavigate()
    const menuClick = (e: { key: string }) => {
        console.log(e.key)
        // 编程式导航跳转
        navigateTo(`/chat${e.key}`)
    }

    const currentRoute = useLocation()

    return (
        <ConfigProvider
            theme={{
                components: {
                    Menu: {
                        itemMarginBlock: 0,
                        itemBorderRadius: 0,
                        itemMarginInline: 0,
                        itemPaddingInline: 0,
                        itemActiveBg: '#dedede',
                        itemSelectedBg: '#dedede',
                        itemHeight: 67,
                        collapsedIconSize: 40,
                    }
                }
            }}
        >
            <Menu
                theme="light"
                defaultSelectedKeys={[currentRoute.pathname]}
                items={items}
                style={{
                    padding: 0
                }}
                onClick={menuClick}
            />
        </ConfigProvider>
    )
}

export default App
