"use client";

import Layout from "@/Components/common/CommonLayout";
import ImageCropUpload from "@/Components/common/CroppedImage";
import Loader from "@/Components/common/Loader";
import { deleteStorage } from "@/utils/data";
import axios from "axios";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import Image from "next/image";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Gallery = () => {
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [photo, setPhoto] = useState("");
    const [photos, setPhotos] = useState<galleryType[]>([])
    const [details, setDetails] = useState({
        title: "",
        date: new Date().toLocaleDateString(),
        photo: "",
    });

    const resetAll = () => {
        setOpenModal(false);
        setPhoto("");
        setDetails({
            title: "",
            date: new Date().toLocaleDateString(),
            photo: "",
        });
    }

    const handelUpload = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            details.photo = photo;
            const { data } = await axios.post(`/api/gallery/upload`, details);
            console.log(data);
            toast.success(data.message);
            getPhotos();
            resetAll();
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const deletePhoto = async (value: galleryType) => {
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/gallery/delete`, value);
            // console.log(data);
            toast.success(data.message);
            await deleteStorage(value.photo);
            getPhotos();
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const getPhotos = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/gallery/`);
            // console.log(data.photos);
            setPhotos(data.photos);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getPhotos()
    }, [])

    return (
        <>
            <Layout header="Gallery">
                <div className="button ms-auto" onClick={() => setOpenModal(true)}>
                    Add Photo
                </div>
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        <Modal
                            show={openModal}
                            size="md"
                            popup
                            onClose={() => setOpenModal(false)}
                        >
                            <Modal.Header className="border-b">
                                <p className="ms-4 pt-2 ">Add New Notice</p>
                            </Modal.Header>
                            <Modal.Body className="py-3 pb-6">
                                <form onSubmit={handelUpload}>
                                    <div className="w-full mb-2">
                                        <div className="mb-1 block">
                                            <Label htmlFor="name" value="Image title" />
                                        </div>
                                        <TextInput
                                            type="text"
                                            name="title"
                                            placeholder="Image title"
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setDetails({ ...details, title: e.target.value })
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="w-full mb-2">
                                        <div className="mb-1 block">
                                            <Label htmlFor="name" value="Upload Photo" />
                                        </div>
                                        <ImageCropUpload
                                            aspect={4 / 3}
                                            onUploadComplete={(url: string) => setPhoto(url)}
                                            fileType="Gallery"
                                        />
                                    </div>
                                    {photo && <Image src={photo} width={100} height={80} alt="gallery" className="w-32 h-24 aspect-[4/3]" />}
                                    <Button
                                        disabled={photo === ""}
                                        className="button bg-green-500 mt-4 w-44"
                                        type="submit"
                                    >
                                        Upload Photo
                                    </Button>
                                </form>
                            </Modal.Body>
                        </Modal>
                        {
                            photos.length > 0 ?
                                <div className="grid grid-cols-3 gap-8">
                                    {photos.map(item => (
                                        <div className="bg-white rounded-md overflow-hidden" key={item._id}>
                                            <Image src={item.photo} width={100} height={100} alt="photo" className="w-full h-auto object-contain" />
                                            <div className="p-4">
                                                <h1>{item.title}</h1>
                                                <div className="flex justify-between">
                                                    <p>date: {item.date}</p>
                                                    <button className="text-red-500 text-lg" onClick={() => deletePhoto(item)}>
                                                        <MdDelete />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                </div> :
                                <h1 className="not_found">Sorry, No data found</h1>
                        }

                    </>
                )}

            </Layout>
        </>
    );
};

export default Gallery;
