import React, { useState, useEffect } from 'react';
import Stepper from 'react-stepper-horizontal';
import axios from 'axios';
import { useMutation, useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import SelectField from './inputComponents/SelectInput';
import SelectFieldAlt from './inputComponents/selectField';
import { MoonLoader } from "react-spinners";
import TagsInput from './inputComponents/TagsInput';
import ApiSelect from './inputComponents/apiSelect';

const DynamicWizard = ({ rdata }) => {

  const [tagData, setTagData] = useState({});
  const { steps, name, base } = rdata;
  const navigate = useNavigate()
  const initialFormData = steps.reduce((acc, step) => {
    step.fields.forEach((field) => {
      acc[field.name] = field.value || '';
    });
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [stepFields, setStepFields] = useState(steps[0].fields);
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };




  const currentStepFields = steps[currentStep].fields;

  const isValidStep = () => {
    const requiredFields = currentStepFields.filter(field => field.required);
    for (const field of requiredFields) {
      if (!formData[field.name]) {
        // You can display an error message here or handle it as needed
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: `Please fill in ${field.name}.`,
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (isValidStep()) {
      setCurrentStep(prevStep => prevStep + 1);
      setStepFields(steps[currentStep + 1].fields);
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => prevStep - 1);
    setStepFields(steps[currentStep - 1].fields);
  };




  // Define the mutation function
  const { mutate, isLoading } = useMutation((formData) => {
    const data = JSON.stringify(formData);
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: rdata.dataSource,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
      },
      data: data,
    };

    return axios.request(config); // Make the Axios request
  });

  const handleFinish = () => {
    // Handle submission logic here
    try {
      const formDataWithPatient = {
        ...formData,
        ...tagData

      };

      // Call the mutation function with the form data
      mutate(formDataWithPatient, {
        onSuccess: (data) => {
          console.log('Appointment created:', data);
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: rdata.successMessage,
          });
          // Handle success if needed
          navigate(`/${rdata.successPath}`)
        },
        onError: (error) => {
          console.error('Error :', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occured. Please try again.',
          });
          // Handle error if needed
        },
      });

    } catch (error) {
      console.log(error.message);
    }
  };



  return (


    <>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <MoonLoader color="#1400ff" />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto mt-12 p-8 bg-white rounded-md shadow-md">
          <Stepper
            steps={steps.map((step) => ({ title: step.title }))}
            activeStep={currentStep}
            circleTop={0}
            size={48}
            circleFontSize={20}
            titleFontSize={20}
            activeColor="#007BFF"
            completeColor="#28A745"
            defaultBarColor="#E0E0E0"
            completeBarColor="#E0E0E0"
          />
          <div className="mb-8 mt-4">
            <h2 className="text-2xl font-semibold mb-6">{`Step ${currentStep + 1}: ${steps[currentStep].title}`}</h2>
            {stepFields.map((field) =>
              field.type === 'selectAlt' ? (
                <SelectFieldAlt
                  title={field.name}
                  value={formData[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                  data={field.data}
                />
              ) : field.type === 'select' ? (
                <SelectField
                  key={field.name}
                  title={steps[currentStep].title}
                  value={formData[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                  dataSource={field.dataSource}
                />
              ) : field.type === 'apiselect' ? (
                <ApiSelect
                  key={field.name}
                  title={steps[currentStep].title}
                  value={formData[field.name]}
                  onChange={(value) => handleChange(field.name, value)}
                  displayModeKey={field.displaykey}
                  dataSource={field.dataSource}
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  key={field.name}
                  placeholder={field.placeholder || ''}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md mb-4"
                />
              ) : field.type === 'tags' ? (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <TagsInput
                    tags={tagData[field.name] || []} // Pass tags data as props
                    placeholder={`Add ${field.name.toLowerCase()}...`}
                    onUpdateTags={(tags) => setTagData({ ...tagData, [field.name]: tags })} // Handle tag updates
                  />
                </div>

              ) : (
                <input
                  key={field.name}
                  type={field.type || 'text'}
                  placeholder={field.placeholder || ''}
                  value={formData[field.name]}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  className="border border-gray-300 p-3 w-full rounded-md mb-4"
                />
              )
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button onClick={handlePrevious} className="bg-gray-400 text-white px-6 py-3 rounded-md mr-4">
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                <button onClick={handleNext} className="bg-blue-500 text-white px-6 py-3 rounded-md">
                  Next
                </button>
              ) : (
                <button onClick={handleFinish} className="bg-green-500 text-white px-6 py-3 rounded-md">
                  Finish
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );



};

export default DynamicWizard;
