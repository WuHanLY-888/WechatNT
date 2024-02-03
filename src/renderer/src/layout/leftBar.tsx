import React from 'react'
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    PieChartOutlined
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import SvgIcon from '@renderer/assets/SvgIcon'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
): MenuItem {
    return {
        label: '',
        key,
        icon,
        children,
        type,
        style: {
            padding: '0 16px',
            fontSize: 20
        }
    } as MenuItem
}

const items: MenuItem[] = [
    getItem('1', <SvgIcon name="Contact_Chats" />),
    getItem('2', <DesktopOutlined />),
    getItem('3', <ContainerOutlined />),

    getItem('sub1', <MailOutlined />, [getItem('5'), getItem('6'), getItem('7'), getItem('8')]),

    getItem('sub2', <AppstoreOutlined />, [
        getItem('9'),
        getItem('10'),

        getItem('sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')])
    ])
]
const bottonItems: MenuItem[] = [
    getItem('1', <PieChartOutlined />),
    getItem('2', <DesktopOutlined />),
    getItem('3', <ContainerOutlined />)
]

const App: React.FC = () => {
    return (
        <div
            style={{
                width: 60,
                height: 'calc(100% - 115px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <Menu
                style={{
                    background: '#ffffff00',
                    width: 60
                }}
                inlineCollapsed={false}
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={items}
            />
            <Menu
                style={{
                    background: '#ffffff00',
                    height: 200
                }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                items={bottonItems}
            />
        </div>
    )
}

export default App
