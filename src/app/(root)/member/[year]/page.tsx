"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import InputField from "@/Components/common/InputField";
import SelectionField from "@/Components/common/SelectionField";
import Loader from "@/Components/common/Loader";
import { Select, Table } from "flowbite-react";
import { Button, Label, Modal, TextInput, FileInput } from "flowbite-react";
import { deleteStorage, departments, fileToUrlLink, positions, years } from "@/utils/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaUserEdit,
} from "react-icons/fa";
import { MdEmail, MdCall, MdDelete } from "react-icons/md";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Image, { StaticImageData } from "next/image";
import { useParams } from "next/navigation"; 
import ImageCropUpload from "@/Components/common/CroppedImage";
import { RxCross1 } from "react-icons/rx";


const Members = () => {
    const [openModal, setOpenModal] = useState(false);
    const { year } = useParams();
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [resAllMembers, setResAllMembers] = useState<resMembersType[]>();
    const [searchVal, setSearchVal] = useState("");
    const [photo, setPhotoUrl] = useState("");
    const [selectPositions, setSelectPositions] = useState<string[]>([]);
    const [memberDetails, setMemberDetails] = useState<membersType>({
        photo: "",
        name: "",
        position: [],
        year: year,
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
    const downloadUrl = async (url: string) => {
        setPhotoUrl(url);
    };

    const handelSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = e.target.value;
        if (selectPositions.length > 0) {
            const ind = selectPositions.findIndex((ele) => ele === item);
            if (ind === -1) setSelectPositions([...selectPositions, e.target.value]);
            else toast.error("Position already selected");
        } else setSelectPositions([e.target.value]);
    };
    const removePosition = (value: string) => {
        setSelectPositions((pre) => pre.filter((ele) => ele !== value));
    };

    // reset values
    const resetAllData = async () => {
        setMemberDetails({
            name: "",
            position: [],
            year: year,
            dept: "",
            email: "",
            phone: "",
            facebook: "",
            instagram: "",
            linkedin: "",
        });
        setPhotoUrl("");
        setSelectPositions([]);
        setIsUpdate(false);
        setOpenModal(false);
    };

    // update values
    const openUpdate = async (value: resMembersType) => {
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
        setMemberDetails({
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
        // @ts-ignore
        setPhotoUrl(photo);
        setSelectPositions(position)
        setOpenModal(true);
    };

    // get all alumni details
    const getAllMembers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/members/${year}`);
            // console.log(data.members);
            setResAllMembers(data.members);
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const AddOrUpdateMembers = async (path: string, values: membersType) => {
        if (selectPositions.length == 0) {
            toast.error("Please select positions");
            return;
        }
        try {
            setLoading(true);
            values.photo = photo;
            values.position = selectPositions;
            const { data } = await axios.post(`/api/members/${path}`, values);
            toast.success(data.message);
            getAllMembers();
            resetAllData();
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // add alumni details
    // const addAlumni = async (values: membersType) => {
    //     if (!photo) {
    //         toast.error("Please upload a photo");
    //         return;
    //     }
    //     try {
    //         setLoading(true);
    //         values.photo = photo;
    //         const { data } = await axios.post("/api/alumni/add", values);
    //         toast.success(data.message);
    //         getAllMembers();
    //         resetAllData();
    //     } catch (error) {
    //         toast.error("Error getting...")
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // update alumni details
    // const openUpdateDetails = async (values: membersType) => {
    //     try {
    //         setLoading(true);
    //         values.photo = photo;
    //         const { data } = await axios.post("/api/alumni/update", values);
    //         toast.success(data.message)
    //         getAllMembers();
    //         resetAllData();
    //     } catch (error) {
    //         console.log(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // delete alumni details
    const removeMembersDetails = async (values: membersType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/members/remove`, values);
            toast.success(data.message);
            if (values.photo) deleteStorage(values.photo)
            getAllMembers();
        } catch (error) {
            console.log(error);
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllMembers();
    }, [year]);

    if (loading) return <Loader />;

    return (
        <Layout header="Members">
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
                    Add Member
                </div>
            </div>
            <Modal
                show={openModal}
                size="lg"
                popup
                onClose={resetAllData}
            >
                <Modal.Header className="ms-4 mt-2">
                    {isUpdate ? "Update Member&apos;s details" : "Add new Member&apos;s details"}
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={memberDetails}
                        validationSchema={validate}
                        onSubmit={(values) =>
                            isUpdate
                                ? AddOrUpdateMembers("update", values)
                                : AddOrUpdateMembers("add", values)
                        }
                    >
                        {({ values, handleReset }) => (
                            <Form>
                                <InputField
                                    name="name"
                                    label={"Name"}
                                    placeholder="Enter name"
                                />
                                <div className="my-2">
                                    <div className="mb-1 block">
                                        <Label
                                            htmlFor={"position"}
                                            value={
                                                "Select Position (you can select multiple positions)"
                                            }
                                        />
                                    </div>
                                    <Select onChange={handelSelect}>
                                        {positions.map((item: string) => (
                                            <option value={item} key={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </Select>
                                    <div className="flex items-center flex-wrap gap-2 mt-2">
                                        {selectPositions.length > 0 &&
                                            selectPositions.map((item) => (
                                                <div
                                                    key={item}
                                                    className="flex items-center gap-x-2 px-4 py-2 text-sm bg-violet-500 text-white  rounded-md"
                                                >
                                                    <p>{item}</p>
                                                    <RxCross1
                                                        className="cursor-pointer"
                                                        onClick={() => removePosition(item)}
                                                    />
                                                </div>
                                            ))}
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <InputField
                                        name="email"
                                        label="Email"
                                        placeholder="name@gamil.com"
                                    />
                                    <InputField
                                        name="phone"
                                        label={"Phone"}
                                        placeholder="0123456789"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-x-4">
                                    <SelectionField
                                        name="year"
                                        label="Select pass-out year"
                                        data={years}
                                        disabled
                                    />
                                    <SelectionField
                                        name="dept"
                                        label="Select department"
                                        data={departments}
                                    />
                                </div>
                                <div className="w-full my-3 flex items-center gap-x-8">
                                    <div className=" min-w-16 w-16 h-16 bg-gray-300 rounded-md">
                                        {photo && (
                                            <Image
                                                src={photo}
                                                width={40}
                                                height={40}
                                                alt="profile"
                                                className="w-16 h-16 rounded-md object-contain"
                                            />
                                        )}
                                    </div>
                                    <div className="w-full">
                                        <Label className="pb-2">Upload Profile photo</Label>
                                        <ImageCropUpload
                                            aspect={1 / 1}
                                            onUploadComplete={downloadUrl}
                                            fileType="Members/"
                                        />
                                    </div>
                                </div>
                                <h1 className="text-lg font-semibold text-gray-800 my-2">
                                    Add Social Media links
                                </h1>
                                <InputField name="facebook" icon={FaFacebook} />
                                <InputField name="linkedin" icon={FaLinkedin} />
                                <InputField name="instagram" icon={FaInstagram} />
                                <div className="flex my-3 space-x-4">
                                    {isUpdate ? (
                                        <Button type="submit" disabled={photo === ""} className="button bg-blue-500">
                                            Update
                                        </Button>
                                    ) : (
                                        <Button type="submit" disabled={photo === ""} className="button w-36 bg-green-500">
                                            Add Member
                                        </Button>
                                    )}
                                    <button
                                        onClick={handleReset}
                                        type="reset"
                                        className="button bg-red-500"
                                    >
                                        Reset
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <div>
                {resAllMembers && resAllMembers.length > 0 ?
                    (
                        <div className="overflow-x-auto my-2 shadow-lg rounded-lg border">
                            <Table hoverable>
                                <Table.Head className="bg-red-500">
                                    <Table.HeadCell>Alumni Name</Table.HeadCell>
                                    <Table.HeadCell>Position</Table.HeadCell>
                                    <Table.HeadCell>Year & Dept</Table.HeadCell>
                                    <Table.HeadCell>contact info</Table.HeadCell>
                                    <Table.HeadCell>social links</Table.HeadCell>
                                    <Table.HeadCell>Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {resAllMembers
                                        .filter((ele) =>
                                            ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                        )
                                        .filter((elem) => (elem.year = year))
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
                                                        {photo && <Image
                                                            src={photo}
                                                            alt="photo"
                                                            className="min-w-12 w-12 h-12 rounded-full object-cover me-3"
                                                            width={50}
                                                            height={50}
                                                        />}
                                                        {name}
                                                    </Table.Cell>
                                                    <Table.Cell className="!p-1">
                                                        <div className="flex flex-wrap">
                                                            {position.map(ele => (
                                                                <p className="text-xs" key={ele}>{ele},</p>
                                                            ))}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <p>{year}</p>
                                                        <p>{dept}</p>
                                                    </Table.Cell>
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
                                                                onClick={() => openUpdate(item)}
                                                            >
                                                                <FaUserEdit />
                                                            </div>
                                                            <div
                                                                className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                                onClick={() => removeMembersDetails(item)}
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
        </Layout>
    );
};

export default Members;
