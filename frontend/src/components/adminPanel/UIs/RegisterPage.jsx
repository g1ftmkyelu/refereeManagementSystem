import React from 'react';
import DynamicWizard from '../Components/specialRenderComponents/MyDynamicWizard';
import { FaUser, FaUserPlus } from 'react-icons/fa';

const config=  {
    path: "Add_New_User",
    type: "wizard",
    dataSource: "https://refs-29ss.onrender.com/register",
    icon: FaUserPlus,
    menu: { name: "Users", icon: FaUser },
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
            type: "url",
            placeholder: "image url",
          },
        ],
      },
    ],
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
