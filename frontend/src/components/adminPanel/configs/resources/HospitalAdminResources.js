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
} from "react-icons/fa";
import { BiArchive, BiChart, BiSolidGroup, BiUserCheck, BiUserPin } from "react-icons/bi";
import { IoMdMedkit, IoIosMedkit, IoIosBasket } from "react-icons/io";
import { RiShoppingBasket2Line, RiInputCursorMove } from "react-icons/ri";
import { FiFileText } from "react-icons/fi";
import { BsBox, BsCalendar2Month, BsGrid } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";

export const HospitalAdminResources = [
  {
    path: "dashboard",
    icon: BsGrid,
    metrics: [
      {
        name: "Users",
        units: [
          {
            title: "admin",
            path: "users",
            icon: BiSolidGroup,
            dataSource: "https://refs-29ss.onrender.com/users/count?role=admin",
            dataType: "count",
            color: "orange",
            seeMore: true,
            onClick: () => {
              console.log("Clicked on Doctors");
            },
            redirectLink: "/doctors",
            show: true,
          },
          {
            title: "Doctors",
            path: "doctors",
            icon: FaUserMd,
            dataSource: "https://refs-29ss.onrender.com/users/count?role=doctor",
            dataType: "count",
            color: "blue",
            seeMore: true,
            onClick: () => {
              console.log("Clicked on Doctors");
            },
            redirectLink: "/doctors",
            show: true,
          },
          {
            title: "Patients",
            path: "patients",
            icon: BiUserPin,
            dataSource: "https://refs-29ss.onrender.com/users/count?role=patient",
            dataType: "count",
            color: "green",
            seeMore: true,
            onClick: () => {
              console.log("Clicked on Patients");
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
    steps:[
       {      title: "Enter First Name",
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
      title: "Activate account",
      fields: [
        {
          name: "active",
          type: "selectAlt",
          label: "Activate Account?",
          data: [true, false],
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
          data: ["admin", "patient", "doctor", "inventory manager"], // Provide role options
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
    }],
    successMessage: "Your Appointment has been Booked successfully!",
    successPath: "all users",
  },
  {
    path: "all users",
    dataSource: "https://refs-29ss.onrender.com/users",
    icon: FaUserNurse,
    sidePanel: false,
    type: "crud",
    add: true,
    view: true,

    update: true,
    delete: true,

    menu: { name: "Users", icon: FaUsers },
    schema: [
      { name: "username", title: "User Name", type: "text" },
      { name: "email", title: "Email", type: "text" },
      { name: "firstName", title: "First Name", type: "text" },
      { name: "lastName", title: "Last Name", type: "text" },
      { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
    ],
  },
  {
    path: "patients",
    dataSource: "https://refs-29ss.onrender.com/users",
    icon: FaFileMedical,
    sidePanel: false,
    type: "crud",
    add: true,
    view: true,

    update: true,
    delete: true,
    fetchDataByQuery: true,
    queryField: "role",
    queryValue: "patient",
    menu: { name: "Users", icon: FaUsers },
    schema: [
      { name: "username", title: "User Name", type: "text" },
      { name: "email", title: "Email", type: "text" },
      { name: "firstName", title: "First Name", type: "text" },
      { name: "lastName", title: "Last Name", type: "text" },
      { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
    ],
  },

  {
    path: "doctors",
    dataSource: "https://refs-29ss.onrender.com/users",
    icon: FaStethoscope,
    sidePanel: false,
    type: "crud",
    add: true,
    view: true,

    update: true,
    delete: true,
    fetchDataByQuery: true,
    queryField: "role",
    queryValue: "doctor",
    menu: { name: "Users", icon: FaUsers },

    schema: [
      { name: "username", title: "User Name", type: "text" },
      { name: "email", title: "Email", type: "text" },
      { name: "firstName", title: "First Name", type: "text" },
      { name: "lastName", title: "Last Name", type: "text" },
      { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
    ],
  },




  {
    path: "medications",
    dataSource: "https://refs-29ss.onrender.com/medications",
    icon: IoMdMedkit,
    sidePanel: false,
    type: "crud",
    add: true,
    view: true,
    edit: true,
    update: true,
    delete: true,
    menu: { name: "resources", icon: FaList },
    schema: [
      { name: "name", title: "Medication Name", type: "text" },
      { name: "dosage", title: "Dosage", type: "text" },
    ],
  },
  {
    path: "generic",
    dataSource: "https://refs-29ss.onrender.com/services",
    icon: BiChart,
    sidePanel: false,
    type: "report",
    kind:"general",
    menu: { name: "Reports", icon: FaChartLine },
  },
  {
    path: "weekly",
    dataSource: "https://refs-29ss.onrender.com/services",
    icon: FaCalendarWeek,
    sidePanel: false,
    type: "report",
    kind:"weekly",
    menu: { name: "Reports", icon: FaChartLine },
  },
  {
    path: "monthly",
    dataSource: "https://refs-29ss.onrender.com/services",
    icon: BsCalendar2Month,
    sidePanel: false,
    type: "report",
    kind:"monthly",
    menu: { name: "Reports", icon: FaChartLine },
  },
  {
    path: "annual",
    dataSource: "https://refs-29ss.onrender.com/services",
    icon: FaCalendarDay,
    sidePanel: false,
    type: "report",
    kind:"annual",
    menu: { name: "Reports", icon: FaChartLine },
  },
  {
    path: "profile",
    dataSource: "https://refs-29ss.onrender.com/users",
   
    icon: FaUser,
    sidePanel: false,
    type: "singleton",
    queryField: "_id",
    queryValue: localStorage.getItem("id"),

    schema: [
      { name: "image", title: "Image", type: "file" },
      { name: "username", title: "Username", type: "text" },
      { name: "email", title: "Email", type: "text" },
      { name: "firstName", title: "First Name", type: "text" },
      { name: "lastName", title: "Last Name", type: "text" },
      { name: "dateOfBirth", title: "Date Of Birth", type: "date" },
    ],
  },
];
