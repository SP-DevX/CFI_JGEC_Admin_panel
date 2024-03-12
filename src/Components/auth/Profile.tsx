import { useAppDispatch, useAppSelector } from '@/redux/Store'
import { LogOutUser } from '@/redux/slices/User'
import { props } from '@/type'
import { Modal } from 'flowbite-react'
import React from 'react'
import { MdLogout } from 'react-icons/md'

const Profile: React.FC<props> = ({ openModal, closeModal }) => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.user);
    return (
        <div>
            {user && <Modal show={openModal} size="lg" popup onClose={() => closeModal(false)}>
                <Modal.Header className='px-4 py-2'>
                    My Profile
                </Modal.Header>
                <Modal.Body>
                    <div className='py-4 px-6 font-semibold text-title space-y-2'>
                        <h1 >UserId: <span className='text-subtitle ms-2'>{user._id}</span></h1>
                        <h1>Name: <span className='text-subtitle ms-2'>{user.name}</span></h1>
                        <h1>Email: <span className='text-subtitle ms-2'>{user.email}</span></h1>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div
                        onClick={() => (dispatch(LogOutUser()), closeModal(false))}
                        className='flex items-center gap-x-2 text-red-500 cursor-pointer font-medium'>
                        <MdLogout size={20} />
                        Logout
                    </div>
                </Modal.Footer>
            </Modal>}
        </div>
    )
}

export default Profile
