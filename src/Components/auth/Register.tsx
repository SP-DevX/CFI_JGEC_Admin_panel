"use client"

import { Button, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios'
import { Form, Formik } from 'formik';
import InputField from '../common/InputField';
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Yup from 'yup'
import { UserType, props } from '@/type';
import { message } from "antd"
import Image from 'next/image';
import Logo from "@/assets/logo_dark.png"

const Register: React.FC<props> = ({ openModal, closeModal }) => {
    const [loading, setLoading] = useState(false);

    const registerReq = async (loginDetails: UserType) => {
        setLoading(true);
        const { data } = await axios.post("/api/auth/register", loginDetails);
        try {
            closeModal(false)
            message.success(data.message);
        } catch (error) {
            message.success(data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const validate = Yup.object({
        email: Yup.string().email("please enter a valid email").required("email is required"),
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and min 6 characters"
        ).required("password is required")
    })

    return (
        <>
            <Modal show={openModal} size="lg" popup onClose={() => closeModal(false)} >
                <Modal.Header>
                    <div className='flex p-4 items-center'>
                        <Image src={Logo} alt="cfi" className='w-12 h-12 object-contain me-4' />
                        <h1 className='font-semibold text-gray-700 text-3xl'>CFI Admin Portal</h1>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ?
                            <div className='flex justify-center items-center'>
                                <Spinner color="success" aria-label="Success spinner example" />
                            </div> :
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-600">Sign in to our platform</h3>
                                <Formik
                                    initialValues={{
                                        name: "",
                                        email: "",
                                        password: ""
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values) => registerReq(values)}
                                >
                                    {(formik) => (
                                        <Form>
                                            <InputField name='name' label='Your name' placeholder="John Deol" icon={MdPerson} />
                                            <InputField name='email' label='Your Email' placeholder="name@gmail.com" icon={MdEmail} />
                                            <InputField name='password' type="password" label='Your Password' placeholder="******" icon={RiLockPasswordFill} />
                                            <a href="#" className="text-sm text-end text-blue-500 hover:underline">
                                                forget Password?
                                            </a>
                                            <div className='flex gap-x-4 my-4'>
                                                <Button color='success' type='submit'> Log in </Button>
                                                <Button color='failure' type='reset'>Reset all </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Register
