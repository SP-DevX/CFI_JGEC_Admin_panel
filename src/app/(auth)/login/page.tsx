"use client";

import { useState } from "react";
import axios from "axios";
import { Form, Formik } from "formik";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as Yup from "yup"; 
import { toast } from "react-hot-toast";
import { useAppDispatch } from "@/redux/Store";
import { LoginUser } from "@/redux/slices/User"; 
import Link from "next/link";
import InputField from "@/Components/common/InputField";
import { useRouter } from "next/navigation";
import CommonLayout from "@/Components/auth/CommonLayout";
import Loader from "@/app/loading";

const LogIn: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const LoginAdmin = async (loginDetails: loginUserType) => {
        setLoading(true);
        try {
            const { data } = await axios.post("/api/auth/login", loginDetails);
            const { user }:any = data;
            dispatch(LoginUser({ user }));
            router.push("/");
            toast.success(data.message);
        } catch (error) {
            // @ts-ignore
            const errMsg = error?.response?.data?.message;
            toast.error(errMsg);
        } finally {
            setLoading(false);
        }
    };

    const validate = Yup.object({
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

    if(loading)return <Loader/>

    return (
        <>
            <CommonLayout>
                <div className="w-1/2 max-w-md bg-white p-8 rounded-2xl shadow-lg border">
                    <div className="space-y-4">
                        <h3 className="text-xl font-medium text-gray-600">
                            Welcome Back!
                        </h3>
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                            }}
                            validationSchema={validate}
                            onSubmit={(values) => LoginAdmin(values)}
                        >
                            {(formik) => (
                                <Form>
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
                                        placeholder="********"
                                        icon={RiLockPasswordFill}
                                    />
                                    <Link
                                        href="/forget"
                                        className="text-sm text-end text-blue-500 hover:underline"
                                    >
                                        Forget Password?
                                    </Link>
                                    <div className="my-4">
                                        <button
                                            className="button  bg-green-500 me-6"
                                            type="submit"
                                        >
                                            Log in{" "}
                                        </button>
                                        <button className="button bg-red-500" type="reset">
                                            Reset{" "}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <div className="flex text-sm spce-x-2">
                            Didn&apos;t register yet?
                            <Link href={"/register"} className="text-blue-500 ms-2">
                                Register
                            </Link>
                        </div>
                    </div>
                </div>
            </CommonLayout>
        </>
    );
};

export default LogIn;
