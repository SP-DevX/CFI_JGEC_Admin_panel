"use client";

import {
    Button,
    FileInput,
    Label,
    Modal,
    TextInput,
    Textarea,
    Timeline,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";
import axios from "axios";
import Loader from "@/Components/common/Loader";
import { fileToUrlLink } from "@/utils/data";
import { NoticeType } from "@/type";
import Layout from "@/Components/common/CommonLayout";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

function Notice() {
    const [openModal, setOpenModal] = useState(false);
    const [allNotices, setAllNotices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const [newNoticeDetails, setNewNoticeDetails] = useState<NoticeType>({
        title: "",
        description: "",
        date: "",
        link: "",
        _id: "",
    });

    const onChangeValues = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewNoticeDetails({ ...newNoticeDetails, [name]: value });
    };

    const uploadFile = async (e: any) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file) {
                setLoading(true);
                const fileUrl = await fileToUrlLink(file, "Notice");
                setNewNoticeDetails({ ...newNoticeDetails, link: fileUrl! });
                setLoading(false);
                alert(`Successfully uploaded file`);
            }
        }
    };

    const updateDetails = (value: NoticeType) => {
        setIsUpdate(true);
        const { title, description, link, date, _id } = value;
        setNewNoticeDetails({ title, description, link, date, _id });
        setOpenModal(true);
    };

    const resetDetails = () => {
        setNewNoticeDetails({ title: "", description: "", date: "", link: "" });
    };

    const getAllNotices = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/notice");
            setAllNotices(data.allNotices.reverse());
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const submitDetails = async () => {
        const { title, description, date, link } = newNoticeDetails;
        if (title && description && date && link) {
            try {
                setLoading(true);
                const { data } = await axios.post("/api/notice/add", newNoticeDetails);
                getAllNotices();
                setOpenModal(false);
                resetDetails();
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please filled all the fields");
        }
    };

    const updateNoticeDetails = async () => {
        const { title, description, date, link } = newNoticeDetails;
        if (title && description && date && link) {
            try {
                setLoading(true);
                const { data } = await axios.post(
                    "/api/notice/update",
                    newNoticeDetails
                );
                getAllNotices();
                setOpenModal(false);
                resetDetails();
                setIsUpdate(false);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        } else {
            alert("Please filled all the fields");
        }
    };

    const deleteNotice = async (value: NoticeType) => {
        try {
            setLoading(true);
            await axios.post("/api/notice/remove", value);
            getAllNotices();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllNotices();
    }, []);

    return (
        <Layout header="Notice">
            <div className="button" onClick={() => setOpenModal(true)}>
                New Notice
            </div>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Modal
                        show={openModal}
                        size="lg"
                        popup
                        onClose={() => setOpenModal(false)}
                    >
                        <Modal.Header>
                            <p className="ms-4">Add New Notice</p>
                        </Modal.Header>
                        <Modal.Body className="py-2">
                            <div className="max-w-md mb-2">
                                <div className="mb-1 block">
                                    <Label htmlFor="noticeTitle" value="Notice Title" />
                                </div>
                                <TextInput
                                    type="text"
                                    name="title"
                                    value={newNoticeDetails.title}
                                    onChange={(e) => onChangeValues(e)}
                                    placeholder="Notice title"
                                    required
                                />
                            </div>
                            <div className="max-w-md mb-2">
                                <div className="mb-1 block">
                                    <Label htmlFor="description" value="Notice Description" />
                                </div>
                                <Textarea
                                    name="description"
                                    value={newNoticeDetails.description}
                                    onChange={(e) => onChangeValues(e)}
                                    placeholder="write about the notice"
                                    required
                                    rows={4}
                                />
                            </div>
                            <div className="max-w-md mb-2">
                                <div className="mb-1 block">
                                    <Label htmlFor="file" value="Attach file" />
                                </div>
                                {/* @ts-ignore */}
                                <FileInput type="file" onChange={uploadFile} />
                            </div>
                            <div className="text-center text-[12px] font-semibold text-gray-600">
                                OR
                            </div>
                            <div className="max-w-md mb-2">
                                <div className="mb-1 block">
                                    <Label htmlFor="file" value="Attach any link" />
                                </div>
                                <TextInput
                                    name="link"
                                    value={newNoticeDetails.link}
                                    onChange={(e) => onChangeValues(e)}
                                    placeholder="Enter the file link"
                                />
                            </div>
                            <div className="max-w-md mb-2">
                                <div className="mb-1 block">
                                    <Label htmlFor="date" value="Choose the date" />
                                </div>
                                <input
                                    type="date"
                                    name="date"
                                    value={newNoticeDetails.date}
                                    onChange={(e) => onChangeValues(e)}
                                    className="w-full rounded-md bg-gray-50 border-gray-300"
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            {!isUpdate ? (
                                <Button color="success" onClick={submitDetails}>
                                    Add Notice
                                </Button>
                            ) : (
                                <Button color="info" onClick={updateNoticeDetails}>
                                    Update Notice
                                </Button>
                            )}
                            <Button color="failure" onClick={resetDetails}>
                                Remove
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className="w-full px-6 py-8">
                        {allNotices.length > 0 && allNotices ? (
                            <Timeline>
                                {allNotices.map((item) => {
                                    const { _id, title, description, link, date } = item;
                                    return (
                                        <Timeline.Item key={_id}>
                                            <Timeline.Point icon={HiCalendar} className="bg-red-400" />
                                            <Timeline.Content className={"bg-white rounded-lg border shadow-lg p-4 ms-4 relative"}>
                                                <div className="absolute -left-0 -top-3 triangle"></div>
                                                <Timeline.Time className="text-paragraph font-medium">
                                                    {date}
                                                </Timeline.Time>
                                                <Timeline.Title className="text-title">
                                                    {title}
                                                </Timeline.Title>
                                                <Timeline.Body className="text-subtitle">
                                                    {description}
                                                </Timeline.Body>
                                                <div className="flex items-center">
                                                    <a href={link} target="_blank">
                                                        <button className="button me-3">
                                                            View file
                                                        </button>
                                                    </a>
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => updateDetails(item)}
                                                    >
                                                        <FaEdit size={20} className="text-green-400" />
                                                    </div>
                                                    <div className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => deleteNotice(item)}
                                                    >
                                                        <MdDelete size={20} className="text-red-400" />
                                                    </div>
                                                </div>
                                            </Timeline.Content>
                                        </Timeline.Item>
                                    );
                                })}
                            </Timeline>
                        ) : (
                            <h1 className="not_found">Sorry there is not notice present</h1>
                        )}
                    </div>
                </>
            )}
        </Layout>
    );
}

export default Notice;
