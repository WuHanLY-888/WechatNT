import { Button } from 'antd'

// type RootState = ReturnType<typeof store.getState>;

const App = () => {
    const userLogout = () => {
        console.log('hello')
        window.ipc.invoke('user-logout')
    }

    return (
        <div>
            <Button type="primary" onClick={userLogout}>
                退出登录
            </Button>
        </div>
    )
}

export default App
