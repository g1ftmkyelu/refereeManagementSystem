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

export const MatchCommisonerResources = [
    {
        path: "dashboard",
        icon: BsGrid,
        metrics: [
            {
                name: "metrics",
                units: [
                    {
                        title: "scheduled matches",
                        path: "scheduled matches",
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
                        title: "Live matches",
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
                        title: "Completed matches",
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
                        title: "Cancelled matches",
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
                        type: "url",
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
        path: "scheduled matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Scheduled",
        icon: FaCalendarPlus,
        sidePanel: false,
        type: "crud",
        view: true,
        edit: true,
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
        path: "live matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Live",
        icon: FaPlayCircle,
        sidePanel: false,
        type: "crud",
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
        path: "completed matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Completed",
        icon: FaRegCalendarAlt,
        sidePanel: false,
        type: "crud",
        view: true,
        edit: true,
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
        path: "cancelled matches",
        dataSource: "https://refs-29ss.onrender.com/matches?status=Cancelled",
        icon: FaRegTimesCircle,
        sidePanel: false,
        type: "crud",
        view: true,
        edit: true,
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
