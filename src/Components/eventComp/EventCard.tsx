import { EventsItemsType } from '@/type'
import { Button } from 'flowbite-react';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface PropsType {
    props: EventsItemsType,
    deleteEvent: CallableFunction;
    updateEvent: CallableFunction;
}


const EventCard: React.FC<PropsType> = ({ props, deleteEvent, updateEvent }) => {
    const { _id, photo, shortName, description } = props;
    return (
        <div key={shortName} className='w-full h-[24rem] bg-white shadow-lg border rounded-lg overflow-hidden'>
            {/* @ts-ignore */}
            <Image src={photo} alt='card img' width={200} height={400} className='w-full h-[12rem] object-cover' />
            <div className='px-6 py-4 flex flex-col justify-center items-center'>
                <h1 className='font-semibold text-title text-xl uppercase'>{shortName}</h1>
                <p className='text-sm text-center py-3 text-paragraph '>{description.slice(0, 100)}...</p>
                <div className='flex space-x-3'>
                    <Link href={`/events/${_id}`}>
                        <Button color='info'>View</Button>
                    </Link>
                    <Button color='success' onClick={() => updateEvent(props)}>Edit</Button>
                    <Button color='failure' onClick={() => deleteEvent(props)}>Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default EventCard
