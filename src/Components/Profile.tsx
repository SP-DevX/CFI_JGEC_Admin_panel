"use client"
import { useAppDispatch, useAppSelector } from '@/redux/Store'
import { LogOutUser } from '@/redux/slices/User'
import { props } from '@/type'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { Modal } from 'flowbite-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { MdLogout } from 'react-icons/md'
import Loader from './common/Loader'

const Profile: React.FC<props> = ({ openModal, closeModal }) => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter()
    const { user } = useAppSelector(state => state.user);
    const LogOut = async (email: string) => {
        try {
            setLoading(true);
            await axios.patch('/api/auth/logout', { email });
            dispatch(LogOutUser());
            closeModal(false);
            toast.success(`User logged out successfully`)
            router.push('/login');
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {
                loading ? <Loader /> : <>
                    {user && <Modal show={openModal} size="lg" popup onClose={() => closeModal(false)}>
                        <Modal.Header className='mx-4 my-2 text-center'>
                            My Profile
                        </Modal.Header>
                        <Modal.Body>
                            <div className='py-4 px-6 font-semibold text-title space-y-2'>
                                <Image src={user.photo} alt='photo' width={150} height={150} className='mb-3' />
                                <h1 >UserId: <span className='text-subtitle ms-2'>{user._id}</span></h1>
                                <h1>Name: <span className='text-subtitle ms-2'>{user.name}</span></h1>
                                <h1>Email: <span className='text-subtitle ms-2'>{user.email}</span></h1>
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <div
                                onClick={() => LogOut(user.email)}
                                className='flex items-center gap-x-2 text-red-500 cursor-pointer font-medium'>
                                <MdLogout size={20} />
                                Logout
                            </div>
                        </Modal.Footer>
                    </Modal>}
                </>
            }
        </>
    )
}

export default Profile
