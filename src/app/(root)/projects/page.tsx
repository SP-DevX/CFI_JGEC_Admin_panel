"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import {
    Badge,
    Button,
    FileInput,
    Label,
    Modal,
    Table,
    TextInput,
} from "flowbite-react";
import { Form, Formik } from "formik";
import InputField from "@/Components/common/InputField";
import { fileToUrlLink } from "@/utils/data";
import * as Yup from "yup";
import axios from "axios";
import Loader from "@/Components/common/Loader";
import Link from "next/link";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete, MdPending } from "react-icons/md";
import { toast } from "react-hot-toast";
import { StaticImageData } from "next/image";

const Project = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [photo, setPhoto] = useState<string | StaticImageData>();

    const [projectValues, setProjectValues] = useState({
        projectId: `CFI-${Math.floor(Math.random() * 10000)}`,
        title: "",
        overview: "",
        name: "",
        year: "",
        demo: "",
        details: "",
        code: "",
    });
    const [projectList, setProjectList] = useState([]);
    const [searchVal, setSearchVal] = useState("");

    const closedModel = () => {
        setOpenModal(false);
        setIsUpdate(false);
        resetValues();
    };
    const uploadPhoto = async (e: any) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgUrl = await fileToUrlLink(imgFile, "Alumni");
            if (imgUrl) {
                setPhoto(imgUrl);
                alert("file uploaded");
            }
        }
    };
    const openUpdate = async (values: any) => {
        const {
            projectId,
            title,
            overview,
            name,
            year,
            demo,
            details,
            code,
            photo,
        } = values;
        setProjectValues({
            projectId,
            title,
            overview,
            name,
            year,
            demo,
            details,
            code,
        });
        setPhoto(photo);
        setOpenModal(true);
        setIsUpdate(true);
    };
    const resetValues = () => {
        setProjectValues({
            projectId: "",
            title: "",
            overview: "",
            name: "",
            year: "",
            demo: "",
            details: "",
            code: "",
        });
    };
    const validate = Yup.object({
        title: Yup.string().required("title is required"),
        overview: Yup.string().required("Overview is required"),
        name: Yup.string()
            .max(50, "name is at max 50 characters")
            .required("name is required"),
        year: Yup.string().required("year and dept. is required"),
        details: Yup.string()
            .min(100, "Please write at least 100 characters")
            .required("year and dept. is required"),
        code: Yup.string().required("code is required"),
    });

    const allProjects = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/project");
            setProjectList(data.projects);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const addProject = async (values: any) => {
        try {
            setLoading(true);
            values.photo = photo;
            const { data } = await axios.post("/api/project/add", values);
            toast.success(data.message);
            allProjects();
            setOpenModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const updateProject = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/project/update", values);
            toast.success(data.message);
            allProjects();
            setOpenModal(false);
            setIsUpdate(false);
            resetValues();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteProject = async (values: any) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/api/project/remove", values);
            toast.success(data.message);
            allProjects();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     allProjects();
    // }, []);

    return (
        <Layout header={"projects"}>
            <div className="mb-4 mt-2 flex justify-between items-center">
                <div className="w-[20rem]">
                    <TextInput
                        value={searchVal}
                        onChange={(e) => setSearchVal(e.target.value)}
                        placeholder="Search project Id, title, name"
                        icon={FaMagnifyingGlass}
                        className=" outline-none"
                    />
                </div>
                {/* <div className="button" onClick={() => setOpenModal(true)}>
                    Add Project
                </div> */}
            </div>
            <Modal show={openModal} size={"lg"} popup onClose={closedModel}>
                <Modal.Header className="ps-6">Add New Project</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={projectValues}
                        validationSchema={validate}
                        onSubmit={(values) =>
                            isUpdate ? updateProject(values) : addProject(values)
                        }
                    >
                        {(formik) => (
                            <Form>
                                <InputField
                                    name="title"
                                    label={"Project title"}
                                    placeholder="Project title"
                                />
                                <InputField
                                    isInput={false}
                                    name="overview"
                                    label={"Short details"}
                                    placeholder="Short details"
                                />
                                <InputField
                                    name="name"
                                    label={"Student name"}
                                    placeholder="Student name"
                                />
                                <InputField
                                    name="year"
                                    label={"Year & Dept."}
                                    placeholder="EX- 2nd year IT dept."
                                />
                                <InputField
                                    name="demo"
                                    label={"Project demo link"}
                                    placeholder="Enter demo link if any"
                                />
                                <InputField
                                    isInput={false}
                                    name="details"
                                    label={"Describe your project"}
                                    placeholder="Describe your project(200 - 300 words)"
                                />
                                <InputField
                                    isInput={false}
                                    name="code"
                                    label={"Code"}
                                    placeholder="Paste your code"
                                />
                                <div className="my-2">
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor="project photo"
                                            value={"Upload Project's photo"}
                                        />
                                    </div>
                                    <FileInput onChange={(e) => uploadPhoto(e)} />
                                </div>
                                <div className="flex gap-4">
                                    {isUpdate ? (
                                        <Button color={"info"} type="submit">
                                            Update Project
                                        </Button>
                                    ) : (
                                        <>
                                            <Button color={"success"} type="submit">
                                                Add Project
                                            </Button>
                                            <Button color={"failure"} type="reset">
                                                Reset
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
            <div className="overflow-x-auto my-2 shadow-md rounded-lg border">
                <Table hoverable  >
                    <Table.Head>
                        <Table.HeadCell>ProjectId</Table.HeadCell>
                        <Table.HeadCell>Project Name</Table.HeadCell>
                        <Table.HeadCell>Student Name</Table.HeadCell>
                        <Table.HeadCell>Year & Dept.</Table.HeadCell>
                        <Table.HeadCell>Approval</Table.HeadCell>
                        <Table.HeadCell>Acceptance</Table.HeadCell>
                        <Table.HeadCell>Action</Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divnamee-y">
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                            <Table.Cell>{"projectId"}</Table.Cell>
                            <Table.Cell>{"title"}</Table.Cell>
                            <Table.Cell>{"name"}</Table.Cell>
                            <Table.Cell>{"year"}</Table.Cell>
                            <Table.Cell>
                                <Badge color={'indigo'} className=" rounded-full" icon={MdPending} >Pending</Badge>
                            </Table.Cell>
                            <Table.Cell>
                                <button className="px-4 py-2 rounded-full bg-green-500 text-xs font-medium text-white">
                                    Approve Now
                                </button>
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex text-xl items-center">
                                    <div
                                        className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                        onClick={() => openUpdate("")}
                                    >
                                        <FaRegEdit />
                                    </div>
                                    <div
                                        className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                        onClick={() => deleteProject("")}
                                    >
                                        <MdDelete />
                                    </div>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
                {/* ) : (
                    <h1 className="not_found">Sorry no data found</h1>
                )} */}
            </div>
        </Layout>
    );
};

export default Project;
