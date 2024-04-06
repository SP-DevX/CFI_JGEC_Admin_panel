"use client"

import React, { useEffect, useState } from 'react'
import Layout from '@/Components/common/CommonLayout';
import { Button, FileInput, Label, Modal } from "flowbite-react"
import { Form, Formik } from 'formik';
import InputField from '@/Components/common/InputField';
import SelectionField from '@/Components/common/SelectionField';
import Loader from '@/Components/common/Loader';
import { useParams } from 'next/navigation';
import { useAppSelector } from '@/redux/Store';
import { EventsItemsType } from '@/type';
import Image from 'next/image';

const ParticularEvent = () => {
    const { events } = useAppSelector(state => state.admin)
    const { id } = useParams();
    const [openModal, setOpenModal] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [eventDetails, setEventDetails] = useState<any>()
    const [loading, setLoading] = useState(false);
    const [eventResult, setEventResult] = useState({
        teamName: "",
        position: "",
    })

    const getEventDetails = async () => {
        const EventData = events.find((item: EventsItemsType) => item._id === id);
        setEventDetails(EventData);
    }

    useEffect(() => {
        getEventDetails();
    }, [])

    return (
        <Layout header='Event Details' >
            {
                loading ? <Loader /> :
                    <>
                        {eventDetails ?
                            <div className="pb-12">
                                <div className='w-full bg-white rounded-lg p-8 mt-4 border shadow-lg'>
                                    <Image src={eventDetails.photo} alt="event img"
                                        width={1000}
                                        height={500}
                                        className='mx-auto rounded-md'
                                    />
                                    <h1 className='text-center my-4 font-semibold text-gray-800 text-3xl capitalize'>{eventDetails.fullName}</h1>
                                    <p>{eventDetails.description}</p>
                                    <h1 className='text-2xl font-medium my-3'>Important Details :</h1>
                                    <div className='flex gap-x-20 mb-6'>
                                        <div className='opacity-75 font-medium'>
                                            <h3>Prizes-</h3>
                                            <p>1st prize - <span>5000/-</span></p>
                                            <p>2nd prize - <span>3000/-</span></p>
                                            <p>3rd prize - <span>1000/-</span></p>
                                        </div>
                                        <div className='opacity-75 font-medium'>
                                            <h2 >Date- {eventDetails.date}</h2>
                                            <h2 >Organizers - {eventDetails.organizer}</h2>
                                        </div>
                                    </div>
                                    <Button onClick={() => setOpenModal(true)}>Update Result</Button>
                                    <h1 className='my-4 font-semibold text-2xl text-center'>Results</h1>
                                    <div className='flex justify-around'>
                                        <div className='w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-yellow-300 my-2 font-medium text-gray-700' >
                                            <h1 className='font-semibold text-xl text-center mb-2'>Winner</h1>
                                            <h2>Team - Geronimo</h2>
                                            <h2>Team Members-</h2>
                                            <div className='ms-6'>
                                                <p>1. Swadesh pal</p>
                                                <p>2. Swadesh pal</p>
                                                <p>3. Swadesh pal</p>
                                                <p>4. Swadesh pal</p>
                                                <p>5. Swadesh pal</p>
                                            </div>
                                        </div>
                                        <div className='w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-[#cd7f32] my-2 font-medium text-gray-700' >
                                            <h1 className='font-semibold text-xl text-center mb-2'>Second Position</h1>
                                            <h2>Team - Geronimo</h2>
                                            <h2>Team Members-</h2>
                                            <div className='ms-6'>
                                                <p>1. Swadesh pal</p>
                                                <p>2. Swadesh pal</p>
                                                <p>3. Swadesh pal</p>
                                                <p>4. Swadesh pal</p>
                                                <p>5. Swadesh pal</p>
                                            </div>
                                        </div>
                                        <div className='w-[15rem] h-auto p-4 rounded-lg shadow-lg bg-zinc-300 my-2 font-medium text-gray-700' >
                                            <h1 className='font-semibold text-xl text-center mb-2'>Third Position</h1>
                                            <h2>Team - Geronimo</h2>
                                            <h2>Team Members-</h2>
                                            <div className='ms-6'>
                                                <p>1. Swadesh pal</p>
                                                <p>2. Swadesh pal</p>
                                                <p>3. Swadesh pal</p>
                                                <p>4. Swadesh pal</p>
                                                <p>5. Swadesh pal</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <h1 className='text-2xl font-semibold text-center text-white'>Sorry no data found</h1>
                        }
                        <Modal show={openModal} size={'lg'} popup onClose={() => setOpenModal(false)}>
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
                        </Modal>
                    </>
            }
        </Layout>
    )
}

export default ParticularEvent
