import { Message } from '../src/mods/users'

import { FileBox } from 'file-box'
import { WechatyInterface } from '../src/wechaty/wechaty-impl'
// import { MessageType } from "wechaty-puppet/dist/esm/src/schemas/message"

class MsgManager {
    static instance: MsgManager
    // static bot: WechatyInterface
    private constructor() {}
    static init(): MsgManager {
        if (!this.instance) {
            this.instance = new MsgManager()
        }
        return this.instance
    }
    /**
     * onMessage
     */
    public async onMessage(msg: Message, bot: WechatyInterface) {
        console.info(msg.toString())

        if (msg.self()) {
            console.info('Message discarded because its outgoing')
            return
        }

        if (msg.age() > 2 * 60) {
            console.info('Message discarded because its TOO OLD(than 2 minutes)')
            return
        }
        // const msgtypes = MessageType
        // console.log(bot.Message.Type, msgtypes);
        // console.log(bot.Message.Type === msgtypes);

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
}

export default MsgManager.init()
