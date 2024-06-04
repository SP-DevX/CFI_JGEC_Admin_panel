"use client";

import Layout from "@/Components/common/CommonLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Arduino from "@/assets/arduino.jpeg";
import { FileInput, Label, Modal, TextInput } from "flowbite-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import InputField from "@/Components/common/InputField";
import { fileToUrlLink } from "@/utils/data";
import { toast } from "react-hot-toast";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { ComponentsType, resComponentsType } from "@/type";
import axios from "axios";
import Loader from "@/Components/common/Loader";

interface cerType {
    url: String;
    refId: String
}

const Stock = () => {
    const [certificateList, setCertificateList] = useState<cerType[]>()
    const [searchVal, setSearchVal] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [photo, setPhoto] = useState("");
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [resCompList, setResCompList] = useState<resComponentsType[]>();
    const [compDetails, setCompDetails] = useState<ComponentsType>({
        photo: "",
        name: "",
        modelNo: "",
        qty: null,
    });

    const uploadPhoto = async (e: any) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgUrl = await fileToUrlLink(imgFile, `Components/`);
            if (imgUrl) {
                setPhoto(imgUrl);
                toast.success("photo Upload");
            } else toast.error("photo is not uploaded");
        } else toast.error("Photo is not uploaded");
    };

    // update values
    const openUpdate = async (value: ComponentsType) => {
        setIsUpdate(true);
        const { name, modelNo, qty, photo } = value;
        setCompDetails({ name, modelNo, qty });
        // @ts-ignore
        setPhoto(photo)
        setOpenModal(true);
    };

    const AddOrUpdate = async (path: string, values: ComponentsType) => {
        if (!photo) {
            toast.error("Please upload a photo");
            return;
        }
        try {
            setLoading(true);
            values.photo = photo;
            const { data } = await axios.post(`/api/stock/${path}`, values);
            values.photo = photo;
            toast.success(data.message);
            getAllComp();
            resetAllData();
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };
    const deleteComp = async (values: ComponentsType) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/stock/remove`, values);
            toast.success(data.message);
            getAllComp();
            resetAllData();
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const getAllComp = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/stock`);
            // console.log(data);
            setResCompList(data.components);
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const resetAllData = () => {
        setCompDetails({
            photo: "",
            name: "",
            modelNo: "",
            qty: null,
        });
        setPhoto("");
        setIsUpdate(false);
        setOpenModal(false);
    };

    useEffect(() => {
        getAllComp();
    }, []);

    const validate = Yup.object({
        name: Yup.string()
            .required("model name is required")
            .max(20, "model name at most 20 characters"),
        modelNo: Yup.string().max(30, "model no at most 20 characters"),
        qty: Yup.number().required("qty is required"),
    });

    if (loading) return <Loader />;

    return (
        <>
            <Modal show={openModal} size={"md"} onClose={() => setOpenModal(false)}>
                <Modal.Header>
                    {
                        isUpdate ? "Update Component details" : "Add new Component details"
                    }
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={compDetails}
                        validationSchema={validate}
                        onSubmit={(values) =>
                            isUpdate
                                ? AddOrUpdate(`update`, values)
                                : AddOrUpdate(`add`, values)
                        }
                    >
                        {(formik) => (
                            <Form>
                                <div id="fileUpload" className="w-full">
                                    <div className="mb-2 block">
                                        <Label htmlFor="file" value="Model photo" />
                                    </div>
                                    <FileInput
                                        id="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={uploadPhoto}
                                    />
                                </div>
                                <InputField
                                    name="name"
                                    label="Component name"
                                    placeholder="Enter component name"
                                    disabled={isUpdate}
                                />
                                <InputField
                                    name="modelNo"
                                    label="Model No"
                                    placeholder="Enter Model No"
                                />
                                <InputField
                                    type="number"
                                    name="qty"
                                    label="Quantity"
                                    placeholder="Enter quantity"
                                />
                                <div className="space-x-4 mt-4">
                                    <button
                                        type="submit"
                                        className={`button ${photo === "" && "opacity-50 cursor-not-allowed"}`}
                                        disabled={photo === ""}
                                    >
                                        {isUpdate ? "Update" : "Add"}
                                    </button>
                                    <button type="reset" className="button bg-red-500">
                                        Reset{" "}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>
            <section className="mb-20">
                <Layout header="stock">
                    <div className="flex justify-between items-center mb-4">
                        <TextInput
                            value={searchVal}
                            onChange={(e) => setSearchVal(e.target.value)}
                            placeholder="Search by component name..."
                            icon={FaMagnifyingGlass}
                            className=" w-2/5 outline-none focus:ring-transparent focus:border-none"
                        />
                        <button
                            className="button w-48 ms-auto"
                            onClick={() => setOpenModal(true)}
                        >
                            Add Components
                        </button>
                    </div>
                    {
                        resCompList ?
                            <>

                                <div className="w-full h-full grid grid-cols-4 gap-8">
                                    {resCompList
                                        ?.filter((ele) =>
                                            ele.name.toLowerCase().includes(searchVal.toLowerCase())
                                        )
                                        .map((item, i) => (
                                            <div
                                                className="w-full h-[15rem] rounded-lg border shadow-lg bg-white"
                                                key={i}
                                            >
                                                <Image
                                                    src={item.photo ? item.photo : Arduino}
                                                    className="w-full h-32 object-contain mix-blend-multiply p-3"
                                                    alt="stock"
                                                    width={100}
                                                    height={100}
                                                    priority
                                                />
                                                <div className="w-full py-2 px-3 text-sm font-medium text-gray-800">
                                                    <h1 className="text-base font-semibold capitalize">
                                                        {item.name}
                                                    </h1>
                                                    <p>
                                                        Model No:
                                                        <span className="text-gray-600 text-xs ms-2">
                                                            {item.modelNo}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        Qty-
                                                        <span className="text-gray-600 text-sm ms-2">{item.qty}</span>
                                                    </p>
                                                </div>
                                                <div className="mt-auto flex items-center justify-center space-x-4">
                                                    <FaRegEdit
                                                        size={18}
                                                        className="text-green-500 cursor-pointer"
                                                        onClick={() => openUpdate(item)}
                                                    />
                                                    <MdDelete
                                                        size={20}
                                                        className="text-red-500 cursor-pointer"
                                                        onClick={() => deleteComp(item)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </> :
                            <h1 className="not_found">Sorry no data found</h1>
                    }
                </Layout>
            </section>
        </>
    );
};

export default Stock;

// const StockCard = () => {
//     return (
//         <div className="w-full h-[16rem] rounded-lg border shadow-lg bg-white">
//             <Image
//                 src={Arduino}
//                 className="w-full h-32 object-contain mix-blend-multiply"
//                 alt="stock"
//             />
//             <div className="w-full py-2 px-6 text-sm font-medium text-gray-800">
//                 <h1 className="text-lg font-semibold capitalize">arduino board</h1>
//                 <p>
//                     Model No: <span className="text-gray-600 ms-2">Uno</span>
//                 </p>
//                 <p>
//                     Qty-<span className="text-gray-600 ms-2">3</span>
//                 </p>
//             </div>
//             <div className="flex items-center justify-center space-x-4">
//                 <FaRegEdit size={20} className="text-green-500 cursor-pointer" />
//                 <MdDelete size={25} className="text-red-500 cursor-pointer" />
//             </div>
//         </div>
//     );
// };
