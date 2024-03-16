"use client";

import { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import InputField from "@/Components/common/InputField";
import SelectionField from "@/Components/common/SelectionField";
import Loader from "@/Components/common/Loader";
import { Button, Label, Modal, FileInput } from "flowbite-react";
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
} from "react-icons/fa";
import Image, { StaticImageData } from "next/image";
import TeamIcon from "@/assets/team.png"
import { membersType } from "@/type";


const Alumni = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [yearList, setYearList] = useState<string[]>([]);
    const [photo, setPhotoUrl] = useState<string | StaticImageData>("");
    const [memberDetails, setMemberDetails] = useState<membersType>({
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
    const uploadPhoto = async (e: any) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgUrl = await fileToUrlLink(imgFile, `Members/`);
            if (imgUrl) {
                setPhotoUrl(imgUrl)
                message.success("photo Upload");
            }
            else message.error("photo is not uploaded");
        }
        else message.error("Photo is not uploaded");
    };

    // reset values
    const resetAllData = async () => {
        setMemberDetails({
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
        setOpenModal(false);
    };


    // get all alumni details
    const getAllMembers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/members");
            const list = data.members;
            if (list) {
                const yearList = list.map((ele: any) => ele.year)
                const years: Set<string> = new Set(yearList);
                const newArr: string[] = Array.from(years)
                setYearList(newArr);
            }
        } catch (error) {
            console.log(error);
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // add alumni details
    const addMembersDetails = async (values: membersType) => {
        if (!photo) {
            message.error("Please upload a photo");
            return;
        }
        try {
            setLoading(true);
            values.photo = photo;
            const { data } = await axios.post("/api/members/add", values);
            message.success(data.message);
            getAllMembers();
            resetAllData();
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllMembers();
    }, []);

    return (
        <Layout header="Members">
            {loading ? (
                <Loader />
            ) : (
                <div className="w-full h-auto pb-20 overflow-auto">
                    <div className="button mb-4" onClick={() => setOpenModal(true)}>
                        Add Member
                    </div>
                    <Modal
                        show={openModal}
                        size="lg"
                        popup
                        onClose={() => (setOpenModal(false), resetAllData())}
                    >
                        <Modal.Header className="ms-4 mt-2">
                            Add new Member&apos;s details
                        </Modal.Header>
                        <Modal.Body>
                            <Formik
                                initialValues={memberDetails}
                                validationSchema={validate}
                                onSubmit={(values) => addMembersDetails(values)}
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
                                        </div>
                                        <h1 className="text-lg font-semibold text-gray-800 my-2">
                                            Add Social Media links
                                        </h1>
                                        <InputField
                                            name="facebook"
                                            icon={FaFacebook}
                                        />
                                        <InputField
                                            name="linkedin"
                                            icon={FaLinkedin}
                                        />
                                        <InputField
                                            name="instagram"
                                            icon={FaInstagram}
                                        />
                                        <div className="flex justify-start my-3 space-x-4">
                                            <button type="submit" className="button">
                                                Add member
                                            </button>
                                            <button
                                                onClick={resetAllData}
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
                        {yearList.length > 0 ? (
                            <div className="grid grid-cols-4 gap-8">
                                {
                                    yearList.sort().reverse().map((ele) => (
                                        <MemberCard key={ele} year={ele} />
                                    ))
                                }
                            </div>
                        ) : (
                            <h1 className="text-center text-4xl font-semibold text-gray-600 my-20">
                                Sorry no data found
                            </h1>
                        )}
                    </div>
                </div>
            )}
        </Layout>
    );
};

export default Alumni;


const MemberCard: React.FC<{ year: string }> = ({ year }) => {
    return (
        <div className="w-full h-56 p-4 border shadow-lg rounded-lg bg-white">
            <div className="flex justify-center items-center">
                <Image src={TeamIcon} className="w-20 h-auto object-contain" alt="icon" />
            </div>
            <div className="w-full mt-8 space-y-1 flex flex-col items-center justify-center">
                <h1 className="text-lg font-semibold text-title text-center">{year} Batch</h1>
                <Link href={`/member/${year}`}>
                    <button className="button w-44 mx-auto text-gray-700 bg-white hover:bg-gray-200">View Members</button>
                </Link>
            </div>
        </div>
    )
}