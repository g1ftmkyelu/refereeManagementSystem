import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import TagsInput from './TagsInput';
import FileInput from './FileInput';
import DynamicCRUD from './NestedObjectInput';

const FormField = ({ fieldId, label, type, value, onChange, options, schema }) => {
    const handleInputChange = (e) => {
        onChange(fieldId, e.target.value);
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
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <input
                        type={type}
                        value={value}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 mb-3 w-full"
                    />
                </div>
            );

        case 'radio':
        case 'checkbox':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    {options.map((option) => (
                        <div key={option.value}>
                            <input type={type} value={option.value} onChange={handleInputChange} />
                            <label htmlFor={option.value}>{option.label}</label><br />
                        </div>
                    ))}
                </div>
            );

        case 'date':
        case 'datetime':
        case 'time':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <input type={type} value={value} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2 mt-1 mb-3 w-full" />
                </div>
            );

        case 'textarea':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <textarea value={value} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2 mt-1 mb-3 w-full" />
                </div>
            );

        case 'richtextarea':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <ReactQuill id={fieldId} name={fieldId} theme="snow" value={value} onChange={(value) => onChange(fieldId, value)} />
                </div>
            );

        case 'select':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <select value={value} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2 mt-1 mb-3 w-full">
                        <option value="">Select an option</option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                </div>
            );

        case 'tags':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <TagsInput tags={value || []} placeholder={`Add ${label.toLowerCase()}...`} onUpdateTags={(tags) => onChange(fieldId, tags)} />
                </div>
            );

        case 'file':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    <FileInput formData={value} fieldName={fieldId} setFormData={onChange} />
                </div>
            );

        case 'object':
            return (
                <div key={fieldId}>
                    <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
                    {Object.keys(schema.fields).map((nestedFieldKey) => {
                        const nestedField = schema.fields[nestedFieldKey];
                        const nestedFieldId = `${fieldId}.${nestedFieldKey}`;
                        return (
                            <div key={nestedFieldId}>
                                <label className="block text-gray-700 text-sm font-bold mb-2">{nestedField.label}</label>
                                <input
                                    type={nestedField.type}
                                    value={value[nestedFieldId] || ''}
                                    onChange={(e) => onChange(nestedFieldId, e.target.value)}
                                    className="border border-gray-300 rounded px-3 py-2 mt-1 mb-3 w-full"
                                />
                            </div>
                        );
                    })}
                </div>
            );


        default:
            return null;
    }
};

export default FormField;
