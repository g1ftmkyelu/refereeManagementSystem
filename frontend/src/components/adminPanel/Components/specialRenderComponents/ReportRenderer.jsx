import React from 'react';

const ReportRenderer = ({rdata}) => {
    const { kind, metrics}=rdata
    switch (kind) {
        case 'general':
            return <h1>General report</h1>;
        case 'sales':
            return <div>Sales report</div>;
        case 'weekly':
            return <div>Weekly report</div>;
        case 'monthly':
            return <div>Monthly report</div>;
        case 'annual':
            return <div>Annual report</div>;
        default:
            return null; 
    }
}

export default ReportRenderer;
