import {
    FaUserCog,
    FaTimesCircle,
    FaDumbbell,
    FaCog,
} from "react-icons/fa";
import {

    BiCheckDouble,
    BiPlayCircle,
    BiSolidGroup,
    BiTimer,
} from "react-icons/bi";
import { IoMdFootball } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

export const AssessorResources = [
    {
        path: "dashboard",
        icon: BsGrid,
        metrics: [
            {
                name: "metrics",
                units: [
                    {
                        title: "Live Matches",
                        path: "Live matches",
                        icon: BiPlayCircle,
                        dataSource: "https://refs-29ss.onrender.com/matches/count?status=Live",
                        dataType: "count",
                        color: "green",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Patients");
                        },
                        show: true,
                    },
                    {
                        title: "Upcoming Matches",
                        path: "upcoming matches",
                        icon: BiTimer,
                        dataSource: "https://refs-29ss.onrender.com/matches/count?status=Scheduled",
                        dataType: "count",
                        color: "orange",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },

                    {
                        title: "Completed Matches",
                        path: "completed matches",
                        icon: BiCheckDouble,
                        dataSource: "https://refs-29ss.onrender.com/matches/count?status=Completed",
                        dataType: "count",
                        color: "blue",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                    {
                        title: "Cancelled Matches",
                        path: "cancelled matches",
                        icon: FaTimesCircle,
                        dataSource:
                            "https://refs-29ss.onrender.com/matches/count?status=Cancelled",
                        dataType: "count",
                        color: "red",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                    {
                        title: "Teams",
                        path: "teams",
                        icon: IoMdFootball,
                        dataSource:
                            "https://refs-29ss.onrender.com/teams/count",
                        dataType: "count",
                        color: "gray",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                ],
            },
        ],
    },


    {
        path: "training reports",
        dataSource: "https://refs-29ss.onrender.com/training-sessions",
        icon: FaDumbbell,
        sidePanel: false,
        edit: true,
        delete: true,
        type: "crud",
        schema: [
            { name: "refereeName", title: "Referee Name", type: "text" },
            { name: "date", title: "Date", type: "date" },
            { name: "performance", title: "Perfomance", type: "number" },
            { name: "cardioFitness", title: "Cardio Fitness", type: "number" },
            { name: "strength", title: "Strength", type: "number" },
            { name: "flexibility", title: "flexibility", type: "number" },
            { name: "agility", title: "Agility", type: "number" },
            { name: "endurance", title: "Endurance", type: "number" },
            { name: "balance", title: "Balance", type: "number" },
            { name: "speed", title: "Speed", type: "number" },
            { name: "power", title: "Power", type: "number" },
            { name: "coordination", title: "Coordination", type: "number" },
            { name: "observation", title: "Observation", type: "richtextarea" }


        ],
    },

















    {
        path: "profile",
        dataSource: "https://refs-29ss.onrender.com/user",
        icon: FaUserCog,
        sidePanel: false,
        type: "singleton",
        menu: { name: "Settings", icon: FaCog },
        schema: [
            { name: "Image", title: "Image", type: "file" },
            { name: "fullname", title: "fullname", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },
    {
        path: "change password",
        dataSource: "https://refs-29ss.onrender.com/user",
        icon: RiLockPasswordFill,
        sidePanel: false,
        type: "singleton",
        menu: { name: "Settings", icon: FaCog },
        schema: [

            { name: "cpassword", title: "enter current password", type: "password" },
            { name: "newpassword", title: "new password", type: "password" },
            { name: "confirmnewpass", title: "confirm new password", type: "password" },
        ],
    },
];
