import { Button, Input } from 'tdesign-react'
import { useState } from 'react'
import { PlusOutlined } from '@ant-design/icons'
import SvgIcon from '@renderer/assets/SvgIcon'
import style from './index.module.less'

const App: React.FC = () => {
    const [value, setValue] = useState<string>()

    return (
        <div className={`${style.search} logo`}>
            <Input
                placeholder="搜索"
                value={value}
                clearable
                style={{}}
                size="small"
                prefixIcon={
                    <SvgIcon
                        name="icon_search"
                        size="15px"
                        style={{ color: '#b1b1b1', width: 17, height: 17 }}
                    />
                }
                onChange={(value) => {
                    setValue(value)
                }}
                onClear={() => {
                    console.log('onClear')
                }}
            />
            <Button
                theme="default"
                size="small"
                shape="square"
                style={{ marginLeft: 10, width: 27, backgroundColor: '#e8e8e8' }}
            >
                <PlusOutlined />
            </Button>
        </div>
    )
}

export default App
