import {
    FaNotesMedical,
    FaUserMd,
    FaUserNurse,
    FaProcedures,
    FaPrescriptionBottleAlt,
    FaHospital,
    FaCalendarAlt,
    FaFileMedical,
    FaFileMedicalAlt,
    FaList,
    FaCalendarPlus,
    FaCalendarCheck,
    FaCalendarWeek,
    FaCalendarTimes,
    FaUsers,
    FaStethoscope,
    FaPills,
    FaVrCardboard,
    FaUser,
    FaUserPlus,
    FaChartLine,
    FaCalendarDay,
    FaUserCog,
    FaUserShield,
} from "react-icons/fa";
import {
    BiArchive,
    BiChart,
    BiFootball,
    BiSolidGroup,
    BiUserCheck,
    BiUserPin,
} from "react-icons/bi";
import { IoMdMedkit, IoIosMedkit, IoIosBasket } from "react-icons/io";
import { RiShoppingBasket2Line, RiInputCursorMove } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { BsBox, BsCalendar2Month, BsGrid } from "react-icons/bs";
import { MdAccountTree, MdAttachMoney, MdBallot, MdPlaylistAddCheck, MdSearch, MdSupervisorAccount } from "react-icons/md";

export const AdminResources = [
    {
        path: "dashboard",
        icon: BsGrid,
        metrics: [
            {
                name: "Users",
                units: [
                    {
                        title: "administrators",
                        path: "administrators",
                        icon: BiSolidGroup,
                        dataSource: "https://refs-29ss.onrender.com/users/count?role=administrator",
                        dataType: "count",
                        color: "orange",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                    {
                        title: "Referees",
                        path: "referees",
                        icon: BiFootball,
                        dataSource: "https://refs-29ss.onrender.com/users/count?role=referee",
                        dataType: "count",
                        color: "green",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Patients");
                        },
                        show: true,
                    },
                    {
                        title: "Assessors",
                        path: "assessors",
                        icon: FaUserMd,
                        dataSource: "https://refs-29ss.onrender.com/users/count?role=assessor",
                        dataType: "count",
                        color: "purple",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                    {
                        title: "Allocation Officers",
                        path: "allocation-officers",
                        icon: FaUserMd,
                        dataSource:
                            "https://refs-29ss.onrender.com/users/count?role=allocationofficer",
                        dataType: "count",
                        color: "blue",
                        seeMore: true,
                        onClick: () => {
                            console.log("Clicked on Doctors");
                        },
                        show: true,
                    },
                    {
                        title: "Match Commissioners",
                        path: "match-commissioner",
                        icon: FaUserMd,
                        dataSource:
                            "https://refs-29ss.onrender.com/users/count?role=matchcommissioner",
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
        path: "Add_New_User",
        type: "wizard",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: FaUserPlus,
        menu: { name: "Users", icon: FaUsers },
        steps: [
            {
                title: "Enter First Name",
                fields: [
                    {
                        name: "firstName",
                        type: "text",
                        placeholder: "First Name",
                    },
                ],
            },
            {
                title: "Enter Last Name",
                fields: [
                    {
                        name: "lastName",
                        type: "text",
                        placeholder: "Last Name",
                    },
                ],
            },
            {
                title: "Choose Username",
                fields: [
                    {
                        name: "username",
                        type: "text",
                        placeholder: "Username",
                    },
                ],
            },
            {
                title: "Enter Email",
                fields: [
                    {
                        name: "email",
                        type: "email",
                        placeholder: "Email",
                    },
                ],
            },
            {
                title: "Create Password",
                fields: [
                    {
                        name: "password",
                        type: "password",
                        placeholder: "Password",
                    },
                ],
            },
            {
                title: "Enter Date of Birth",
                fields: [
                    {
                        name: "dateOfBirth",
                        type: "date",
                        placeholder: "Date of Birth",
                    },
                ],
            },

            {
                title: "Select Role",
                fields: [
                    {
                        name: "role",
                        type: "selectAlt",
                        placeholder: "Select Role",
                        data: [
                            "administrator",
                            "assessor",
                            "matchcommissioner",
                            "allocationofficer",
                            "referee",
                        ], // Provide role options
                    },
                ],
            },
            {
                title: "Enter profile Image link",
                fields: [
                    {
                        name: "Image",
                        type: "url",
                        placeholder: "image url",
                    },
                ],
            },
        ],
        successMessage: "success!",
        successPath: "all users",
    },
    {
        path: "all users",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: FaUserShield,
        sidePanel: false,
        type: "crudGrid",

        view: true,

        delete: true,

        menu: { name: "Users", icon: FaUsers },
        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },
    {
        path: "administrators",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: FaUser,
        sidePanel: false,
        type: "crud",

        view: true,


        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "administrator",
        menu: { name: "Users", icon: FaUsers },
        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },
    {
        path: "referees",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: BiFootball,
        sidePanel: false,
        type: "crud",

        view: true,

        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "referee",
        menu: { name: "Users", icon: FaUsers },

        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },
    {
        path: "assessors",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: MdSearch,
        sidePanel: false,
        type: "crud",

        view: true,


        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "assessor",
        menu: { name: "Users", icon: FaUsers },

        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },


    {
        path: "allocation-officers",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: MdPlaylistAddCheck,
        sidePanel: false,
        type: "crud",

        view: true,


        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "allocationofficer",
        menu: { name: "Users", icon: FaUsers },

        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },

    {
        path: "match-commissioner",
        dataSource: "https://refs-29ss.onrender.com/users",
        icon: MdSupervisorAccount,
        sidePanel: false,
        type: "crud",

        view: true,


        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "matchcommissioner",
        menu: { name: "Users", icon: FaUsers },

        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "username", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },

    {
        path: "profile",
        dataSource: "https://refs-29ss.onrender.com/users",

        icon: FaUserCog,
        sidePanel: false,
        type: "singleton",
        queryField: "_id",
        queryValue: localStorage.getItem("id"),

        schema: [
            { name: "Image", title: "Image", type: "file" },
            { name: "username", title: "Username", type: "text" },
            { name: "email", title: "Email", type: "text" },
            { name: "firstName", title: "First Name", type: "text" },
            { name: "lastName", title: "Last Name", type: "text" },
            { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
        ],
    },
];
