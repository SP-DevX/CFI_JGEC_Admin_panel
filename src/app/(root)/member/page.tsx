"use client";

import { ChangeEvent, useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import InputField from "@/Components/common/InputField";
import SelectionField from "@/Components/common/SelectionField";
import Loader from "@/Components/common/Loader";
import { Label, Modal, FileInput, Select, Button } from "flowbite-react";
import { departments, fileToUrlLink, positions, years } from "@/utils/data";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import TeamIcon from "@/assets/team.png"; 
import { RxCross1 } from "react-icons/rx";
import ImageCropUpload from "@/Components/common/CroppedImage";

const Alumni = () => {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [yearList, setYearList] = useState<string[]>([]);
    const [photo, setPhotoUrl] = useState<string>("");
    const [memberDetails, setMemberDetails] = useState<membersType>({
        name: "",
        position: [],
        year: "",
        dept: "",
        email: "",
        phone: "",
        facebook: "",
        instagram: "",
        linkedin: "",
    });
    const [selectPositions, setSelectPositions] = useState<string[]>([])

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

    const handelSelect = (e: ChangeEvent<HTMLSelectElement>) => {
        const item = e.target.value;
        if (selectPositions.length > 0) {
            const ind = selectPositions.findIndex(ele => ele === item);
            if (ind === -1) setSelectPositions([...selectPositions, e.target.value]);
            else toast.error("Position already selected")
        } else setSelectPositions([e.target.value]);
    }
    const removePosition = (value: string) => {
        setSelectPositions(pre => pre.filter(ele => ele !== value));
    }

    // upload the photo into firebase storage
    const downloadUrl = async (url: string) => {
        setPhotoUrl(url);
    };

    // reset values
    const resetAllData = async () => {
        setMemberDetails({
            name: "",
            photo: "",
            position: [],
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
                const yearList = list.map((ele: any) => ele.year);
                const years: Set<string> = new Set(yearList);
                const newArr: string[] = Array.from(years);
                setYearList(newArr);
            }
        } catch (error) {
            console.log(error);
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    // add alumni details
    const addMembersDetails = async (values: membersType) => {
        console.log(values);

        if (selectPositions.length==0) {
            toast.error("Please select positions");
            return;
        }
        try {
            setLoading(true);
            values.photo = photo;
            values.position = selectPositions;
            const { data } = await axios.post("/api/members/add", values);
            console.log(data);
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

    useEffect(() => {
        getAllMembers();
    }, []);

    if (loading) return <Loader />;
    return (
        <Layout header="Members">
            <div className="w-full h-auto pb-20 overflow-auto">
                <div className="button mb-4 ms-auto" onClick={() => setOpenModal(true)}>
                    Add Member
                </div>
                <Modal
                    show={openModal}
                    size="xl"
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
                            {({ values, handleReset }) => (
                                <Form>
                                    <InputField
                                        name="name"
                                        label={"Name"}
                                        placeholder="Enter name"
                                    />
                                    <div className="my-2">
                                        <div className="mb-1 block">
                                            <Label htmlFor={"position"} value={"Select Position (you can select multiple positions)"} />
                                        </div>
                                        <Select onChange={handelSelect}>
                                            {positions.map((item: string) => (
                                                <option value={item} key={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Select>
                                        <div className="flex items-center flex-wrap gap-2 mt-2">
                                            {
                                                selectPositions.length > 0 && selectPositions.map(item => (
                                                    <div key={item} className="flex items-center gap-x-2 px-4 py-2 text-sm bg-violet-500 text-white  rounded-md">
                                                        <p>{item}</p>
                                                        <RxCross1 className="cursor-pointer" onClick={() => removePosition(item)} />
                                                    </div>
                                                ))
                                            }
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
                                        />
                                        <SelectionField
                                            name="dept"
                                            label="Select department"
                                            data={departments}
                                        />
                                    </div>
                                    <div className="w-full my-3 flex items-center gap-x-8">
                                        <div className=" min-w-16 w-16 h-16 bg-gray-300 rounded-md">
                                            {photo && <Image src={photo} width={40} height={40} alt="profile" className="w-16 h-16 rounded-md object-contain" />}
                                        </div>
                                        <div className="w-full">
                                            <Label className="pb-2">Upload Profile photo</Label>
                                            <ImageCropUpload aspect={1 / 1} onUploadComplete={downloadUrl} fileType="Members/" />
                                        </div>

                                    </div>
                                    <h1 className="text-lg font-semibold text-gray-800 my-2">
                                        Add Social Media links
                                    </h1>
                                    <InputField name="facebook" icon={FaFacebook} />
                                    <InputField name="linkedin" icon={FaLinkedin} />
                                    <InputField name="instagram" icon={FaInstagram} />
                                    <div className="flex justify-start my-3 space-x-4">
                                        <Button disabled={photo === ""} type="submit" className="button w-36 bg-green-500">
                                            Add member
                                        </Button>
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
                    {yearList.length > 0 ? (
                        <div className="grid grid-cols-4 gap-8">
                            {yearList
                                .sort()
                                .reverse()
                                .map((ele) => (
                                    <MemberCard key={ele} year={ele} />
                                ))}
                        </div>
                    ) : (
                        <h1 className="text-center text-4xl font-semibold text-gray-600 my-20">
                            Sorry no data found
                        </h1>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default Alumni;

const MemberCard: React.FC<{ year: string }> = ({ year }) => {
    return (
        <div className="w-full h-56 p-4 border shadow-lg rounded-lg bg-white">
            <div className="flex justify-center items-center">
                <Image
                    src={TeamIcon}
                    className="w-20 h-auto object-contain"
                    alt="icon"
                />
            </div>
            <div className="w-full mt-8 space-y-1 flex flex-col items-center justify-center">
                <h1 className="text-lg font-semibold text-title text-center">
                    {year} Batch
                </h1>
                <Link href={`/member/${year}`}>
                    <button className="button w-44 mx-auto text-gray-700 bg-white hover:bg-gray-200">
                        View Members
                    </button>
                </Link>
            </div>
        </div>
    );
};
