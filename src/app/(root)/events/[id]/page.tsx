"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/Components/common/CommonLayout";
import { Badge, Button, Table } from "flowbite-react";
import { useParams } from "next/navigation"; 
import Image from "next/image";
import { useAsyncHandler } from "@/utils/asyncHandler";
import axios from "axios";
import { EventsItemsType } from "@/index";
import RegisterTeams from "@/utils/registerTeams.json"
import { MdCall, MdDelete, MdEmail } from "react-icons/md";
import { FaUserEdit } from "react-icons/fa";
const EventModal= dynamic(() => import('@/Components/modals/EventModal'), { ssr: false });
import dynamic from "next/dynamic";

const ParticularEvent = () => { 
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [photo, setPhoto] = useState<string>(""); 
    const [eventDetails, setEventDetails] = useState<EventsItemsType>(); 

    const resetData = () => {
        setIsUpdate(false);
        setOpenModal(false);
        setEventDetails(undefined);
    };

    const getEventDetails = useAsyncHandler(async () => {
        const { data } = await axios.get(`/api/events/${id}`);
        setEventDetails(data.event);
    });

    useEffect(() => {
        getEventDetails();
    }, [openModal]);

    const updateEvent = () => {
        setIsUpdate(true);
        setOpenModal(true);
        setPhoto(eventDetails?.photo as string);
    }

    return (
        <Layout header="Event Details">
            <EventModal
                openModal={openModal}
                closedModal={resetData}
                fields={eventDetails!}
                isUpdate={isUpdate}
                updatePhoto={(val: string) => setPhoto(val)}
                photo={photo}
            />
            {eventDetails ? (
                <div className="pb-12 react-quill">
                    <div className="w-full bg-white rounded-lg p-8 mt-4 border shadow-lg">
                        <Image
                            src={eventDetails.photo as string}
                            alt="event img"
                            width={1000}
                            height={500}
                            className="mx-auto rounded-md"
                        />
                        <h1 className="text-center mt-4 mb-8 font-semibold text-gray-800 text-3xl capitalize">
                            {eventDetails.fullName}
                        </h1>
                        <h3 className="text-xl font-semibold text-title mb-2">Event Description</h3>
                        <div dangerouslySetInnerHTML={{ __html: eventDetails.description }} />
                        <h3 className="text-xl font-semibold text-title mb-2 mt-8">Event Rules</h3>
                        {eventDetails.rules &&
                            <div dangerouslySetInnerHTML={{ __html: eventDetails.rules }} />
                        }

                        <h1 className="text-2xl font-medium my-3">Important Details :</h1>
                        <div className="grid grid-cols-3 gap-6 text-gray-700 mb-8">
                            <div>
                                <div className="mb-2.5">
                                    <h3 className="font-medium text-title mb-1">Registration starting Date:-</h3>
                                    <p>{eventDetails.reg_date_start}</p>
                                </div>
                                <div className="mb-2.5">
                                    <h3 className="font-medium text-title mb-1">Registration closing Date:-</h3>
                                    <p>{eventDetails.reg_date_end}</p>
                                </div>
                                <Badge color={'success'} className="w-14 text-center text-sm rounded-full">{'Open'}</Badge>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-x-2 capitalize">
                                    <h3 className="font-medium text-title mb-1">Venue:-</h3>
                                    <p>{eventDetails.venue}</p>
                                </div>
                                <div className="flex items-center gap-x-2 capitalize">
                                    <h3 className="font-medium text-title mb-1">Event Date:-</h3>
                                    <p>{eventDetails.date}</p>
                                </div>
                                <div className="flex items-center gap-x-2 capitalize" >
                                    <h3 className="font-medium text-title mb-1">Time Duration:-</h3>
                                    <p>{eventDetails.event_start_time}-{eventDetails.event_end_time}</p>
                                </div>
                            </div>
                            <div>
                                {eventDetails.prizes &&
                                    <div dangerouslySetInnerHTML={{ __html: eventDetails.prizes }} />
                                }
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <Button color={'success'}>Declare Result</Button>
                            <Button color={'purple'} onClick={updateEvent}>Edit Event Details</Button>
                        </div>
                    </div>
                    <div className="w-full bg-white rounded-lg py-8 mt-4 border shadow-lg">
                        <h1 className="text-center mb-8 font-semibold text-gray-700 text-3xl capitalize">
                            Registered Teams
                        </h1>
                        <div className="overflow-x-auto my-2  border">
                            <Table hoverable className="rounded-none">
                                <Table.Head className="bg-red-500">
                                    <Table.HeadCell className="text-sm p-2 ps-3">SL.</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Team Name</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Team Leader</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Contact Info</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Team Members</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Idea or Details</Table.HeadCell>
                                    <Table.HeadCell className="text-sm p-2">Actions</Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divnamee-y">
                                    {RegisterTeams
                                        .map((item, i) => {
                                            const {
                                                team_name,
                                                team_lead,
                                                team_lead_mobile,
                                                team_lead_email,
                                                team_photo,
                                                project_details,
                                                no_of_members
                                            } = item;
                                            return (
                                                <Table.Row key={i} className="bg-white">
                                                    <Table.Cell className="text-sm py-3 ps-3 pe-2">{i + 1}</Table.Cell>
                                                    <Table.Cell className="whitespace-nowrap capitalize text-gray-900 text-sm py-3 px-2">
                                                        {team_name}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm py-3 px-2">
                                                        {team_lead}
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm py-3 px-2">
                                                        <div className="flex items-center gap-x-3 mb-1">
                                                            <MdEmail />
                                                            {team_lead_email}
                                                        </div>
                                                        <div className="flex items-center gap-x-3">
                                                            <MdCall />
                                                            {team_lead_mobile}
                                                        </div>
                                                    </Table.Cell>
                                                    <Table.Cell className="text-sm py-3 px-2">
                                                        {no_of_members}
                                                    </Table.Cell>
                                                    {/* <Table.Cell className="text-sm py-3 px-2">
                                                        {project_details}
                                                    </Table.Cell> */}
                                                    <Table.Cell className="text-sm py-3 px-2">
                                                        <Badge className="rounded-full text-xs w-16" color={"warning"}>waiting</Badge>
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <div className="flex text-xl items-center">
                                                            <div
                                                                className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                            // onClick={() => openUpdate(item)}
                                                            >
                                                                <FaUserEdit />
                                                            </div>
                                                            <div
                                                                className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                            // onClick={() => removeMembersDetails(item)}
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
                    </div>
                </div>
            ) : (
                <h1 className="text-2xl font-semibold text-center text-gray-600 py-20">
                    Sorry no data found
                </h1>
            )}
            {/* <Modal show={openModal} size={'lg'} popup onClose={() => setOpenModal(false)}>
                <Modal.Header className='ps-6'>Update Event Results</Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={eventResult}
                        onSubmit={(values) => console.log(values)}
                    >
                        {(formik) => (
                            <Form>
                                <InputField name="teamName" placeholder="Team Name" label={"Team Name"} />
                                <SelectionField name="position" label="Choose the Position" data={['1st position', '2nd position', '3rd position']} />
                                <div className="mb-2">
                                    <div className="mb-1 block">
                                        <Label htmlFor="photo" value="Upload Team photo" />
                                    </div>
                                    <FileInput />
                                </div>
                                <div className="mb-1 block">
                                    <Label htmlFor="Team Members" value="Team Members Details" />
                                </div>
                                <InputField name="mem1" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <InputField name="mem2" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <InputField name="mem3" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <InputField name="mem4" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <InputField name="mem5" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <InputField name="mem6" placeholder="Name, Year, Dept. Ex- Rohit Dey, 3rd Year, IT" />
                                <div className='flex gap-4 my-3'>
                                    {
                                        isUpdate ? <Button color={'info'} type='submit'>Update Event</Button> :
                                            <><Button color={'success'} type='submit'>Add Event</Button>
                                                <Button color={'failure'} type='reset'>Reset</Button>
                                            </>
                                    }
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal> */}
        </Layout>
    );
};

export default ParticularEvent;


//   <h1 className="my-4 font-semibold text-2xl text-center">Results</h1>
//                         <div className="flex justify-around">
//                             <div className="w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-yellow-300 my-2 font-medium text-gray-700">
//                                 <h1 className="font-semibold text-xl text-center mb-2">
//                                     Winner
//                                 </h1>
//                                 <h2>Team - Geronimo</h2>
//                                 <h2>Team Members-</h2>
//                                 <div className="ms-6">
//                                     <p>1. Swadesh pal</p>
//                                     <p>2. Swadesh pal</p>
//                                     <p>3. Swadesh pal</p>
//                                     <p>4. Swadesh pal</p>
//                                     <p>5. Swadesh pal</p>
//                                 </div>
//                             </div>
//                             <div className="w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-[#cd7f32] my-2 font-medium text-gray-700">
//                                 <h1 className="font-semibold text-xl text-center mb-2">
//                                     Second Position
//                                 </h1>
//                                 <h2>Team - Geronimo</h2>
//                                 <h2>Team Members-</h2>
//                                 <div className="ms-6">
//                                     <p>1. Swadesh pal</p>
//                                     <p>2. Swadesh pal</p>
//                                     <p>3. Swadesh pal</p>
//                                     <p>4. Swadesh pal</p>
//                                     <p>5. Swadesh pal</p>
//                                 </div>
//                             </div>
//                             <div className="w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-zinc-300 my-2 font-medium text-gray-700">
//                                 <h1 className="font-semibold text-xl text-center mb-2">
//                                     Third Position
//                                 </h1>
//                                 <h2>Team - Geronimo</h2>
//                                 <h2>Team Members-</h2>
//                                 <div className="ms-6">
//                                     <p>1. Swadesh pal</p>
//                                     <p>2. Swadesh pal</p>
//                                     <p>3. Swadesh pal</p>
//                                     <p>4. Swadesh pal</p>
//                                     <p>5. Swadesh pal</p>
//                                 </div>
//                             </div>
//                         </div>