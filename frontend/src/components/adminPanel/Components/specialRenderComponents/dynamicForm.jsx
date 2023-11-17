import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import moment from 'moment';
import { RiImageAddFill, RiEdit2Fill } from 'react-icons/ri'; // Import the desired React Icons


const DynamicForm = ({ schema, data, action, onDataFromGrandchild, title }) => {
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
                        const { name, title, type } = field;
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
                                        {/* Your form fields */}
                                        <div key={name} className="flex flex-col w-full items-center mb-4">
                                            <label className="form-label text-xl font-bold mb-2" htmlFor={name}>
                                                {title}
                                            </label>
                                            {updateMode ? (
                                                <div className="mt-2 w-full">
                                                    <label className='form-label' htmlFor={name}>{title}</label><br></br>
                                                    <input
                                                        type="url"
                                                        id={name}
                                                        name={name}
                                                        placeholder='paste image url here...'
                                                        onChange={(e) => handleInputChange(e, name)}
                                                        className={'p-3 m5 bg-gray-300 rounded-md w-full'}
                                                        required
                                                    />
                                                </div>
                                            ) : (
                                                <div className="mt-2">
                                                    <img
                                                        src={formData[name] || 'https://www.unfe.org/wp-content/uploads/2019/04/SM-placeholder-1024x512.png'}
                                                        alt={title}
                                                        className="w-72 h-72 rounded-md"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                        <label
                                            className="form-label cursor-pointer self-start mb-2 ml-2 flex items-center p-3 bg-blue-500 font-bold text-white"
                                            onClick={() => setUpdateMode(!updateMode)}
                                        >
                                            {updateMode ? (
                                                <>
                                                    <RiImageAddFill className="mr-2" />
                                                    <span>Display Image</span>
                                                </>
                                            ) : (
                                                <>
                                                    <RiEdit2Fill className="mr-2" />
                                                    <span>Update</span>
                                                </>
                                            )}
                                        </label>
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
