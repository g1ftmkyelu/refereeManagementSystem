import React from 'react';

const ViewData = ({ schema, data }) => {
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
