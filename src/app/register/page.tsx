"use client"

import { FileInput, Modal, Spinner } from 'flowbite-react';
import { useState } from 'react';
import axios from 'axios'
import { Form, Formik } from 'formik';
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Yup from 'yup'
import { UserType } from '@/type';
import { message } from "antd"
import Image from 'next/image';
import Logo from "@/assets/logo_dark.png"
import Link from 'next/link';
import InputField from '@/Components/common/InputField';
import { useRouter } from 'next/navigation';
import { fileToUrlLink } from '@/utils/data';

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [photo, setPhoto] = useState("");

    const uploadPhoto = async (e: any) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgUrl = await fileToUrlLink(imgFile, `users/`);
            if (imgUrl) {
                setPhoto(imgUrl);
                message.success("photo Upload");
            } else message.error("photo is not uploaded");
        } else message.error("Photo is not uploaded");
    };

    const registerReq = async (userDetails: UserType) => {
        setLoading(true);
        try {
            userDetails!.photo = photo;
            if(!userDetails!.photo)return message.error("photo is required");
            const { data } = await axios.post("/api/auth/register", userDetails)
            message.success(data.message);
            router.push("/login")
        } catch (error) { 
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            message.error(errMsg);
        } finally {
            setLoading(false);
        }
    }

    const validate = Yup.object({
        name: Yup.string().required("name is required"),
        email: Yup.string().email("please enter a valid email").required("email is required"),
        password: Yup.string().matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and min 6 characters"
        ).required("password is required")
    })

    return (
        <>
            <Modal show={true} size="lg" popup  >
                <Modal.Header>
                    <div className='flex p-4 items-center'>
                        <Image src={Logo} alt="cfi" className='w-12 h-12 object-contain me-4' />
                        <h1 className='font-semibold text-gray-700 text-3xl'>CFI Admin Portal</h1>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    {
                        loading ?
                            <div className='w-full min-h-48 h-full flex justify-center items-center'>
                                <Spinner color="success" aria-label="Success spinner example" />
                            </div> :
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium text-gray-600">Register in our platform</h3>
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
                                            <FileInput
                                                id="file"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={uploadPhoto}
                                            />
                                            <InputField name='name' label='Your name' placeholder="John Deol" icon={MdPerson} />
                                            <InputField name='email' label='Your Email' placeholder="name@gmail.com" icon={MdEmail} />
                                            <InputField name='password' type="password" label='Your Password' placeholder="******" icon={RiLockPasswordFill} />
                                            <div className='my-4'>
                                                <button className='button  bg-green-500 me-6' type='submit'> Register </button>
                                                <button className='button bg-red-500' type='reset'>Reset </button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                                <div className='flex text-sm spce-x-2'>Already have an account?
                                    <Link href={'/login'} className='text-blue-500 ms-2'>Log in</Link>
                                </div>
                            </div>
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Register
