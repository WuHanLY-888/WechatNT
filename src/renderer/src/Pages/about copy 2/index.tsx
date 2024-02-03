import { svgList } from '@renderer/assets/fileList'
import SvgIcon from '@renderer/assets/SvgIcon'
import { message, Tooltip } from 'antd'


const View = () => {
    const dbclick = async (name: string) => {
        try {
            // 使用 navigator.clipboard.writeText() 复制文本
            await navigator.clipboard.writeText(name);
            message.success('复制成功！')
        } catch (err) {
            console.error('Unable to copy', err);
        }
    }
    return (<div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {
            svgList.map((item: string) =>
                <Tooltip title={item} key={item}>
                    <div onDoubleClick={() => dbclick(item)}>
                        <SvgIcon color="red" style={{
                            fontSize: 30,
                            height: 30,
                            width: 30,
                        }} name={item} key={item} />
                    </div>
                </Tooltip>
            )
        }
    </div>)
}
export default View
