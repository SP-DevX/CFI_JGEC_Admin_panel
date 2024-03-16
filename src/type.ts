import { ObjectId } from "mongodb"
import { StaticImageData } from "next/image"
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

export interface membersType {
    name: string,
    photo?: string | URL,
    position: string,
    year: string | string[],
    dept: string,
    email: string,
    phone: string | number,
    facebook?: string | URL,
    instagram?: string | URL,
    linkedin?: string | URL,
}
export interface resMembersType extends membersType {
    _id: string | ObjectId,
    socialLinks: {
        facebook?: string | URL,
        instagram?: string | URL,
        linkedin?: string | URL,
    }
}

export interface ComponentsType {
    photo?: string | Url | StaticImageData,
    name: string,
    modelNo: string,
    qty: number | null,
}
export interface resComponentsType extends ComponentsType {
    _id: ObjectId
}
