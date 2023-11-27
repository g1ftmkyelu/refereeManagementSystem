import React, { useEffect, useState } from 'react';

const ViewData = ({ schema, data }) => {
    const [displayData, setDisplayData] = useState({});

    useEffect(() => {
        setDisplayData(data);
    }, [data]);

    const shouldHideField = (value) => typeof value === 'object';

    const renderField = (field) => {
        const { name, title, type } = field;
        const fieldValue = data[name];

        if (shouldHideField(fieldValue)) return null;

        const commonContent = (
            <div key={name} style={{ marginBottom: '10px' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{title}:</div>
            </div>
        );

        switch (type) {
            case 'range':
                return (
                    <>
                        {commonContent}
                        <div>{fieldValue}</div>
                    </>
                );
            case 'file':
                return (
                    <>
                        {commonContent}
                        {fieldValue ? (
                            <img src={fieldValue} alt={title} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                        ) : (
                            <div>No file available</div>
                        )}
                    </>
                );
            case 'tags':
                return (
                    <div key={name} className="mb-4">
                        {commonContent}
                        <div className="flex flex-wrap mt-2">
                            {fieldValue.map((tag, index) => (
                                <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'richtextarea':
                return (
                    <>
                        {commonContent}
                        <div dangerouslySetInnerHTML={{ __html: fieldValue }} />
                    </>
                );
            default:
                return (
                    <>
                        {commonContent}
                        <div>{fieldValue || 'N/A'}</div>
                    </>
                );
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', background: '#f9f9f9' }}>
            {schema.map(renderField)}
        </div>
    );
};

export default ViewData;
