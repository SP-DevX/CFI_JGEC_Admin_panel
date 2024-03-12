import { FaGear } from "react-icons/fa6";
import { GrAnnounce, GrCertificate } from "react-icons/gr";
import { HiOutlineTrophy } from "react-icons/hi2";
import { IoNotificationsCircleOutline } from "react-icons/io5";

export const DashboardItems = [
    {
        name: "Notices",
        path: "/notice",
        icon: <GrAnnounce size={20} />,
        color: "bg-[#B01CE3]"
    },
    {
        name: "events",
        path: "/events",
        icon: <HiOutlineTrophy size={20} />,
        color: "bg-[#EE11BF]",
    },
    {
        name: "projects",
        path: "/projects",
        icon: <FaGear size={20} />,
        color: "bg-[#2FB0D0]"
    },
    {
        name: "certificates",
        path: "/certificate",
        icon: <GrCertificate size={20} />,
        color: "bg-[#2CD34C]"
    },
    {
        name: "Alerts",
        path: "/alert",
        icon: <IoNotificationsCircleOutline size={20} />,
        color: "bg-[#F1220E]"
    },
]