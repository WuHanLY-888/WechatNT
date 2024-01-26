import { useEffect, useRef, useState } from 'react'
import { Input, Space, Button, message, Card, Form, Checkbox } from 'antd'
import styles from './login.module.less'
import QRCodeLogin from './QRCodeLogin'
import { getCaptchaData } from '@renderer/request'
import { svgToDataurl } from '@renderer/utils/dataTr'

type FieldType = {
    username: string
    password: string
    captcha: string
    remember: boolean
}

const View = (): JSX.Element => {
    useEffect(() => {
        getCaptchaImg()
    }, [])
    // 获取用户输入的信息
    const initialValues: FieldType = {
        username: '',
        password: '',
        captcha: '',
        remember: false
    }

    // 定义一个变量保存验证码图片信息
    const svgRef = useRef<HTMLDivElement>(null)
    const [captchaImg, setCaptchaImg] = useState('')
    const [captchaText, setCaptchaText] = useState('')
    // 点击登录按钮的事件函数
    const gotoLogin = async ({ captcha, username, password }: FieldType) => {
        console.log({ captcha, captchaText })

        if (captcha?.toLowerCase() != captchaText.toLowerCase()) {
            message.warning('验证码输入错误！')
            getCaptchaImg()
            return
        }

        // 验证是否有空值
        if (!username.trim() || !password.trim() || !captcha.trim()) {
            message.warning('请完整输入信息！')
            return
        }

        if (username === 'admin' && password === 'admin') {
            console.log('密码输入正确')
            window.ipc.invoke('user-login')
        } else {
            message.warning('账号或密码输入错误！')
        }
    }

    async function getCaptchaImg() {
        const res = await getCaptchaData()
        // svgRef.current!.innerHTML = res.data;
        setCaptchaImg(svgToDataurl(res.data))
        if (import.meta.env.MODE === 'development') {
            console.log(res)

            setCaptchaText(res.text)
            form.setFieldsValue({
                username: 'admin',
                password: 'admin',
                captcha: res.text
            })
        }
    }
    const [form] = Form.useForm<FieldType>()
    const onFinish = (values: FieldType) => {
        console.log('Success:', values)
        gotoLogin(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    return (
        <div className={styles.loginPage}>
            {/* 登录盒子 */}
            <div className={styles.loginbox}>
                {/* 标题部分 */}
                <div className={styles.title}>
                    <h1>react&nbsp;·&nbsp;通用后台系统</h1>
                </div>
                {/* 表单部分 */}
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 20 }}
                    style={{ maxWidth: 600 }}
                    initialValues={initialValues}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="用户名"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item<FieldType>
                        label="验证码"
                        name="captcha"
                        rules={[{ required: true, message: '请输入验证码!' }]}
                        style={{ display: 'flex', alignContent: 'center' }}
                    >
                        <Space size="large" style={{ display: 'flex', alignContent: 'center' }}>
                            <Input />
                            <div ref={svgRef} className={styles.captchaImg} onClick={getCaptchaImg}>
                                <img width="90" height="32" src={captchaImg} alt="" />
                            </div>
                        </Space>
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="remember"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>记住密码</Checkbox>
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const loginBox: React.FC = () => {
    const contentList: Record<string, React.ReactNode> = {
        tab1: <View />,
        tab2: <QRCodeLogin></QRCodeLogin>
    }
    const [activeTabKey, setActiveTabKey] = useState<string>('tab1')
    const tabList = [
        {
            key: 'tab1',
            tab: '账号密码登陆'
        },
        {
            key: 'tab2',
            tab: '二维码登陆'
        }
    ]

    const onTabChange = (e) => {
        setActiveTabKey(e)
    }
    return (
        <div>
            <div className={styles.top}></div>
            <Card
                style={{ width: '80%', margin: '0 auto' }}
                // title="登 陆"
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={onTabChange}
            >
                {contentList[activeTabKey]}
            </Card>
        </div>
    )
}

export default loginBox
