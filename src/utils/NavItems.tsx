import { MdSpaceDashboard } from "react-icons/md";
import { GrAnnounce } from "react-icons/gr";
import { PiUsersThreeFill } from "react-icons/pi";
import { FaGear } from "react-icons/fa6";
import { HiOutlineTrophy } from "react-icons/hi2";
import { PiMicrosoftTeamsLogoDuotone } from "react-icons/pi";
import { GrCertificate } from "react-icons/gr";
import { IoNotificationsCircleOutline } from "react-icons/io5";


interface ListItemsType {
    name: string,
    link: string,
    icon: React.ReactNode,
}

export const ListItems: ListItemsType[] = [
    {
        name: "dashboard",
        link: "/",
        icon: <MdSpaceDashboard size={20} />,
    },
    {
        name: "Notice",
        link: "/notice",
        icon: <GrAnnounce size={20} />,
    },
    {
        name: "events",
        link: "/events",
        icon: <HiOutlineTrophy size={20} />,
    },
    {
        name: "alumni",
        link: "/alumni",
        icon: <PiUsersThreeFill size={20} />,
    },
    {
        name: "teams",
        link: "/team",
        icon: <PiMicrosoftTeamsLogoDuotone size={20} />,
    },
    {
        name: "projects",
        link: "/projects",
        icon: <FaGear size={20} />,
    },
    {
        name: "certificates",
        link: "/certificate",
        icon: <GrCertificate size={20} />,
    },
    {
        name: "Alerts",
        link: "/alert",
        icon: <IoNotificationsCircleOutline size={20} />,
    },
];