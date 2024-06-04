"use client";

import { Avatar, Button, FileInput, Modal, Spinner } from "flowbite-react";
import { useCallback, useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { MdEmail, MdPerson } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Yup from "yup";
import { toast } from "react-hot-toast";
import Link from "next/link";
import InputField from "@/Components/common/InputField";
import { useRouter } from "next/navigation";
import CommonLayout from "@/Components/auth/CommonLayout";
import Loader from "@/app/loading";
import { useAppDispatch } from "@/redux/Store";
import { registerUser } from "@/redux/slices/User";
import ImageCropUpload from "@/Components/common/CroppedImage";

const Register: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch(); 
    const [photoUrl, setPhotoUrl] = useState("");

    const handleUploadComplete = (downloadURL: string) => {
        setPhotoUrl(downloadURL);
    };

    const registerReq = async (userDetails: registerUserType) => {
        setLoading(true);
        try {
            userDetails.photo = photoUrl;
            // dispatch(registerUser(userDetails)); 
            const { data } = await axios.post("/api/auth/register", userDetails);
            toast.success(data.message);
            router.push("/email-verification");
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const validate = Yup.object({
        name: Yup.string().required("name is required"),
        email: Yup.string()
            .email("please enter a valid email")
            .required("email is required"),
        password: Yup.string()
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character and min 6 characters"
            )
            .required("password is required"),
    });

    if (loading) return <Loader />;

    return (
        <>
            <CommonLayout>
                <div className="w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-lg border">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-600">
                            Register in our platform
                        </h3>
                        <Formik
                            initialValues={{
                                photo: "",
                                name: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={validate}
                            onSubmit={(values: registerUserType) => registerReq(values)}
                        >
                            {(formik) => (
                                <Form className="z-10">
                                    <div className="flex items-center space-x-6">
                                        <Avatar img={photoUrl} rounded size={"lg"} />
                                        <ImageCropUpload
                                            onUploadComplete={handleUploadComplete}
                                            aspect={1 / 1}
                                            fileType="users"
                                        />
                                    </div>
                                    <InputField
                                        name="name"
                                        label="Your name"
                                        placeholder="John Deol"
                                        icon={MdPerson}
                                    />
                                    <InputField
                                        name="email"
                                        label="Your Email"
                                        placeholder="name@gmail.com"
                                        icon={MdEmail}
                                    />
                                    <InputField
                                        name="password"
                                        type="password"
                                        label="Your Password"
                                        placeholder="******"
                                        icon={RiLockPasswordFill}
                                    />
                                    <div className="my-4 flex items-center">
                                        <Button
                                            disabled={photoUrl === ""}
                                            className="button  bg-green-500 me-6"
                                            type="submit"
                                        >
                                            Register
                                        </Button>
                                        <Button
                                            className="button bg-red-500 hover:bg-red-500"
                                            type="reset"
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="flex text-sm spce-x-2">
                            Already have an account?
                            <Link href={"/login"} className="text-blue-500 ms-2">
                                Log in
                            </Link>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </>
    );
};

export default Register;
