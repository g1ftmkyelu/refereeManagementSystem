import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import moment from 'moment';
import { RiImageAddFill, RiEdit2Fill } from 'react-icons/ri'; // Import the desired React Icons
import TagsInput from './inputComponents/TagsInput';
import FileInput from './inputComponents/FileInput';
import Crud from '../coreComponents/Crud';
import Injectible from '../utilityComponents/Injectible';
import { Fa500Px, FaArrowAltCircleDown } from 'react-icons/fa';
import NestedObjectInput from './inputComponents/NestedObjectInput';
import DynamicCRUD from './inputComponents/NestedObjectInput';

const DynamicForm = ({ schema, data, action, onDataFromGrandchild, title, rdata }) => {
    const [updateMode, setUpdateMode] = useState(false);
    const [formData, setFormData] = useState(data || {});

    const sendDataToParent = (mydata) => {
        onDataFromGrandchild({ mydata, action });
    };

    useEffect(() => {
        setFormData(data || {});
        console.log(data);
    }, [data]);

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleTagInputChange = (tags, fieldName) => {
        setFormData({ ...formData, [fieldName]: tags });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        sendDataToParent(formData)


    };


    return (
        <div className='flex-col shadow-xl p-10 bg-white mx-10 rounded-lg' >
            <h1 className='text-3xl font-extrabold'>{title}</h1>
            <div className=' flex items-center justify-center content-center '>
                <form className=' w-full' onSubmit={handleSubmit}>
                    {schema.map((field) => {
                        const { name, title, type, schema } = field;
                        switch (type) {
                            case 'text':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="text"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'number':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="number"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'date':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="date"
                                            id={name}
                                            name={name}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                            value={formData[name] ? moment(formData[name]).format('YYYY-MM-DD') : ''}
                                        />
                                    </div>
                                );
                            // Inside your DynamicForm component, for Date fields:
                            case 'datetime':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="datetime-local"
                                            id={name}
                                            name={name}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                            value={formData[name] ? formData[name].toLocaleString() : ''}
                                        />
                                    </div>
                                );
                            case 'time':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="time"
                                            id={name}
                                            name={name}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                            value={formData[name] ? formData[name].toLocaleString() : ''}
                                        />
                                    </div>
                                );
                            case 'radio':
                                return (
                                    <div key={name}>
                                        <label className='form-label'>{title}</label><br></br>
                                        {field.options.map((option) => (
                                            <div key={option.value}>
                                                <input
                                                    type="radio"
                                                    id={option.value}
                                                    name={name}
                                                    value={option.value}
                                                    onChange={(e) => handleInputChange(e, name)}
                                                    className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                                    required
                                                />
                                                <label className='form-label' htmlFor={option.value}>{option.label}</label><br></br>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'checkbox':
                                return (
                                    <div key={name}>
                                        <label className='form-label'>{title}</label><br></br>
                                        {field.options.map((option) => (
                                            <div key={option.value}>
                                                <input
                                                    type="checkbox"
                                                    id={option.value}
                                                    name={name}
                                                    value={option.value}
                                                    onChange={(e) => handleInputChange(e, name)}
                                                    className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                                    required
                                                />
                                                <label className='form-label' htmlFor={option.value}>{option.label}</label><br></br>
                                            </div>
                                        ))}
                                    </div>
                                );
                            case 'textarea':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <textarea
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'richtextarea':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <ReactQuill
                                            id={name}
                                            name={name}
                                            theme="snow"
                                            value={formData[name] || ''}
                                            onChange={(value) => handleInputChange(value, name)} // Use the modified function
                                        />
                                    </div>
                                );
                            case 'select':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <select
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        >
                                            <option value="">Select an option</option> {/* Use an empty string as the default value */}
                                            {field.options.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            case 'email':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="email"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'password':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="password"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'url':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="url"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'file':
                                return (
                                    // ...
                                    <div className="border p-4 rounded-md w-full shadow-md flex flex-col items-center">
                                        <FileInput
                                            formData={formData}
                                            fieldName={name}
                                            setFormData={setFormData}
                                        />
                                    </div>
                                );
                            case 'color':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="color"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'range':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="range"
                                            id={name}
                                            name={name}
                                            min="0"
                                            max="100"
                                            step="1"
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'tel':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                        <input
                                            type="tel"
                                            id={name}
                                            name={name}
                                            value={formData[name] || ''}
                                            onChange={(e) => handleInputChange(e, name)}
                                            className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                            required
                                        />
                                    </div>
                                );
                            case 'tags':
                                return (
                                    <div key={name}>
                                        <label className='form-label' htmlFor={name}>{title}</label><br />
                                        <TagsInput
                                            tags={formData[name] || []} // Pass current tags as prop
                                            placeholder={`Add ${title.toLowerCase()}...`}
                                            onUpdateTags={(tags) => handleTagInputChange(tags, name)} // Handle tag updates
                                        />
                                    </div>
                                );
                            // Existing import statements...

                            // Update the 'case' block for 'object' types in your DynamicForm component
                            case 'object':
                                return (
                                    <div key={name}>
                                        <Injectible
                                            schema={schema}
                                            data={formData[name] || {}} // Pass data to the DynamicCRUD component
                                            ButtonIcon={FaArrowAltCircleDown}
                                            buttonCaption={name}
                                            component={
                                                <DynamicCRUD
                                                    schema={schema} // Pass the schema for the nested object
                                                    nestedData={formData[name] || []} // Pass the data for the nested object
                                                    onSubmit={(updatedNestedData) =>
                                                        setFormData({
                                                            ...formData,
                                                            [name]: updatedNestedData, // Update the form data with the modified nested data
                                                        })
                                                    }
                                                />
                                            }
                                        />
                                    </div>
                                );

                            default:
                                return null;
                        }
                    })}
                    <AwesomeButton type="submit">submit</AwesomeButton>
                </form>
            </div>
        </div>
    );
};

export default DynamicForm;
