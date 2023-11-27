import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'
import { getToken } from '../../utils/helperFunctions';

const GridCard1 = ({ data }) => {



    const getStatusColor = (status) => {
        switch (status) {
            case 'scheduled':
                return 'text-blue-500';
            case 'live':
                return 'text-green-500';
            case 'completed':
                return 'text-gray-500';
            case 'cancelled':
                return 'text-red-500';
            default:
                return '';
        }
    };

    const token = getToken()
    const getTeamLogo = async (teamName) => {
        try {
            const response = await axios.get(`https://refs-29ss.onrender.com/teams`, {
                params: {
                    name: teamName,
                    returnFields: 'logo'
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return response.data;
        } catch (error) {
            // Handle errors here (e.g., display an error message)
            console.error('Error fetching team logo:', error);
            throw new Error('Failed to fetch team logo');
        }
    };

    const homeTeamLogoQuery = useQuery(['homeTeamLogo', data.homeTeam], () => getTeamLogo(data.homeTeam));
    const awayTeamLogoQuery = useQuery(['awayTeamLogo', data.awayTeam], () => getTeamLogo(data.awayTeam));

    return (
        <div>
            <div className="flex items-center justify-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    {homeTeamLogoQuery.isSuccess && (
                        <img
                            src={homeTeamLogoQuery.data[0]?.logo}
                            alt={`${data.homeTeam} Logo`}
                            className="rounded-full "
                            width={190}
                            height={190}
                        />
                    )}
                    <h1 className="text-xl font-bold">{data.homeTeam}</h1>
                </div>

                <div className="flex items-center justify-center">
                    <h1 className="text-6xl font-extrabold mx-4">-VS-</h1>
                </div>

                <div className="flex flex-col items-center justify-center space-y-4">
                    {awayTeamLogoQuery.isSuccess && (
                        <img
                            src={awayTeamLogoQuery.data[0]?.logo}
                            alt={`${data.awayTeam} Logo`}
                            className="rounded-full"
                            width={190}
                            height={190}
                        />
                    )}
                    <h1 className="text-xl font-bold">{data.awayTeam}</h1>
                </div>
            </div>

            <div className="text-center mt-4">
                <h1 className={`text-lg font-bold ${data.status === 'scheduled' ? 'text-blue-500' :
                    data.status === 'live' ? 'text-green-500' :
                        data.status === 'completed' ? 'text-gray-500' :
                            data.status === 'cancelled' ? 'text-red-500' :
                                ''}`}
                >
                    {data.status}
                </h1>
                <h1 className="text-lg font-bold">{data.venue}</h1>
               
            </div>

        </div>
    );
};

export default GridCard1;
