"use client"

import React, { useState } from 'react'
import Layout from '@/Components/common/CommonLayout'
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Badge, Button, Modal, Table, TextInput } from "flowbite-react"
import { FaUserEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { MdPending } from "react-icons/md";
import { HiCheck } from 'react-icons/hi2';
import InputField from '@/Components/common/InputField';
import { Form, Formik } from 'formik';
import SelectionField from '@/Components/common/SelectionField';
import { Status } from '@/utils/data';


const Alert = () => {
    const [searchVal, setSearchVal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    return (
        <Layout header={"Alerts"}>
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput value={searchVal} onChange={e => setSearchVal(e.target.value)} placeholder="Search...." icon={FaMagnifyingGlass} className=" outline-none" />
                </div>
                <Button color="light" onClick={() => setOpenModal(true)}>Add New</Button>
            </div>
            <Modal show={openModal} size={'lg'} onClose={() => setOpenModal(false)}>
                <Modal.Header>Resolve Query</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{ solution: "" }}
                        onSubmit={(value) => console.log(value)}
                    >{(formik) => (
                        <Form>
                            <h1>the question is</h1>
                            <SelectionField name="status" label={"Change the status"} data={Status} />
                            <InputField isInput={false} name="solution" label={"Resolve Query"} placeholder="Enter the solution" />
                            <div className='flex gap-4'>
                                {
                                    isUpdate ? <Button color={'info'} type='submit'>Update Project</Button> :
                                        <>
                                            <Button color={'success'} type='submit'>Add Project</Button>
                                            <Button color={'failure'} type='reset'>Reset</Button>
                                        </>
                                }
                            </div>
                        </Form>
                    )}
                    </Formik>
                </Modal.Body>
            </Modal>

            <div className="overflow-x-auto my-2">
                {
                    <Table hoverable>
                        <Table.Head>
                            <Table.HeadCell>Srl. No.</Table.HeadCell>
                            <Table.HeadCell>Query/Questions</Table.HeadCell>
                            <Table.HeadCell className='text-nowrap'>Student Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>date</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Solution</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divnamee-y">
                            <Table.Row className="bg-white">
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>how are you ? </Table.Cell>
                                <Table.Cell className=' capitalize'>swadesh pal</Table.Cell>
                                <Table.Cell>swadesh@gamil.com</Table.Cell>
                                <Table.Cell>01/03/2024</Table.Cell>
                                <Table.Cell>
                                    <Badge color="purple" icon={MdPending}>
                                        Pending
                                    </Badge>
                                    {/* <Badge color="success" icon={HiCheck}>
                                        Resolved
                                    </Badge> */}
                                </Table.Cell>
                                <Table.Cell>
                                    <button className='px-2 py-1.5 rounded-full bg-green-200 text-green-600 text-xs text-nowrap font-semibold'>Solve Now</button></Table.Cell>
                                <Table.Cell >
                                    <div className="flex text-xl items-center">
                                        <div className=' cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full '>
                                            <FaUserEdit />
                                        </div>
                                        <div className='cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full ' >
                                            <MdDelete />
                                        </div>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                    // : <h1 className="text-center text-4xl font-semibold text-white my-20">Sorry no data found</h1>
                }
            </div>
        </Layout>
    )
}

export default Alert
