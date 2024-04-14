"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Modal } from "flowbite-react";
import Link from "next/link";
import Loader from "@/Components/common/Loader";
import axios from "axios";
import Image from "next/image";
import Folder from "@/assets/folder.png";
import { message } from "antd";

type props = {
    _id: string;
    category: String;
    categoryList: {
        url: string;
        refId: string;
    }[];
};

const Category = () => {
    const [category, setCategory] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryList, setCategoryList] = useState<props[]>([]);

    const CreateCategory = async () => {
        try {
            setLoading(true);
            await axios.post(`/api/certificate/create`, {
                category
            });
            allCategory();
            setCategory("");
            setOpenModal(false);
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const allCategory = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/certificate`);
            console.log(data);
            setCategoryList(data.list);
        } catch (error: any) {
            console.log(error);
            message.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        allCategory();
    }, []);

    if (loading) return <Loader />;

    return (
        <Layout header={"certificate"}>
            <div
                className="button w-40 ms-auto mb-6"
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
                        <button
                            className="button ms-0 w-40 bg-green-500"
                            onClick={CreateCategory}
                        >
                            Create
                        </button>
                    </Modal.Footer>
                </Modal>
                <div className="w-full grid grid-cols-6 gap-6">
                    {categoryList.map((item, i) => (
                        <Link
                            href={`/certificate/${item.category}`}
                            key={i}
                            className="cursor-pointer"
                        >
                            <Image
                                src={Folder}
                                alt="folder"
                                className="w-full object-contain"
                            />
                            <h1 className="text-gray-600 uppercase font-medium text-center ">
                                {item.category}
                            </h1>
                        </Link>
                    ))}
                </div>
            </section>
        </Layout>
    );
};

export default Category;
