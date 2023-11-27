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
import { FileInput } from './inputComponents';

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
  const [validationErrors, setValidationErrors] = useState({});

  // Function to validate fields
  const validateFields = () => {
    let fieldErrors = {};

    stepFields.forEach((field) => {
      // Check if the field is required and empty
      if (!formData[field.name] && field.required) {
        fieldErrors[field.name] = `${field.name} is required`;
      } else {
        delete fieldErrors[field.name]; // Clear validation error if field is filled
      }
    });

    setValidationErrors(fieldErrors);
  };

  const handleBlur = () => {
    validateFields();
  };


  const handleNext = () => {

    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    setStepFields(steps[nextStep].fields);

  };

  const handlePrevious = () => {
    const prevStep = currentStep - 1;
    setCurrentStep(prevStep);
    setStepFields(steps[prevStep].fields);
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
          <h1 className='text-3xl font-extrabold mb-12'>{rdata.path}</h1>
          <Stepper
            steps={steps.map((step) => ({ title: step.title }))}
            activeStep={currentStep}
            circleTop={0}
            size={35}
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
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <SelectFieldAlt
                    title={field.name}
                    value={formData[field.name]}
                    onChange={(value) => handleChange(field.name, value)}
                    data={field.data}
                  /></div>
              ) : field.type === 'select' ? (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <SelectField
                    key={field.name}
                    title={steps[currentStep].title}
                    value={formData[field.name]}
                    onChange={(value) => handleChange(field.name, value)}
                    dataSource={field.dataSource}
                    displayKey={field.displayKey}
                  /></div>
              ) : field.type === 'apiselect' ? (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <ApiSelect
                    key={field.name}
                    title={steps[currentStep].title}
                    value={formData[field.name]}
                    onChange={(value) => handleChange(field.name, value)}
                    displayModeKey={field.displaykey}
                    dataSource={field.dataSource}
                  />
                </div>
              ) : field.type === 'textarea' ? (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <textarea
                    key={field.name}
                    placeholder={field.placeholder || ''}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    onBlur={handleBlur}
                    required
                    className="border border-gray-300 p-3 w-full rounded-md mb-4"
                  />
                </div>
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

              ) : field.type === 'w-range' ? (
                <div key={field.name} className="mb-6">
                  <label className="block text-sm font-bold mb-1" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <output className='font-bold text-xl'>{formData[field.name]}/10</output> {/* Display selected value */}
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="block w-full h-5 rounded-full bg-gray-300 appearance-none cursor-pointer mt-2"
                    style={{ outline: 'none' }}
                  />
                </div>


              ) : field.type === 'image' ? (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <FileInput
                    fieldName={field.name}
                    formData={formData}
                    setFormData={setFormData}
                  />
                </div>

              ) : (
                <div key={field.name}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <input
                    key={field.name}
                    type={field.type || 'text'}
                    placeholder={field.placeholder || ''}
                    value={formData[field.name]}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    className="border border-gray-300 p-3 w-full rounded-md mb-4"
                    onBlur={handleBlur}
                    required
                  />
                </div>
              )
            )}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <button onClick={handlePrevious} className="bg-gray-400 text-white px-6 py-3 rounded-md mr-4">
                  Previous
                </button>
              )}
              {currentStep < steps.length - 1 ? (
                // Disable "Next" button if there are validation errors in the current step
                <button
                  onClick={handleNext}
                  className="bg-blue-500 text-white px-6 py-3 rounded-md"
                  disabled={Object.keys(validationErrors).length > 0}
                >
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
