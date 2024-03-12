"use client";

import { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import InputField from "@/Components/common/InputField";
import SelectionField from "@/Components/common/SelectionField";
import Loader from "@/Components/common/Loader";
import { Table } from "flowbite-react";
import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { departments, fileToUrlLink, positions, years } from "@/assets/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { message } from "antd";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaUserEdit,
} from "react-icons/fa";
import { MdEmail, MdCall, MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";


const Alumni = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [allAlumni, setAllAlumni] = useState([]);
    const [photo, setPhotoUrl] = useState("");
    const [searchVal, setSearchVal] = useState("");
    const [alumniDetails, setAlumniDetails] = useState({
        name: "",
        position: "",
        year: "",
        dept: "",
        email: "",
        phone: "",
        facebook: "",
        instagram: "",
        linkedin: "",
    });

    // validate inputs details
    const validate = Yup.object({
        name: Yup.string().required("name is required"),
        position: Yup.string().required("select the position"),
        year: Yup.number().required("select the year"),
        email: Yup.string()
            .email("enter a valid email")
            .required("email is required"),
        phone: Yup.string()
            .min(10, "mobile number must be 10 digits")
            .max(10, "mobile number must be 10 digits")
            .required("mobile no is required"),
    });

    // upload the photo into firebase storage
    const uploadPhoto = async (e) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgUrl = await fileToUrlLink(imgFile, `Alumni/`);
            setPhotoUrl(imgUrl);
            message.success("photo Upload");
        }
        else message.error("Photo is not uploaded");
    };

    // reset values
    const resetAllData = async () => {
        setAlumniDetails({
            name: "",
            photo: "",
            position: "",
            year: "",
            dept: "",
            email: "",
            phone: "",
            facebook: "",
            instagram: "",
            linkedin: "",
        });
        setPhotoUrl("");
        setIsUpdate(false);
        setOpenModal(false);
    };

    // update values
    const updateAlumni = async (value) => {
        setIsUpdate(true);
        const {
            name,
            photo,
            position,
            year,
            dept,
            email,
            phone,
            socialLinks: { facebook, instagram, linkedin },
        } = value;
        setAlumniDetails({
            name,
            position,
            year,
            dept,
            email,
            phone,
            facebook,
            instagram,
            linkedin,
        });
        setPhotoUrl(photo);
        setOpenModal(true);
    };

    // get all alumni details
    const getAllAlumni = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/alumni");
            setAllAlumni(data.alumniMembers);
        } catch (error) {
            message.error("Error getting...")
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // add alumni details
    const addAlumni = async (values) => {
        if (!photo) {
            message.error("Please upload a photo");
            return;
        }
        try {
            setLoading(true);
            values.photo = photo;
            const { data } = await axios.post("/api/alumni/add", values);
            message.success(data.message);
            getAllAlumni();
            resetAllData();
        } catch (error) {
            message.error("Error getting...")
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // update alumni details
    const updateAlumniDetails = async (values) => {
        try {
            setLoading(true);
            values.photo = photo;
            const { data } = await axios.post("/api/alumni/update", values);
            message.success(data.message)
            getAllAlumni();
            resetAllData();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // delete alumni details
    const deleteAlumniDetails = async (item) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/alumni/remove`, item);
            message.success(data.message);
            getAllAlumni();
        } catch (error) {
            message.error("Error getting...")
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllAlumni();
    }, []);

    return (
        <Layout header="Alumni">
            {loading ? (
                <Loader />
            ) : (
                <>
                    <div className="mb-4 mt-2 flex justify-between items-center">
                        <div className="w-[20rem]">
                            <TextInput
                                value={searchVal}
                                onChange={(e) => setSearchVal(e.target.value)}
                                placeholder="Search by name...."
                                icon={FaMagnifyingGlass}
                                className=" outline-none focus:ring-transparent focus:border-none"
                            />
                        </div>
                        <div className="button" onClick={() => setOpenModal(true)}>
                            Add New
                        </div>
                    </div>
                    <Modal
                        show={openModal}
                        size="lg"
                        popup
                        onClose={() => (setOpenModal(false), resetAllData())}
                    >
                        <Modal.Header className="ms-4 mt-2">
                            {isUpdate ? "Update alumni details" : "Add new alumni details"}
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={alumniDetails}
                                validationSchema={validate}
                                onSubmit={(values) =>
                                    isUpdate ? updateAlumniDetails(values) : addAlumni(values)
                                }
                            >
                                {({ values }) => (
                                    <Form>
                                        <InputField
                                            name="name"
                                            label={"Name"}
                                            placeholder="Enter name"
                                        />
                                        <InputField
                                            name="email"
                                            label="Email"
                                            placeholder="name@gamil.com"
                                        />
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <InputField
                                                name="phone"
                                                label={"Phone"}
                                                placeholder="0123456789"
                                            />
                                            <SelectionField
                                                name="position"
                                                label={"Select position"}
                                                data={positions}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-x-4">
                                            <SelectionField
                                                name="year"
                                                label="Select pass-out year"
                                                data={years}
                                            />
                                            <SelectionField
                                                name="dept"
                                                label="Select department"
                                                data={departments}
                                            />
                                        </div>
                                        <div id="fileUpload" className="w-full">
                                            <div className="mb-2 block">
                                                <Label htmlFor="file" value="Upload photo" />
                                            </div>
                                            <FileInput
                                                id="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={uploadPhoto}
                                            />
                                            {photo &&
                                                <Link target="_blank" href={photo} className="text-sm text-blue-500 cursor-pointer ms-4">View</Link>
                                            }
                                        </div>
                                        <h1 className="text-lg font-semibold text-gray-800 my-2">
                                            Add Social Media links
                                        </h1>
                                        <InputField
                                            className="mb-2"
                                            name="facebook"
                                            icon={FaFacebook}
                                        />
                                        <InputField
                                            className="mb-2"
                                            name="linkedin"
                                            icon={FaLinkedin}
                                        />
                                        <InputField
                                            className="mb-2"
                                            name="instagram"
                                            icon={FaInstagram}
                                        />
                                        <div className="flex my-3 space-x-4">
                                            {isUpdate ? (
                                                <Button type="submit" color="blue" >
                                                    Update
                                                </Button>
                                            ) : (
                                                <Button type="submit" color="success">
                                                    Add Alumni
                                                </Button>
                                            )}
                                            <Button
                                                onClick={resetAllData}
                                                type="reset"
                                                color="failure"
                                            >
                                                Reset
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Modal.Body>
                    </Modal>
                    <div>
                        {allAlumni.length > 0 && allAlumni ? (
                            <div className="overflow-x-auto my-2 shadow-lg rounded-lg border">
                                <Table hoverable>
                                    <Table.Head className="bg-red-500">
                                        <Table.HeadCell>Alumni Name</Table.HeadCell>
                                        <Table.HeadCell>Position</Table.HeadCell>
                                        <Table.HeadCell>Year</Table.HeadCell>
                                        <Table.HeadCell>Dept</Table.HeadCell>
                                        <Table.HeadCell>contact info</Table.HeadCell>
                                        <Table.HeadCell>social links</Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body className="divnamee-y">
                                        {allAlumni
                                            .filter((ele) =>
                                                ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                            )
                                            .map((item, i) => {
                                                const {
                                                    name,
                                                    photo,
                                                    position,
                                                    year,
                                                    dept,
                                                    email,
                                                    phone,
                                                    socialLinks: { facebook, instagram, linkedin },
                                                } = item;
                                                return (
                                                    <Table.Row key={i} className="bg-white">
                                                        <Table.Cell className="whitespace-nowrap capitalize font-medium text-gray-900 flex items-center">
                                                            <img
                                                                src={photo}
                                                                alt="photo"
                                                                className="w-12 h-12 rounded-full object-cover me-3"
                                                            />
                                                            {name}
                                                        </Table.Cell>
                                                        <Table.Cell>{position}</Table.Cell>
                                                        <Table.Cell>{year}</Table.Cell>
                                                        <Table.Cell>{dept}</Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex items-center gap-x-3 mb-1">
                                                                <MdEmail />
                                                                {email}
                                                            </div>
                                                            <div className="flex items-center gap-x-3">
                                                                <MdCall />
                                                                {phone}{" "}
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex items-center gap-x-3 text-xl">
                                                                {facebook && (
                                                                    <Link
                                                                        href={facebook}
                                                                        target="_blank"
                                                                        className="text-blue-700"
                                                                    >
                                                                        <FaFacebook />
                                                                    </Link>
                                                                )}
                                                                {instagram && (
                                                                    <Link
                                                                        href={instagram}
                                                                        target="_blank"
                                                                        className="text-rose-500"
                                                                    >
                                                                        <FaInstagram />
                                                                    </Link>
                                                                )}
                                                                {linkedin && (
                                                                    <Link
                                                                        href={linkedin}
                                                                        target="_blank"
                                                                        className="text-blue-500"
                                                                    >
                                                                        <FaLinkedin />
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            <div className="flex text-xl items-center">
                                                                <div
                                                                    className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                                    onClick={() => updateAlumni(item)}
                                                                >
                                                                    <FaUserEdit />
                                                                </div>
                                                                <div
                                                                    className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                                    onClick={() => deleteAlumniDetails(item)}
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
                            </div>
                        ) : (
                            <h1 className="text-center text-4xl font-semibold text-gray-600 my-20">
                                Sorry no data found
                            </h1>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
};

export default Alumni;
