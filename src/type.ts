import { ObjectId } from "mongodb"
import { StaticImageData } from "next/image"
import { Url } from "url"

export type props = {
    openModal: boolean,
    closeModal: CallableFunction
}
 
export interface NoticeType {
    title: string,
    description: string,
    date: any,
    link: string,
    _id?: string | ObjectId,
}
export interface photoUrlType {
    photo?: string | StaticImageData
}

export interface EventsItemsType {
    shortName: string,
    fullName: string,
    description: string,
    date: string,
    type: string,
    organizer: string,
    _id?: string | ObjectId,
    photo?: string 
}



export interface ComponentsType {
    photo?: string | StaticImageData,
    name: string,
    modelNo: string,
    qty: number | null,
}
export interface resComponentsType extends ComponentsType {
    _id: ObjectId
}

export interface RegisterUserType {
    _id: string;
    name: string;
    email: string;
    password: string;
    photo: string;
    isVerify: boolean;
    isAdmin: boolean;
    forgotPasswordToken: string;
    forgotPasswordTokenExpiry: Date,
    verifyToken: string;
    verifyTokenExpiry: Date,
    isOnline: boolean,
}