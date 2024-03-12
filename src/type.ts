import { ObjectId } from "mongoose"
import { Url } from "url"

export type props = {
    openModal: boolean,
    closeModal: CallableFunction
}
export interface UserType {
    username?: string,
    email: string,
    password: string
}
export interface NoticeType {
    title: string,
    description: string,
    date: any,
    link: string,
    _id?: string | ObjectId,
}
export interface photoUrlType {
    photo?: string | Url
}

export interface EventsItemsType {
    shortName: string,
    fullName: string,
    description: string,
    date: string,
    type: string,
    organizer: string,
    _id?: string | ObjectId,
    photo?: string | Url
}
