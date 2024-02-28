import { AxiosResponse } from 'axios'
import { atom } from 'jotai'
export interface AmapIpPlaceResponse {
    adcode: string
    city: string
    info: string
    infocode: string
    province: string
    rectangle: string
    status: string
}

export type AmapResponse = AxiosResponse<AmapIpPlaceResponse> | null
export const countAtom = atom<AmapResponse>(null)

export const avatar = atom<string>('')

export const menuConfig = atom({
    isCollapsed: false
})
