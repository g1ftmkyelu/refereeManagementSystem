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
    FaFolderPlus,
    FaGolfBall,
    FaFootballBall,
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
        dataSource: "https://refs-29ss.onrender.com/register",
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
                onClick: (e) => {
                    e.preventDefault()
                    console.log('onClick', 4)
                }
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
                title: "Upload User ProfileImage",
                fields: [
                    {
                        name: "Image",
                        type: "image",
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
        dataSource: "https://refs-29ss.onrender.com/users?role=administrator",
        icon: FaUser,
        sidePanel: false,
        type: "crudGrid",

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
        dataSource: "https://refs-29ss.onrender.com/users?role=referee",
        icon: BiFootball,
        sidePanel: false,
        type: "crudGrid",

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
        dataSource: "https://refs-29ss.onrender.com/users?role=assessor",
        icon: MdSearch,
        sidePanel: false,
        type: "crudGrid",

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
        dataSource: "https://refs-29ss.onrender.com/users?role=allocationofficer",
        icon: MdPlaylistAddCheck,
        sidePanel: false,
        type: "crudGrid",

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
        dataSource: "https://refs-29ss.onrender.com/users?role=matchcommissioner",
        icon: MdSupervisorAccount,
        sidePanel: false,
        type: "crudGrid",

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
        path: "Add new Team",
        type: "wizard",
        dataSource: "https://refs-29ss.onrender.com/teams",
        icon: FaFolderPlus,
        menu: { name: "Team management", icon: BiSolidGroup },
        steps: [
            {
                title: "Enter Team name",
                fields: [
                    {
                        name: "name",
                        type: "text",
                        placeholder: "enter team name",
                    },
                ],
            },
            {
                title: "Enter players",
                fields: [
                    {
                        name: "players",
                        type: "tags",
                        placeholder: "team players",
                    },
                ],
            },

            {
                title: "Team Coach",
                fields: [
                    {
                        name: "coach",
                        type: "text",
                        placeholder: "team coach",
                    },
                ],
            },

            {
                title: "Team Home Venue",
                fields: [
                    {
                        name: "homeVenue",
                        type: "text",
                        placeholder: "home Venue",
                    },
                ],
            },


            {
                title: "Enter Team Logo",
                fields: [
                    {
                        name: "logo",
                        type: "image",
                        placeholder: "paste team logo url here...",
                    },
                ],
            },
        ],
        successMessage: "team added successfully!",
        successPath: "teams",
    },
    {
        path: "match reports",
        dataSource: "https://refs-29ss.onrender.com/match-reports",
        icon: BiSolidGroup,
        sidePanel: false,
        type: "crud",
        add: true,
        view: true,
        edit: true,
        delete: true,
        schema: [
            { name: 'match', title: 'Match', type: 'text' },
            { name: 'summary', title: 'Summary', type: 'textarea' },
            {
                name: 'goals',
                title: 'Goals',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Goals', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Goals', type: 'number' },
                ],
            },
            {
                name: 'possession',
                title: 'Possession',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Possession', type: 'text' },
                    { name: 'awayTeam', title: 'Away Team Possession', type: 'text' },
                ],
            },
            {
                name: 'shots',
                title: 'Shots',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Shots', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Shots', type: 'number' },
                ],
            },
            {
                name: 'shotsOnTarget',
                title: 'Shots on Target',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Shots on Target', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Shots on Target', type: 'number' },
                ],
            },
            {
                name: 'fouls',
                title: 'Fouls',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Fouls', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Fouls', type: 'number' },
                ],
            },
            {
                name: 'corners',
                title: 'Corners',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Corners', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Corners', type: 'number' },
                ],
            },
            {
                name: 'offsides',
                title: 'Offsides',
                type: 'object',
                schema: [
                    { name: 'homeTeam', title: 'Home Team Offsides', type: 'number' },
                    { name: 'awayTeam', title: 'Away Team Offsides', type: 'number' },
                ],
            },

            { name: 'weatherConditions', title: 'Weather Conditions', type: 'text' },
            { name: 'notableEvents', title: 'Notable Events', type: 'tags', itemType: 'text' },
            { name: 'durationMinutes', title: 'Duration (Minutes)', type: 'number' },
            { name: 'venue', title: 'Venue', type: 'text' },
            {
                name: 'matchOfficials',
                title: 'Match Officials',
                type: 'object',
                schema: [
                    { name: 'role', title: 'Match Official Role', type: 'text' },
                    { name: 'official', title: 'Match Official', type: 'text' },
                ],
            },
            {
                name: 'injuries',
                title: 'Injuries',
                type: 'object',
                schema: [
                    { name: 'player', title: 'Injured Player', type: 'text' },
                    { name: 'description', title: 'Injury Description', type: 'text' },
                    { name: 'minute', title: 'Injury Minute', type: 'number' },
                ],
            },
            { name: 'complaints', title: 'Complaints', type: 'list', itemType: 'textarea' },
        ],
    },

    {
        path: "teams",
        dataSource: "https://refs-29ss.onrender.com/teams",
        icon: BiSolidGroup,
        sidePanel: false,
        type: "crudGrid",
        view: true,
        edit: true,
        delete: true,
        menu: { name: "Team management", icon: BiSolidGroup },
        schema: [
            { name: "logo", title: "Team Logo", type: "file" },
            { name: "name", title: "Team Name", type: "text" },
            { name: 'players', title: 'Players', type: 'tags' },
            { name: "coach", title: "team coach", type: "text" },
            { name: "homeVenue", title: "homeVenue", type: "text" },

        ],
    },

    {
        path: "Add new match",
        type: "wizard",
        dataSource: "https://refs-29ss.onrender.com/matches",
        icon: FaFolderPlus,
        menu: { name: "Match Management", icon: FaFootballBall },
        steps: [
            {
                title: "Select Home Team",
                fields: [
                    {
                        name: "homeTeam",
                        type: "apiselect",
                        displayKey: "name",
                        placeholder: "home team",
                        dataSource: "https://refs-29ss.onrender.com/teams?returnFields=name"
                    },
                ],
            },
            {
                title: "Select Away Team",
                fields: [
                    {
                        name: "awayTeam",
                        type: "apiselect",
                        displayKey: "name",
                        placeholder: "home team",
                        dataSource: "https://refs-29ss.onrender.com/teams?returnFields=name"
                    },
                ],
            },
            {
                title: "Select Match date",
                fields: [
                    {
                        name: "date",
                        type: "date",
                    },
                ],
            },

            {
                title: "Select Match Status",
                fields: [
                    {
                        name: "status",
                        type: "selectAlt",
                        placeholder: "Select Role",
                        data: [
                            "Scheduled",
                            "Live",
                            "Completed",
                            "Cancelled"],
                    },
                ],
            },
            {
                title: "Enter match venue",
                fields: [
                    {
                        name: "venue",
                        type: "text",
                        placeholder: "enter match venue",
                    },
                ],
            },
        ],
        successMessage: "success!",
        successPath: "all matches",
    },
    {
        path: "all matches",
        dataSource: "https://refs-29ss.onrender.com/matches",
        icon: FaGolfBall,
        sidePanel: false,
        type: "crudGrid",
        displayComponent: "GridCard1",
        add: true,
        edit: true,
        view: true,
        delete: true,

        menu: { name: "Match Management", icon: FaFootballBall },
        schema: [

            { name: "homeTeam", title: "Home Team", type: "text" },
            { name: "awayTeam", title: "Away Team", type: "text" },
            {
                name: "status", title: "Status", type: "select",
                options: [
                    { label: "Scheduled", value: "Scheduled" },
                    { label: "Live", value: "Live" },
                    { label: "Completed", value: "Completed" },
                    { label: "Cancelled", value: "Cencelled" }
                ]
            },
            { name: "venue", title: "Venue", type: "text" },
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
