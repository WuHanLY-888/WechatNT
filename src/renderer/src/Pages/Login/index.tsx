import styles from './login.module.less'
import QRCodeLogin from './QRCodeLogin'

const loginBox: React.FC = () => {
    return (
        <div className={styles.loginPage}>
            <QRCodeLogin></QRCodeLogin>
        </div>
    )
}

export default loginBox
