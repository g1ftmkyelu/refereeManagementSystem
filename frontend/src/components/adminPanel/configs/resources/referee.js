import {
    FaUserCog,
    FaTimesCircle,
    FaFolderPlus,
    FaFootballBall,
    FaGolfBall,
    FaCalendarPlus,
    FaRegCalendarAlt,
    FaPlayCircle,
    FaRegTimesCircle,
    FaDumbbell,
    FaChartArea,
    FaWeight,
    FaQuestion,
    FaPlusCircle,
    FaCogs,
} from "react-icons/fa";
import {

    BiCheckDouble,
    BiPlayCircle,
    BiSolidGroup,
    BiTimer,
} from "react-icons/bi";
import { IoMdFootball } from "react-icons/io";
import { BsBookmarkDash, BsGrid } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

export const refereeResources = [
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
        path: "matches",
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
            icon: FaChartArea,
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
        path: "Add match complaint",
        type: "wizard",
        dataSource: "https://refs-29ss.onrender.com/complaints",
        icon: FaPlusCircle,
        menu: { name: "Match Complaints", icon: FaQuestion },
        steps: [
            {
                title: "Select match",
                fields: [
                    {
                        name: "matchTitle",
                        type: "select",
                        dataSource: "https://refs-29ss.onrender.com/matches",
                        displayKey: "matchTitle"
                    },
                ]
            },

            {
                title: "Enter your name",
                fields: [
                    {
                        name: "reporter",
                        type: "text",
                        placeholder: "Enter your name"
                    },
                ]
            },


            {
                title: "Enter your complaint",
                fields: [

                    {
                        name: "title",
                        type: "text",
                        placeholder: "enter complaint title",
                    },
                    {
                        name: "complaint",
                        type: "textarea",
                        placeholder: "Enter complaint",
                    },
                ],
            },

        ],
        successMessage: "success!",
        successPath: "your match complaints",
    },
    {
        path: "your match complaints",
        dataSource: "https://refs-29ss.onrender.com/complaints",
        type: "crud",
        addResource: true,
        edit:true,
        delete:true,
        InjectibleResourceQueryField: "matchTitle",
        menu: { name: "Match Complaints", icon: FaQuestion },
        icon: BsBookmarkDash,
        schema: [
            { name: "matchTitle", title: "match title", type: "text" },
            { name: "title", title: "Title", type: "text" },
            { name: "complaint", title: "Complaint", type: "text" },
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
