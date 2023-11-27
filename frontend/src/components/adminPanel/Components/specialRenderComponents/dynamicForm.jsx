import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import moment from 'moment';
import TagsInput from './inputComponents/TagsInput';
import FileInput from './inputComponents/FileInput';
import Injectible from '../utilityComponents/Injectible';
import { FaArrowAltCircleDown } from 'react-icons/fa';
import DynamicCRUD from './inputComponents/NestedObjectInput';
import ResourceRender from '../coreComponents/ResourceRender';

const DynamicForm = ({ schema, data, action, onDataFromGrandchild, title, rdata }) => {
    const [formData, setFormData] = useState(data || {});

    const sendDataToParent = (mydata) => {
        onDataFromGrandchild({ mydata, action });
    };

    useEffect(() => {
        setFormData(data || {});
    }, [data]);

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleTagInputChange = (tags, fieldName) => {
        setFormData({ ...formData, [fieldName]: tags });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendDataToParent(formData);
    };



    const renderInput = (field) => {
        const { name, title, type, schema, options } = field;
        const inputValue = formData[name] || '';

        const commonProps = {
            id: name,
            name: name,
            value: inputValue,
            onChange: (e) => handleInputChange(e, name),
            className: 'p-3 m5 bg-gray-300 rounded-md w-full',
            required: true,
        };



        switch (type) {
            case 'text':
            case 'number':
            case 'email':
            case 'password':
            case 'url':
            case 'color':
            case 'range':
            case 'tel':
                return (
                    <div key={name}>

                        <input type={type} {...commonProps} />
                    </div>
                );

            case 'radio':
            case 'checkbox':
                return (
                    <div key={name}>
                        <label className='form-label'>{title}</label><br />
                        {options.map((option) => (
                            <div key={option.value}>
                                <input type={type} value={option.value} {...commonProps} />
                                <label className='form-label' htmlFor={option.value}>{option.label}</label><br />
                            </div>
                        ))}
                    </div>
                );


            case 'date':
                return (
                    <div key={name}>

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

            case 'datetime':
                return (
                    <div key={name}>

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

            case 'textarea':
                return (
                    <div key={name}>

                        <textarea {...commonProps} />
                    </div>
                );
            case 'id':
                return (
                    <div key={name}>

                        <input type={'hidden'} {...commonProps} />
                    </div>
                );

            case 'richtextarea':
                return (
                    <div key={name}>

                        <ReactQuill id={name} name={name} theme="snow" value={inputValue} onChange={(value) => handleInputChange({ target: { value } }, name)} />
                    </div>
                );

            case 'select':
                return (
                    <div key={name}>

                        <select {...commonProps}>
                            <option value="">Select an option</option>
                            {field.options.map((option) => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                        </select>
                    </div>
                );

            case 'tags':
                return (
                    <div key={name}>

                        <TagsInput tags={inputValue || []} placeholder={`Add ${title.toLowerCase()}...`} onUpdateTags={(tags) => handleTagInputChange(tags, name)} />
                    </div>
                );

            case 'file':
                return (
                    <div key={name} className="border p-4 rounded-md w-full shadow-md flex flex-col items-center">
                        <FileInput formData={formData} fieldName={name} setFormData={setFormData} />
                    </div>
                );

            case 'object':
                return (
                    <div key={name}>
                        <Injectible
                            schema={schema}
                            data={formData[name] || {}}
                            ButtonIcon={FaArrowAltCircleDown}
                            buttonCaption={name}
                            component={
                                <DynamicCRUD
                                    schema={schema}
                                    nestedData={formData[name] || []}
                                    onSubmit={(updatedNestedData) =>
                                        setFormData({
                                            ...formData,
                                            [name]: updatedNestedData,
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
    };

    return (
        <div className='flex-col shadow-xl p-10 bg-white mx-10 rounded-lg'>
            <h1 className='text-3xl font-extrabold mb-8'>{title || rdata.path}</h1>
            <div className='flex flex-col items-center justify-center content-center'>
                <form className='w-full' onSubmit={handleSubmit}>
                    {schema.map((field) => (
                        <React.Fragment key={field.name}>
                            <label className='form-label'>{field.title}</label><br />
                            {renderInput(field)}
                        </React.Fragment>
                    ))}
                    <AwesomeButton type="submit">submit</AwesomeButton>
                </form>
                {rdata.hasInjectible &&
                    rdata.InjectibleResources.map((InjectibleResource, index) => (
                        <div key={index} className="mt-4">
                            <Injectible
                                ButtonIcon={InjectibleResource.icon}
                                buttonCaption={`View ${InjectibleResource.path}`}
                                component={<ResourceRender data={{ ...InjectibleResource, [rdata.InjectibleResourceQueryField]: formData[rdata.InjectibleResourceQueryField] }} />}
                                className="p-4 bg-gray-100 rounded-md shadow-md"
                            />
                        </div>
                    ))
                }
                
            </div>
        </div>
    );
};

export default DynamicForm;
