"use client"
import { RegisterUserType } from '@/type'
import axios from 'axios'
import { Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { FaUserEdit } from 'react-icons/fa'
import { MdDelete, MdPending } from 'react-icons/md'
import Loader from './common/Loader'
import Image from 'next/image'
import { Badge, message } from 'antd'

const AllUser: React.FC = () => {
    const [users, setUsers] = useState<RegisterUserType[]>([]);
    const [loading, setLoading] = useState(false);
    const getUsers = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/auth/alluser`);
            setUsers(data.allUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    const removeUsers = async (email: string) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/api/auth/alluser/remove`, { email });
            message.success(data.message);
            setUsers(data.allUsers);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <section className='my-8'>
            <h1 className='text-gray-800 font-medium mb-3'>Current Registered Users</h1>
            {
                loading ? <Loader /> :
                    <Table hoverable >
                        <Table.Head>
                            <Table.HeadCell>SL No.</Table.HeadCell>
                            <Table.HeadCell>Name</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Verify</Table.HeadCell>
                            <Table.HeadCell>Type</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            {/* <Table.HeadCell>Can do</Table.HeadCell> */}
                            <Table.HeadCell>Action</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {
                                users.map((item, i) => (
                                    <Table.Row key={i}>
                                        <Table.Cell>{i + 1}</Table.Cell>
                                        <Table.Cell className='flex items-center gap-x-2 text-gray-700'>
                                            <Image src={item.photo} alt='user photo' width={40} height={40} className='min-w-8 w-8 h-8 rounded-full object-cover' />
                                            {item.name}
                                        </Table.Cell>
                                        <Table.Cell>{item.email}</Table.Cell>
                                        <Table.Cell
                                            className={item.isVerify ? "text-green-500" : "text-red-500"}>
                                            {item.isVerify ? `Verified` : `Not Verified`}
                                        </Table.Cell>
                                        <Table.Cell
                                            className={"text-green-500 font-semibold"}>
                                            {item.isAdmin ? `admin` : `user`}
                                        </Table.Cell>
                                        <Table.Cell className='text-sm font-semibold text-green-500'>
                                            online
                                        </Table.Cell>
                                        {/* <Table.Cell>{item.canRead ? `read & write` : `read only`}</Table.Cell> */}
                                        <Table.Cell>
                                            <div className="flex text-xl items-center">
                                                <div
                                                    className=" cursor-pointer text-green-500 hover:bg-gray-200 p-2 rounded-full "
                                                >
                                                    <FaUserEdit />
                                                </div>
                                                <div
                                                    className="cursor-pointer text-red-500 hover:bg-gray-200 p-2 rounded-full "
                                                    onClick={() => removeUsers(item.email)}
                                                >
                                                    <MdDelete />
                                                </div>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                ))
                            }
                        </Table.Body>
                    </Table>
            }
        </section>
    )
}

export default AllUser 
