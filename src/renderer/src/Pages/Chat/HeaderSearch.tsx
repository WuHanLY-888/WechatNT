import { Button, Input } from 'tdesign-react'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SvgIcon from '@renderer/assets/SvgIcon'
import style from './index.module.less'
import { useAtom } from 'jotai'
import { menuConfig } from '@renderer/store'

const App: React.FC = () => {
    const [value, setValue] = useState<string>()
    const [menuconfig, setMenuconfig] = useAtom(menuConfig)

    return (
        <div className={`${style.search} logo`}>
            <Input
                placeholder={menuconfig.isCollapsed ? '' : '搜索'}
                value={value}
                clearable
                size="small"
                style={{
                    width: menuconfig.isCollapsed ? 48 : '100%'
                }}
                prefixIcon={
                    <SvgIcon
                        name="icon_search"
                        size="15px"
                        style={{ color: '#b1b1b1', width: 17, height: 17 }}
                    />
                }
                onFocus={() => {
                    setMenuconfig({ ...menuconfig, isCollapsed: false })
                }}
                onChange={(value) => {
                    setValue(value)
                }}
                onClear={() => {
                    console.log('onClear')
                }}
            />
            {menuconfig.isCollapsed || <Button
                theme="default"
                size="small"
                shape="square"
                style={{ marginLeft: 10, width: 27, }}
            >
                <PlusOutlined />
            </Button>}
        </div>
    )
}

export default App
