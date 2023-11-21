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
} from "react-icons/fa";
import {

    BiCheckDouble,
    BiPlayCircle,
    BiSolidGroup,
    BiTimer,
} from "react-icons/bi";
import { IoMdFootball } from "react-icons/io";
import { BsGrid } from "react-icons/bs";

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
        path: "Live matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Live",
        icon: FaPlayCircle,
        sidePanel: false,
        type: "crudGrid",
        displayComponent:"GridCard1",
  
        view: true,
      

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
        path: "upcoming matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Scheduled",
        icon: FaCalendarPlus,
        sidePanel: false,
        type: "crudGrid",
        displayComponent:"GridCard1",
        view: true,


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
        path: "completed matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Completed",
        icon: FaRegCalendarAlt,
        sidePanel: false,
        type: "crudGrid",
        displayComponent:"GridCard1",
        view: true,


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
        path: "cancelled matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Cancelled",
        icon: FaRegTimesCircle,
        sidePanel: false,
        type: "crudGrid",
        displayComponent:"GridCard1",
        view: true,

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
