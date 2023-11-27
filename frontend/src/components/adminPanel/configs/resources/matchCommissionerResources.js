import {
    FaUserCog,
    FaTimesCircle,
    FaFootballBall,
    FaCalendarPlus,
    FaRegCalendarAlt,
    FaPlayCircle,
    FaRegTimesCircle,
    FaCogs,
    FaChartLine,

} from "react-icons/fa";
import {

    BiCheckDouble,
    BiPlayCircle,
    BiTimer,
} from "react-icons/bi";
import { IoMdFootball } from "react-icons/io";
import { BsGrid } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";

export const MatchCommisonerResources = [
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
        path: "Add match report",
        type: "wizard",
        dataSource: "https://refs-29ss.onrender.com/match-reports",
        InjectibleResourceQueryField: "matchTitle",
        icon: FaChartLine,
        menu: { name: "Match Management", icon: FaFootballBall },
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
                title: "input match stats",
                fields: [
                    {
                        name: "homeTeamGoals",
                        type: "number",
                        placeholder: "enter home team goals"
                    },
                    {
                        name: "awayTeamGoals",
                        type: "number",
                        placeholder: "enter away team goals"
                    },
                    {
                        name: "homeTeamPossetion",
                        type: "number",
                        placeholder: "enter home team possession"
                    },
                    {
                        name: "awayTeamPossession",
                        type: "number",
                        placeholder: "enter away team possession"
                    },
                    {
                        name: "homeTeamShots",
                        type: "number",
                        placeholder: "enter home team shots"
                    },
                    {
                        name: "awayTeamShots",
                        type: "number",
                        placeholder: "enter away team shots"
                    },

                ]
            },
            {
                title: "input match stats(Continued)",
                fields: [
                    {
                        name: "homeTeamFouls",
                        type: "number",
                        placeholder: "enter home team fouls"
                    },
                    {
                        name: "awayTeamFouls",
                        type: "number",
                        placeholder: "enter away team fouls"
                    },
                    {
                        name: "homeTeamCorners",
                        type: "number",
                        placeholder: "enter home team corners"
                    },
                    {
                        name: "awayTeamCorners",
                        type: "number",
                        placeholder: "enter away team corners"
                    },
                    {
                        name: "homeTeamOffsides",
                        type: "number",
                        placeholder: "enter home team offsides"
                    },
                    {
                        name: "awayTeamOffsides",
                        type: "number",
                        placeholder: "enter away team offsides"
                    },

                ]
            },
            {
                title: "input match details",
                fields: [
                    {
                        name: "weatherConditions",
                        type: "selectAlt",
                        placeholder: "choose weather conditions",
                        data: [
                            "Rainy",
                            "Cloudy",
                            "Cold",
                            "Hot"],
                    },
                    {
                        name: "notableEvents",
                        type: "tags",
                        placeholder: "add notable events",
                    },
                    {
                        name: "summary",
                        type: "textarea",
                        placeholder: "add match summary",
                    },
                ],
            },

        ],
        successMessage: "success!",
        successPath: "all matches",
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
