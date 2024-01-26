import axios from './axios'
import { WebServerKey } from '@renderer/keys/appKeys'
import { countAtom, AmapResponse, AmapIpPlaceResponse } from '@renderer/store'
import { useAtom } from 'jotai'

export const useAmapIpPlace = (): AmapResponse => {
    const [response, setResponse] = useAtom(countAtom)
    const getData = async () => {
        const res = await axios.get<AmapIpPlaceResponse>('https://restapi.amap.com/v3/ip', {
            params: {
                key: WebServerKey
            }
        })
        setResponse(res)
    }
    if (!response) {
        getData()
    }
    return response
}

interface captchaType {
    text: string
    data: string
}
export const getCaptchaData = async (): Promise<captchaType> => {
    const timestamp = Date.now()
    const res = await axios.get(`/user/captcha?t=${timestamp}`)

    return res.data as captchaType
}
