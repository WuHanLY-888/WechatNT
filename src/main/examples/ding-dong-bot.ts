import { WechatyBuilder, ScanStatus, Message, Contact } from '../src/mods/mod.js'

import qrTerm from 'qrcode-terminal'
import { FileBox } from 'file-box'

const options = {
    name: 'ding-dong-bot'
}

const bot = WechatyBuilder.build(options)

bot.on('logout', onLogout)
    .on('login', onLogin)
    .on('scan', onScan)
    .on('error', onError)
    .on('message', onMessage)

    .start()
    .catch(async (e) => {
        console.error('Bot start() fail:', e)
        await bot.stop()
        process.exit(-1)
    })

function onScan(qrcode: string, status: ScanStatus) {
    if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
        qrTerm.generate(qrcode)

        const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join(
            ''
        )

        console.info('onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl)
    } else {
        console.info('onScan: %s(%s)', ScanStatus[status], status)
    }
}

function onLogin(user: Contact) {
    console.info(`${user.name()} login`)
}

function onLogout(user: Contact) {
    console.info(`${user.name()} logged out`)
}

function onError(e: Error) {
    console.error('Bot error:', e)
}

async function onMessage(msg: Message) {
    console.info(msg.toString())

    if (msg.self()) {
        console.info('Message discarded because its outgoing')
        return
    }

    if (msg.age() > 2 * 60) {
        console.info('Message discarded because its TOO OLD(than 2 minutes)')
        return
    }

    if (msg.type() !== bot.Message.Type.Text || !/^(ding|ping|bing|code)$/i.test(msg.text())) {
        console.info('Message discarded because it does not match ding/ping/bing/code')
        return
    }

    /**
     * 1. reply 'dong'
     */
    await msg.say('dong')
    console.info('REPLY: dong')

    /**
     * 2. reply image(qrcode image)
     */
    const fileBox = FileBox.fromUrl('https://wechaty.github.io/wechaty/images/bot-qr-code.png')

    await msg.say(fileBox)
    console.info('REPLY: %s', fileBox.toString())

    /**
     * 3. reply 'scan now!'
     */
    await msg.say(
        [
            'Join Wechaty Developers Community\n\n',
            'Scan now, because other Wechaty developers want to talk with you too!\n\n',
            '(secret code: wechaty)'
        ].join('')
    )
}
