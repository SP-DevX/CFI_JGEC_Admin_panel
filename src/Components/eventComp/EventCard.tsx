import { EventsItemsType } from '@/type'
import { Button } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

interface PropsType {
    props: EventsItemsType,
    deleteEvent: CallableFunction;
    updateEvent: CallableFunction;
}


const EventCard: React.FC<PropsType> = ({ props, deleteEvent, updateEvent }) => {
    const { _id, photo, shortName, description } = props;
    return (
        <div key={shortName} className='w-full  min-h-60 bg-white shadow-md shadow-indigo-100 rounded-lg  p-4'>
            {/* @ts-ignore */}
            <Image src={photo} alt='card img' width={200} height={400} className='w-full h-auto   object-contain rounded-md' />
            <div className='pt-3'>
                <h1 className='font-medium text-lg text-center uppercase pb-3'>{shortName}</h1>
                <div className='flex items-center justify-center'>
                    <Link href={`/events/${_id}`}>
                        <button className='text-blue-500 me-3 w-20'>View</button>
                    </Link>
                    <div
                        className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                        onClick={() => updateEvent(props)}
                    >
                        <FaEdit size={18} />
                    </div>
                    <div
                        className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                        onClick={() => deleteEvent(props)}
                    >
                        <MdDelete size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard
