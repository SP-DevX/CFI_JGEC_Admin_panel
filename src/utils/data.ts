import * as firebase from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase";
import { v4 } from "uuid";
import { message } from "antd";


export const positions: string[] = ['---Select---', 'Secretory', 'Web Lead', 'Technical Head']
export const years: (string | number)[] = ['---Select---', 2020, 2021, 2022, 2023, 2024]
export const departments: string[] = ['---Select---', 'CSE', 'IT', 'ECE', 'EE', 'ME', 'CE']
export const socialIcons: string[] = ['---Select---', 'facebook', 'instagram', 'linkedin', 'twitter']
export const eventCategories: string[] = ['---Select---', 'ICICI-2023', "SRISTI"]
export const Status: string[] = ["---Select---", "resolved", "pending"]

export const fileToUrlLink = async (file: File, fileType: string) => {
    if (file) {
        const fileRef = ref(storage, `${fileType}/${v4() + file.name}`);
        const res = await uploadBytes(fileRef, file);
        const fileUrl = await getDownloadURL(res.ref);
        return fileUrl;
    }
    else console.log('Invalid file');
}

export const deleteStorage = async (fileUrl: string) => {
    try {
        const fileRef = ref(storage, fileUrl);
        await deleteObject(fileRef);
        message.success('File removed from storage');
    } catch (error) {
        console.error('Error deleting file:', error);
        message.error('File not removed from storage');
    }
}
