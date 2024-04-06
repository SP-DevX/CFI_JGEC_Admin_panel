"use client"

import React, { useState } from 'react'
import Layout from '@/Components/common/CommonLayout'
import { Button, FileInput, Label, Modal, Select, Table, TextInput } from "flowbite-react"
import { Form, Formik } from 'formik';
import * as Yup from "yup";
import InputField from '@/Components/common/InputField';
import { eventCategories, fileToUrlLink } from '@/utils/data';
import Link from 'next/link';
import Loader from '@/Components/common/Loader';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Certificate = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [certDetails, setCertDetails] = useState({
        category: "",
        name: "",
        refNo: Math.floor(Math.random() * 1000000),
        fileUrl: "",
    });
    const [certList, setCertList] = useState([
        {
            category:
                "ICICI-2023",
            fileUrl:
                "https://firebasestorage.googleapis.com/v0/b/cfi-jgec.appspot.com/o/certificate%2FICICI-2023%2F459c8d12-31f3-4844-a60f-c64197556f21Self%20Declaration.pdf?alt=media&token=2c10a016-38a2-4dd4-b4d9-253f0b03819d",
            name:
                "GERONIMO",
            refNo:
                916421
        }
    ])

    const uploadPhoto = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
            setLoading(true);
            const fileUrl = await fileToUrlLink(file, `certificate/${certDetails.category}`);
            if (fileUrl) setCertDetails({ ...certDetails, fileUrl })
            setLoading(false);
        }
    }

    const onChangeValues = (e:any) => {
        const { name, value } = e.target;
        setCertDetails({ ...certDetails, [name]: value });
    }

    const resetValues = () => {
        setCertDetails({ category: "", refNo: Math.floor(Math.random() * 1000000), name: "", fileUrl: "" });
    };

    const addCertificate = () => {
        console.log(certDetails);
        resetValues();
    }

    return (
        <Layout header={'certificate'}>
            {loading ?
                <Loader /> :
                <>
                    <div className='button w-40 ms-auto mb-6' onClick={() => setOpenModal(true)}>New Certificates</div>
                    <div>
                        <Modal show={openModal} size={'sm'} onClose={() => setOpenModal(false)}>
                            <Modal.Header>New Certificates</Modal.Header>
                            <Modal.Body>
                                <div className='mb-2'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="name" value="Choose category" />
                                    </div>
                                    <Select name='category' value={certDetails.category} onChange={onChangeValues}>
                                        {
                                            eventCategories.map(item => (
                                                <option className='my-2' value={item} key={item}>{item}</option>
                                            ))
                                        }
                                    </Select>
                                </div>
                                <div className='mb-2'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="name" value="Student name" />
                                    </div>
                                    <TextInput name='name' placeholder='Student name' value={certDetails.name} onChange={onChangeValues} />
                                </div>
                                <div className='mb-2'>
                                    <div className="mb-1 block">
                                        <Label htmlFor="certificate" value="Upload certificate" />
                                    </div>
                                    <FileInput onChange={e => uploadPhoto(e)} />
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button color='success' onClick={addCertificate}>Add Certificate</Button>
                                <Button color='failure' onClick={resetValues}>Reset</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>
                    <div className='block w-full'>
                        <div className="overflow-x-auto my-2">
                            {
                                certList.length > 0 && certList ?
                                    <Table hoverable>
                                        <Table.Head>
                                            <Table.HeadCell>Sl. No.</Table.HeadCell>
                                            <Table.HeadCell>Student Name</Table.HeadCell>
                                            <Table.HeadCell>ref No</Table.HeadCell>
                                            <Table.HeadCell>certificate</Table.HeadCell>
                                            <Table.HeadCell>Actions</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body className="divnamee-y">
                                            {
                                                certList.map((item, i) => {
                                                    const { name, refNo, category, fileUrl } = item;
                                                    return (
                                                        <Table.Row key={i} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                                            <Table.Cell className="whitespace-nowrap capitalize font-medium text-gray-900 dark:text-white flex items-center">
                                                                {i + 1}
                                                            </Table.Cell>
                                                            <Table.Cell>{name}</Table.Cell>
                                                            <Table.Cell>{refNo}</Table.Cell>
                                                            <Table.Cell>
                                                                <Link href={fileUrl} target='_blank'>
                                                                    <h1 className='font-semibold text-blue-600 cursor-pointer' >View</h1>
                                                                </Link>
                                                            </Table.Cell>
                                                            <Table.Cell >
                                                                <div className="flex text-xl items-center">
                                                                    <div className=' cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full ' >
                                                                        <FaUserEdit />
                                                                    </div>
                                                                    <div className='cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full ' >
                                                                        <MdDelete />
                                                                    </div>
                                                                </div>
                                                            </Table.Cell>
                                                        </Table.Row>
                                                    )
                                                }
                                                )
                                            }
                                        </Table.Body>
                                    </Table>
                                    : <h1 className="text-center text-4xl font-semibold text-white my-20">Sorry no data found</h1>
                            }
                        </div>
                    </div>
                </>
            }
        </Layout>
    )
}

export default Certificate
