import React, { useEffect, useState } from 'react';

const ViewData = ({ schema, data }) => {
    const [displayData, setDisplayData] = useState({});

    useEffect(() => {
        // Update the displayData whenever 'data' prop changes
        setDisplayData(data);
    }, [data]);
    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', background: '#f9f9f9' }}>
            {schema.map((field) => {
                const { name, title, type } = field;
                const fieldValue = data[name];

                switch (type) {
                    case 'range':
                        return (
                            <div key={name} style={{ marginBottom: '10px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{title}:</div>
                                <div>{fieldValue}</div>
                            </div>
                        );
                    case 'file':
                        return (
                            <div key={name} style={{ marginBottom: '10px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{title}:</div>
                                {fieldValue ? (
                                    <img src={fieldValue} alt={title} style={{ maxWidth: '100%', maxHeight: '200px' }} />
                                ) : (
                                    <div>No file available</div>
                                )}
                            </div>
                        );
                    case 'tags':
                        return (
                            <div key={name} className="mb-4">
                                <div className="font-bold text-lg">{title}:</div>
                                <div className="flex flex-wrap mt-2">
                                    {fieldValue.map((tag, index) => (
                                        <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded-md mr-2 mb-2">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        );

                    default:
                        return (
                            <div key={name} style={{ marginBottom: '10px' }}>
                                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{title}:</div>
                                <div>{fieldValue || 'N/A'}</div>
                            </div>
                        );
                }
            })}
        </div>
    );
};

export default ViewData;
