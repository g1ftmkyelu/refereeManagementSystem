import {
    FaUserMd,
    FaUsers,
    FaUser,
    FaUserPlus,
    FaChartLine,
    FaUserCog,
    FaUserShield,
    FaFolderPlus,
    FaGolfBall,
    FaFootballBall,
    FaCogs,
    FaDumbbell,
} from "react-icons/fa";
import {

    BiFootball,
    BiSolidGroup,

} from "react-icons/bi";
import {  RiLockPasswordFill } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { BsBookmarkDash, BsBox, BsCalendar2Month, BsGraphUp, BsGrid } from "react-icons/bs";
import { MdAccountTree, MdAttachMoney, MdBallot, MdPlaylistAddCheck, MdSearch, MdSupervisorAccount } from "react-icons/md";
import CrudGrid from '../../Components/crudComponents/crudGrid';

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
                title: "Enter fullname",
                fields: [
                    {
                        name: "fullname",
                        type: "text",
                        placeholder: "fullname",
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
                title: "Enter profile Image link (optional)",
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
            { name: "fullname", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
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
            { name: "fullname", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
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
        edit:true,
        delete: true,
        fetchDataByQuery: true,
        queryField: "role",
        queryValue: "referee",
        menu: { name: "Users", icon: FaUsers },
        hasInjectible: true,
        InjectibleResourceQueryField:"refereeName",
        InjectibleResources: [

            {
                path: "training sessions list",
                dataSource: "https://refs-29ss.onrender.com/training-sessions",
                icon: FaDumbbell,
                sidePanel: false,
                edit: true,
                delete: true,
                type: "crud",
                menu: { name: "fitness", icon: FaDumbbell },
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
        ],
        schema: [
            { name: "Image", title: "Image", type: "profile picture", type: "file" },
            { name: "fullname", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
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
            { name: "fullname", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
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
            { name: "fullname", title: "User Name", type: "text" },
            { name: "email", title: "Email", type: "text" },
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
                title: "Enter match title",
                fields: [
                    {
                        name: "matchTitle",
                        type: "text",
                        placeholder: "enter match title"

                    },
                ]
            },
            {
                title: "Select Home Team",
                fields: [
                    {
                        name: "homeTeam",
                        type: "select",
                        dataSource: "https://refs-29ss.onrender.com/teams",
                        displayKey: "name"
                    },
                ]
            },
            {
                title: "Select Away Team",
                fields: [
                    {
                        name: "awayTeam",
                        type: "select",
                        dataSource: "https://refs-29ss.onrender.com/teams",
                        displayKey: "name"
                    },
                ]
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
                title: "Select Referee",
                fields: [
                    {
                        name: "referee",
                        type: "select",
                        dataSource: "https://refs-29ss.onrender.com/users?role=referee",
                        displayKey: "fullname"
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

        ],
        successMessage: "success!",
        successPath: "all matches",
    },


















    {
        path: "all matches",
        dataSource: "https://refs-29ss.onrender.com/matches",
        icon: FaGolfBall,
        sidePanel: false,
        type: "crud",
        edit: true,
        view: true,
        delete: true,
        hasInjectible: true,
        InjectibleResourceQueryField: "matchTitle",
        InjectibleResources: [{
            path: "match report",
            dataSource: "https://refs-29ss.onrender.com/match-reports/6562b90798b40bdeca9f4002",
            type: "matchreport",
            addResource: true,
            icon: BsGraphUp,
            add: true,
            edit: true,
            view: true,
            delete: true,
            schema: [
                { name: "homeTeamGoals", title: "home team goals", type: "number" },
                { name: "awayTeamGoals", title: "away team goals", type: "number" },
                { name: "homeTeamPossession", title: "home team possession", type: "number" },
                { name: "awayTeamPossession", title: "away team possession", type: "number" },
                { name: "homeTeamShots", title: "home team shots", type: "number" },
                { name: "awayTeamShots", title: "away team shots", type: "number" },
                { name: "homeTeamFouls", title: "home team fouls", type: "number" },
                { name: "awayTeamFouls", title: "away team fouls", type: "number" },
                { name: "homeTeamCorners", title: "away team corners", type: "number" },
                { name: "awayTeamCorners", title: "away team corners", type: "number" },
                { name: "homeTeamOffsides", title: "home team offsides", type: "number" },
                { name: "awayTeamOffsides", title: "away team offsides", type: "number" },
                {
                    name: "weatherConditions", title: "weather conditions", type: "select", options: [
                        { label: "Rainy", value: "Rainy" },
                        { label: "Cloudy", value: "Cloudy" },
                        { label: "Cold", value: "Cold" },
                        { label: "Hot", value: "Hot" },]
                },

                { name: "notableEvents", title: "notable events", type: "tags" },
                { name: "durationMinutes", title: "duration minutes", type: "number" },
                { name: "summary", title: "match summary", type: "richtextarea" },
            ]


        },
        {
            path: "match complaints",
            dataSource: "https://refs-29ss.onrender.com/complaints?matchTitle=6562b90798b40bdeca9f4002",
            type: "matchcomplaint",
            addResource: true,
            InjectibleResourceQueryField: "matchTitle",
            icon: BsBookmarkDash,
        },
        ],
        menu: { name: "Match Management", icon: FaFootballBall },
        schema: [
            { name: "id", type: "id", title: "" },
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
        ],
    },

















    {
        path: "profile",
        dataSource: "https://refs-29ss.onrender.com/user",
        icon: FaUserCog,
        sidePanel: false,
        type: "singleton",
        menu: { name: "Settings", icon: FaCogs },
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
        menu: { name: "Settings", icon: FaCogs },
        schema: [

            { name: "cpassword", title: "enter current password", type: "password" },
            { name: "newpassword", title: "new password", type: "password" },
            { name: "confirmnewpass", title: "confirm new password", type: "password" },
        ],
    },
];
