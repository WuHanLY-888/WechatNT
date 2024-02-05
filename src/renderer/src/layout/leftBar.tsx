import React, { useState } from 'react'
import style from './index.module.less'
import SvgIcon from '@renderer/assets/SvgIcon'
import { useNavigate } from 'react-router-dom'

function getItem(icon: string, ActiveIcon: string): (isAction: boolean) => React.ReactNode {
    return (isAction) => <SvgIcon name={isAction ? ActiveIcon : icon} size={32} />
}

const items: Array<(isAction: boolean) => React.ReactNode> = [
    getItem('TabBar_Chat', 'TabBar_Chat_Selected'),
    getItem('TabBar_Contacts', 'TabBar_Contacts_Selected'),
    getItem('TabBar_Favorites', 'TabBar_Favorites_Selected'),
    getItem('TabBar_Folder', 'TabBar_Favorites_Selected'),
    getItem('TabBar_SNS', 'TabBar_Favorites_Selected'),
    getItem('TabBar_Feed', 'TabBar_Favorites_Selected'),
    getItem('TabBar_News', 'TabBar_Favorites_Selected'),
    getItem('TabBar_WebSearch', 'TabBar_Favorites_Selected')
]
const bottonItems: Array<(isAction: boolean) => React.ReactNode> = [
    getItem('Profile_WeApp', 'TabBar_Favorites_Selected'),
    getItem('TabBar_Handoff', 'TabBar_Favorites_Selected'),
    getItem('TabBar_Setting', 'TabBar_Favorites_Selected')
]

const App: React.FC = () => {
    const [current, setCurrent] = useState(0)
    const navigateTo = useNavigate()
    const handleClick = (e: number) => {
        if (e <= 2) {
            setCurrent(e)
            navigateTo('/Chat')
            //跳转
        } else {
            // 其他操作
        }
    }
    return (
        <div
            style={{
                width: 60,
                height: 'calc(100vh - 115px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <ul className={`${style.menuTop} ${style.ul}`}>
                {items.map((item, index) => (
                    <li
                        onClick={() => handleClick(index)}
                        key={index}
                        style={{ color: current === index ? '#58be6a' : '#717171' }}
                    >
                        {item(current === index)}
                    </li>
                ))}
            </ul>
            <ul className={`${style.menuTop} ${style.ul}`}>
                {bottonItems.map((item, index) => (
                    <li onClick={() => handleClick(index)} key={index} style={{ color: '#6d6d6c' }}>
                        {item(false)}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default App
