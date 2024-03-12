"use client"

import { FaCircleUser } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import LogIn from "./auth/LogInPage";
import Register from "./auth/Register";
import { useAppSelector } from "@/redux/Store";
import Profile from "./auth/Profile";

function TopBar() {
    const { token } = useAppSelector(state => state.user);
    const [openProfile, setOpenProfile] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    return (
        <div className="fixed top-0 z-50 w-[80%] h-20 bg-topBg px-10 flex justify-end items-center shadow-xl">
            {
                !token ?
                    <div className="flex gap-x-6">
                        <div className="button w-24" onClick={() => setOpenModal(true)}>Log in</div>
                        <div className="button bg-transparent border-2 border-btnBg text-gray-600 w-24" onClick={() => setOpenRegister(true)}>Register</div>
                    </div>
                    :
                    <div className="flex text-2xl text-subtitle">
                        <IoNotifications className="cursor-pointer mx-2" />
                        <MdEmail className="cursor-pointer mx-2" />
                        <FaCircleUser className="cursor-pointer mx-2" onClick={()=>setOpenProfile(true)} />
                    </div>
            }
            <LogIn closeModal={(value: boolean) => setOpenModal(value)} openModal={openModal} />
            <Register closeModal={(value: boolean) => setOpenRegister(value)} openModal={openRegister} />
            <Profile closeModal={(value: boolean) => setOpenProfile(value)} openModal={openProfile} />
        </div>
    )
}

export default TopBar