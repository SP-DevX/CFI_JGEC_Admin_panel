"use client"

import { Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios'
import { Form, Formik } from 'formik';
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Yup from 'yup'
import { UserType } from '@/type';
import { message } from 'antd';
import { useAppDispatch } from '@/redux/Store';
import { LoginUser } from '@/redux/slices/User';
import Logo from "@/assets/logo_dark.png"
import Image from 'next/image';
import Link from 'next/link';
import InputField from '@/Components/common/InputField';
import { useRouter } from 'next/navigation';

const LogIn: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const LoginAdmin = async (loginDetails: UserType) => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/auth/login", loginDetails);
            const { user } = data;
            dispatch(LoginUser({ user }))
            message.success(data.message);
            router.push('/');
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            message.error(errMsg);
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
            <Modal show={true} size="lg" >
                <Modal.Header>
                    <div className='flex p-4 items-center'>
                        <Image src={Logo} alt="cfi" className='w-12 h-12 object-contain me-4' />
                        <h1 className='font-semibold text-gray-700 text-3xl'>CFI Admin Portal</h1>
                    </div>
                </Modal.Header>
                <Modal.Body className='min-h-48 h-auto'>
                    {
                        loading ?
                            <div className='w-full min-h-48 h-full flex justify-center items-center'>
                                <Spinner color="success" aria-label="Success spinner example" />
                            </div> :
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-600">Sign in to our platform</h3>
                                <Formik
                                    initialValues={{
                                        email: "",
                                        password: ""
                                    }}
                                    validationSchema={validate}
                                    onSubmit={(values) => LoginAdmin(values)}
                                >
                                    {(formik) => (
                                        <Form>
                                            <InputField name='email' label='Your Email' placeholder="name@gmail.com" icon={MdEmail} />
                                            <InputField name='password' type="password" label='Your Password' placeholder="******" icon={RiLockPasswordFill} />
                                            <Link href="/forget" className="text-sm text-end text-blue-500 hover:underline">
                                                Forget Password?
                                            </Link>
                                            <div className='my-4'>
                                                <button className='button  bg-green-500 me-6' type='submit'>  Log in </button>
                                                <button className='button bg-red-500' type='reset'>Reset </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div className='flex text-sm spce-x-2'>Didn&apos;t register yet?
                                    <Link href={'/register'} className='text-blue-500 ms-2'>Register</Link>
                                </div>
                            </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default LogIn