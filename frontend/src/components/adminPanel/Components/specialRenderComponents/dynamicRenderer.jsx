import React, { useState, useEffect } from "react";

import {
    CheckBoxInput,
    ColorInput,
    DateInput,
    DateTimeInput,
    EmailInput,
    FileInput,
    NumberInput,
    PasswordInput,
    RadioInput,
    RangeInput,
    RichText,
    SelectInput,
    TelephoneInput,
    TextAreaInput,
    TextInput,
    TimeInput,
    UrlInput,
} from "./inputComponents";

const DynamicRenderer = ({ schema, data, action, onDataFromGrandchild, title }) => {
    const [updateMode, setUpdateMode] = useState(false);
    const [formData, setFormData] = useState(data || {});



    const sendDataToParent = (mydata) => {
        onDataFromGrandchild({ mydata, action });
    };

    useEffect(() => {
        setFormData(data || {});
        console.log(data);
        console.log(formData)
    }, [data]);

    const handleInputChange = (e, fieldName) => {
        const value = e.target.value;
        setFormData({ ...formData, [fieldName]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        sendDataToParent(formData);
    };

    return (
        <>
            {formData['name'] ? <div>
                <h1>{title}</h1>
                <form onSubmit={handleSubmit}>
                    {schema.map((field) => {
                        const { name, title, type } = field;
                        switch (type) {
                            case "text":
                                return (
                                    <TextInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );
                            case "number":
                                return (
                                    <NumberInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "date":
                                return (
                                    <DateInput
                                        {...{
                                            name,
                                            title,
                                            handleInputChange,
                                            formData,
                                        }}
                                    />
                                );
                            case "datetime":
                                return (
                                    <DateTimeInput
                                        {...{
                                            name,
                                            title,
                                            handleInputChange,
                                            formData,
                                        }}
                                    />
                                );

                            case "time":
                                return (
                                    <TimeInput
                                        {...{
                                            name,
                                            title,
                                            handleInputChange,
                                            formData,
                                        }}
                                    />
                                );

                            case "radio":
                                return (
                                    <RadioInput
                                        {...{
                                            name,
                                            title,
                                            field,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "checkbox":
                                return (
                                    <CheckBoxInput
                                        {...{
                                            name,
                                            title,
                                            field,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "textarea":
                                return (
                                    <TextAreaInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );
                            case "richtextarea":
                                return (
                                    <RichText
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );
                            case "select":
                                return (
                                    <SelectInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                            field,
                                        }}
                                    />
                                );

                            case "email":
                                return (
                                    <EmailInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "password":
                                return (
                                    <PasswordInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "url":
                                return (
                                    <UrlInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "file":
                                return (
                                    <FileInput
                                        {...{
                                            setUpdateMode,
                                            updateMode,
                                            name,
                                            title,
                                            handleInputChange,
                                            formData,
                                        }}
                                    />
                                );

                            case "color":
                                return (
                                    <ColorInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            case "range":
                                return <RangeInput {...{ name, title, handleInputChange }} />;

                            case "tel":
                                return (
                                    <TelephoneInput
                                        {...{
                                            name,
                                            title,
                                            formData,
                                            handleInputChange,
                                        }}
                                    />
                                );

                            default:
                                return null;
                        }
                    })}

                    <button type="submit" style={{ visibility: 'hidden' }}>Submit</button>
                </form>
            </div> :
                <h5>Select a Item to show</h5>
            }
        </>
    );
};

export default DynamicRenderer;
