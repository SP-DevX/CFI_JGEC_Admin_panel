"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { FileInput, Label, Modal, Select, Table } from "flowbite-react";
import { eventCategories, fileToUrlLink } from "@/utils/data";
import Link from "next/link";
import Loader from "@/Components/common/Loader";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { message } from "antd";
import { useParams } from "next/navigation";

type props = {
    url: string;
    refId: string;
};

const Certificate = () => {
    const { category } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadList, setUploadList] = useState<props[]>([]);
    const [certList, setCertList] = useState<props[]>([]);
    const [isUploaded, setIsUploaded] = useState(false);

    const resetValues = () => {
        setUploadList([]);
        setOpenModal(false);
        allCertificates();
    };

    const addCertificate = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/certificate/upload/create`, {
                category,
                uploadList,
            });
            console.log(data);
            if (data.list.categoryList.length > 0) {
                setCertList(data.list.categoryList);
            }
            message.success(data.message);
            resetValues();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    const allCertificates = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/certificate/upload`, {
                category,
            });
            // console.log(data);
            setCertList(data.item);
        } catch (error: any) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const uploadMany = async (event: any) => {
        try {
            let CertificateArray = [];
            for (let i = 0; i < event.target.files.length; i++) {
                var imageFile = event.target.files[i];
                const imgUrl = await fileToUrlLink(imageFile, "Certificates");
                if (imgUrl) {
                    const certificate = {
                        url: imgUrl,
                        refId: `CFI-${Math.floor(Math.random() * 10000)}`,
                    };
                    CertificateArray.push(certificate);
                }
            }
            message.success("files uploaded successfully");
            if (CertificateArray.length > 0) {
                setUploadList(CertificateArray);
            }
            setIsUploaded(true);
        } catch (error) {
            console.log(error);
            message.success("files not uploaded");
        }
    };

    useEffect(() => {
        allCertificates();
    }, []);

    if (loading) return <Loader />;

    return (
        <Layout header={"certificate"}>
            <div
                className="button w-56 ms-auto mb-6"
                onClick={() => setOpenModal(true)}
            >
                Upload Certificates
            </div>
            <div>
                <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
                    <Modal.Header>Upload Certificates</Modal.Header>
                    <Modal.Body>
                        <div className="mb-2">
                            <div className="mb-1 block">
                                <Label
                                    htmlFor="certificate"
                                    value="Upload certificate(You can choose multiple files)"
                                />
                            </div>
                            <FileInput
                                onChange={(e) => uploadMany(e)}
                                accept=".pdf"
                                multiple
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            disabled={!isUploaded}
                            className={`button ms-0 w-52 
                            ${isUploaded ? "bg-green-500" : "bg-green-200"}`}
                            onClick={addCertificate}
                        >
                            Add Certificate
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>
            <div className="overflow-x-auto my-2 mb-12">
                {certList.length > 0 && certList ? (
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Sl. No.</Table.HeadCell>
                            <Table.HeadCell>ref No</Table.HeadCell>
                            <Table.HeadCell>certificate</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divnamee-y">
                            {certList.map((item, i) => {
                                const { url, refId } = item;
                                return (
                                    <Table.Row
                                        key={i}
                                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                                    >
                                        <Table.Cell className="whitespace-nowrap capitalize font-medium text-gray-900 dark:text-white flex items-center">
                                            {i + 1}
                                        </Table.Cell>
                                        <Table.Cell>{refId}</Table.Cell>
                                        <Table.Cell>
                                            <Link href={url} target="_blank">
                                                <h1 className="font-semibold text-blue-600 cursor-pointer">
                                                    View
                                                </h1>
                                            </Link>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <div className="flex text-xl items-center">
                                                <div className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full">
                                                    <FaUserEdit />
                                                </div>
                                                <div className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full ">
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table>
                ) : (
                    <h1 className="not_found">Sorry no data found</h1>
                )}
            </div>
        </Layout>
    );
};

export default Certificate;
