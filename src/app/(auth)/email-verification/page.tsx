"use client";

import React, { useEffect, useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";
import { useAppSelector } from "@/redux/Store";

const SendVerificationLink: React.FC = () => {
    const { tempUserDetails } = useAppSelector(state => state.user)
    const [status, setStatus] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendVerification = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post(`/auth/send-verification`);
            console.log(data);
            toast.success(data.message);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        sendVerification();
    }, [status]);

    // if (loading) return <Loader />; 

    return (
        <section className="w-full h-full  py-16 flex items-center justify-center">
            <div className="max-w-2xl mx-auto max-md:text-sm">
                <h1 className="header text-center">Please verify your email...</h1>
                <div className="relative w-[6rem] mx-auto">
                    <MdEmail className="text-[6rem] text-gray-300" />
                    <FaCheckCircle className="text-3xl text-pink_1 absolute top-1 right-0 bg-white rounded-full border-[3px] border-white" />
                </div>
                <p className="text-gray-600 text-center my-2">
                    Please verify your email address. We&apos;ve sent a confirmation email to:
                </p>
                <h4 className="text-center font-semibold my-2">{"abcd@gmail.com"}</h4>
                <p className="text-gray-600 text-center my-2">
                    Click the confirmation link in that email to begin using CFI.
                </p>
                <p className="text-gray-600 text-center my-2">
                    Didn&apos;t receive the email? Check your spam folder, it may have been
                    caught by a filter. If you still don&apos;t see it, you can{" "}
                    <span
                        className=" text-pink_1 font-medium cursor-pointer"
                        onClick={() => setStatus(!status)}
                    >
                        resend the confirmation email.
                    </span>
                </p>
                <p className="text-gray-600 text-center my-2">
                    Wrong email address?
                    <Link href={"/register"} className=" text-pink_1 font-medium ms-2">
                        Change it.
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SendVerificationLink;
