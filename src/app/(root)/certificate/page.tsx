"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Button, Modal } from "flowbite-react";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import Folder from "@/assets/folder.png";
import { MdDelete } from "react-icons/md";
import { useAsyncHandler } from "@/utils/asyncHandler";
import { useRouter } from "next/navigation";
import { deleteStorage } from "@/utils/data";

type props = {
    _id: string;
    category: String;
    categoryList: {
        url: string;
        refId: string;
    }[];
};

const Category = () => {
    const router = useRouter();
    const [category, setCategory] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [categoryList, setCategoryList] = useState<props[]>([]);

    const resetAll = () => {
        setCategory("");
        setOpenModal(false);
    };

    const CreateCategory = useAsyncHandler(async () => {
        await axios.post(`/api/certificate/create`, {
            category
        });
        resetAll();
    });

    const deleteFolder = useAsyncHandler(async (item: props) => {
        const { _id, categoryList } = item;
        await axios.post(`/api/certificate/delete`, {
            id: _id
        });
        if (categoryList.length) {
            for (let i = 0; i < categoryList.length; i++) {
                await deleteStorage(categoryList[i].url);
            }
        }
        allCategory();
        resetAll();
    })

    const allCategory = useAsyncHandler(async () => {
        const { data } = await axios.get(`/api/certificate`);
        setCategoryList(data.list);
    });

    useEffect(() => {
        allCategory();
    }, [openModal]);


    return (
        <Layout header={"certificate"}>
            <div
                className="button w-40 ms-auto mb-4"
                onClick={() => setOpenModal(true)}
            >
                Create Folder
            </div>
            <section>
                <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Create Folder</Modal.Header>
                    <Modal.Body>
                        <label htmlFor="folder">Enter the name</label>
                        <input
                            type="text"
                            placeholder="Folder name"
                            className="w-full block my-3 rounded-md uppercase outline-none border-gray-400"
                            value={category}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setCategory(e.target.value)
                            }
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            className="button ms-0 w-40 bg-green-500"
                            onClick={CreateCategory}
                            disabled={category === ""}
                        >
                            Create
                        </Button>
                    </Modal.Footer>
                </Modal>
                {
                    categoryList.length > 0 ?
                        <div className="w-full grid grid-cols-6 gap-6">
                            {categoryList.map((item, i) => (
                                <div
                                    key={i}
                                    className="relative "
                                >
                                    <Image
                                        src={Folder}
                                        alt="folder"
                                        className="w-full object-contain cursor-pointer"
                                        onClick={() => router.push(`/certificate/${item.category}`)}
                                    />
                                    <div className="flex items-center justify-between gap-x-3 px-2 py-3">
                                        <Link href={`/certificate/${item.category}`}>
                                            <h1 className="text-blue-600 uppercase font-medium text-center text-sm ">
                                                {item.category}
                                            </h1>
                                        </Link>
                                        <button className="text-red-500 text-lg" onClick={() => deleteFolder(item)}>
                                            <MdDelete />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div> :
                        <h1 className="not_found">Sorry no data found</h1>
                }
            </section>
        </Layout>
    );
};

export default Category;
