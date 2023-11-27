import React from 'react';
import { RiCheckboxCircleLine } from 'react-icons/ri'; // Example of React Icons, use your preferred icons
import { useFetchAllResources } from '../../utils/getAPI';
import { MoonLoader } from 'react-spinners';
import { FaSadTear } from 'react-icons/fa';

const Complaints = ({ rdata }) => {
    const { matchTitle } = rdata;
    const { data: complaints, isLoading, isError } = useFetchAllResources(
        "complaints",
        `https://refs-29ss.onrender.com/complaints?matchTitle=${matchTitle}`
    );

    return (
        <div className="container mx-auto my-8 px-4">
            <h1 className="text-3xl font-bold mb-6">Complaints</h1>
            {isLoading ? (
                <div className="flex items-center justify-center">
                    <MoonLoader color="#1400ff" />
                </div>
            ) : isError ? (
                <p>Something went wrong...</p>
            ) : complaints.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <FaSadTear size={100} color='blue' />
                    <div className="text-3xl text-gray-600 font-extrabold">This match has no Complaints</div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {complaints.map((complaint, index) => (
                        <div key={index} className="bg-white rounded-md shadow-md p-4">
                            <h3 className="text-xl font-semibold mb-2">{complaint.title}</h3>
                            <p className="text-gray-700 mb-2">
                                <strong>Match Title:</strong> {complaint.matchTitle}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Reporter:</strong> {complaint.reporter}
                            </p>
                            <p className="text-gray-700 mb-2">
                                <strong>Complaint:</strong> {complaint.complaint}
                            </p>
                            {/* Additional fields from the Mongoose schema can be included here */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Complaints;
