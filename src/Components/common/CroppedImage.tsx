"use client";

import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getCroppedImg } from "@/utils/CroppedImage";
import { storage } from "@/firebase";
import { FileInput } from "flowbite-react";
import toast from "react-hot-toast";
import Loader from "./Loader";

interface CroppedArea {
    x: number;
    y: number;
    width: number;
    height: number;
}
type props = {
    onUploadComplete: (url: string) => void;
    aspect: number;
    fileType: string;
}

const ImageCropUpload: React.FC<props> = ({
    onUploadComplete,
    aspect,
    fileType
}) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedArea | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const onCropComplete = useCallback(
        (croppedArea: any, croppedAreaPixels: CroppedArea) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        []
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
            };
        }
    };

    const handleUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setLoading(true);
        try {
            // @ts-ignore
            setImageSrc(() => (fileRef.current.value = null))
            const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
            const blob = await fetch(croppedImg).then((res) => res.blob());
            const storageRef = ref(storage, `${fileType}/${Date.now()}`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            toast.success("photo uploaded successfully")
            onUploadComplete(downloadURL);
        } catch (e: any) {
            console.error(e);
            toast.error(e.message)
        } finally {
            setLoading(false);
        }
    };
    if (loading) return <Loader />
    return (
        <div className="mt-1">
            <FileInput ref={fileRef} accept="image/*" onChange={handleFileChange} className="w-full" />
            {imageSrc && (
                <div className="w-full h-screen fixed top-0 left-0 bg-black/30  flex items-center justify-center z-[999]">
                    <div className="w-full max-w-xl h-[400px] bg-white z-[9999]">
                        <div className="w-full h-full relative">
                            <Cropper
                                image={imageSrc}
                                crop={crop}
                                zoom={zoom}
                                aspect={aspect}
                                onCropChange={setCrop}
                                onZoomChange={setZoom}
                                onCropComplete={onCropComplete}
                            />
                        </div>
                        <div className="flex items-center justify-center  gap-x-4">
                            <button onClick={handleUpload} className="button ms-0 mt-4">
                                Upload
                            </button>
                            <button
                                onClick={() =>
                                    // @ts-ignore
                                    setImageSrc(() => (fileRef.current.value = null))
                                }
                                className="button  ms-0 bg-red-500 mx-auto mt-4"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageCropUpload;
