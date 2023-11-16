import React from 'react';
import DynamicWizard from '../Components/specialRenderComponents/DynamicWizardAlt';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const config=  {
    path: "Add_New_User",
    type: "wizard",
    dataSource: "https://ehs-server.onrender.com/register",
    icon: FaUserPlus,
    menu: { name: "Users", icon: FaUser },
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
          type: "text",
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
    successMessage: "Registred successfully!",
    successPath: "login",
  }

const RegisterPage = () => {
    return (
        <div className='h-screen w-screen flex items-center justify-center bg-slate-200'>
            <DynamicWizard rdata={config}/>
        </div>
    );
}

export default RegisterPage;
