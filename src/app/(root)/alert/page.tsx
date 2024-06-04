"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
    Badge,
    Label,
    Modal,
    Table,
    Textarea,
    TextInput,
} from "flowbite-react";
import { MdCall, MdDelete, MdEmail } from "react-icons/md";
import { MdPending } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { HiCheck } from "react-icons/hi2";
import Loader from "@/Components/common/Loader";

const Alert = () => {
    const [searchVal, setSearchVal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [contactList, setContactList] = useState<contactResType[]>([]);
    const [answerQuery, setAnswerQuery] = useState({
        _id: "",
        question: "",
        solution: "",
    });

    const getContactRes = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/contact/get-response`);
            console.log(data);
            setContactList(data.allRes);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };
    const solvedQuery = (value: contactResType) => {
        setOpenModal(true);
        setAnswerQuery({
            _id: value._id,
            question: value.message,
            solution: value.solution,
        });
    };

    const handelSaveRes = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log(answerQuery);
            const { data } = await axios.post(`/api/contact/resolve`, answerQuery);
            console.log(data);
            getContactRes();
            toast.success("Query solution saved successfully");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteQuery = async (_id: string) => {
        setLoading(true);
        try {
            await axios.post(`/api/contact/delete`, { _id });
            toast.success("Query deleted successfully");
            getContactRes();
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactRes();
    }, []);

    if (loading) return <Loader />;
    return (
        <Layout header={"Alerts"}>
            {contactList.length > 0 ? (
                <>
                    <div className="mb-4 mt-2 flex justify-between items-center">
                        <div className="w-[20rem]">
                            <TextInput
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder="Search...."
                                icon={FaMagnifyingGlass}
                                className=" outline-none"
                            />
                        </div>
                    </div>
                    <Modal show={openModal} size={"lg"} onClose={() => setOpenModal(false)}>
                        <Modal.Header>Resolve Query</Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handelSaveRes}>
                                <p>Query:-</p>
                                <h1 className="text-base font-medium mb-2">
                                    {answerQuery.question}
                                </h1>
                                <Label htmlFor="query">Resolve the query</Label>
                                <Textarea
                                    rows={3}
                                    name="solution"
                                    placeholder="Enter the solution"
                                    className="w-full rounded-md"
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                        setAnswerQuery({ ...answerQuery, solution: e.target.value })
                                    }
                                    required
                                />
                                <button type="submit" className="button w-36 bg-green-500 mt-4">
                                    Update Query
                                </button>
                            </form>
                        </Modal.Body>
                    </Modal>


                    <div className="overflow-x-auto my-2">
                        {
                            <Table hoverable>
                                <Table.Head>
                                    <Table.HeadCell>Srl. No.</Table.HeadCell>
                                    <Table.HeadCell>Query</Table.HeadCell>
                                    <Table.HeadCell className="text-nowrap">
                                        Student Name
                                    </Table.HeadCell>
                                    <Table.HeadCell>Email & Mobile No.</Table.HeadCell>
                                    <Table.HeadCell>date</Table.HeadCell>
                                    <Table.HeadCell>Status</Table.HeadCell>
                                    <Table.HeadCell>Solution</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {contactList
                                        .filter((ele) =>
                                            ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                        )
                                        .map((item, i) => {
                                            const { name, mobile, email, status, message, date } =
                                                item;
                                            return (
                                                <Table.Row className="bg-white" key={i}>
                                                    <Table.Cell>{i + 1}</Table.Cell>
                                                    <Table.Cell>{message}</Table.Cell>
                                                    <Table.Cell className=" capitalize">
                                                        {name}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex items-center gap-x-3 mb-1">
                                                            <MdEmail />
                                                            {email}
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <MdCall />
                                                            {mobile}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {new Date(date).toLocaleDateString()}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        {!status ? (
                                                            <Badge color="purple" icon={MdPending}>
                                                                Pending
                                                            </Badge>
                                                        ) : (
                                                            <Badge color="success" icon={HiCheck}>
                                                                Resolved
                                                            </Badge>
                                                        )}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <button
                                                            onClick={() => solvedQuery(item)}
                                                            className="px-2 py-1.5 rounded-full bg-green-200 text-green-600 text-xs text-nowrap font-semibold "
                                                        >
                                                            Solve Now
                                                        </button>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex text-xl items-center">
                                                            {/* <div className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full ">
                                                            <FaUserEdit />
                                                        </div> */}
                                                            <div
                                                                onClick={() => deleteQuery(item._id)}
                                                                className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                            >
                                                                <MdDelete />
                                                            </div>
                                                        </div>
                                                    </Table.Cell>
                                                </Table.Row>
                                            );
                                        })}
                                </Table.Body>
                            </Table>
                        }
                    </div>
                </>
            ) : (
                <h1 className="not_found">Sorry, No response Present!</h1>
            )}
        </Layout>
    );
};

export default Alert;
