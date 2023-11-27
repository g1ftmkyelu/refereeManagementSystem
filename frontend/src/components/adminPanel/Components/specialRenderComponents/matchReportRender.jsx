import React, { useState, useEffect } from 'react';
import Singleton from './singleton';
import { useFetchAllResources } from '../../utils/getAPI';
import { FaFlag, FaFutbol, FaCrosshairs, FaTags, FaSquare, FaArrowsUpToLine, FaArrowDown, FaHeading, FaAlignLeft, FaCloud, FaListUl } from 'react-icons/fa6';
import { FaSadTear } from 'react-icons/fa';


const MatchReportRender = ({ rdata }) => {
  const { matchTitle } = rdata;
  const [editMode, setEditMode] = useState(false);
  const { data: matchReportData, isLoading, isError } = useFetchAllResources(
    "match-report",
    `https://refs-29ss.onrender.com/match-reports?matchTitle=${matchTitle}`
  );

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (matchReportData && matchReportData.length === 0) {
      // Handle the scenario where matchReportData is empty
    }
  }, [matchReportData]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while data is being fetched
  }

  if (isError || !matchReportData || matchReportData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <FaSadTear size={100} color='blue'/>
        <div className="text-3xl text-gray-600 font-extrabold">This match has no report</div>
      </div>
    );
  }


  const reportData = matchReportData[0]; // Assuming the first element of matchReportData contains the report details

  return (
    <div className='m-7'>
      <h1 className='text-3xl w-full font-extrabold border-x-8 border-blue-500 bg-white my-5 py-10 text-center rounded-lg shadow-md'>
        {editMode ? 'Edit Mode' : `Report`}
      </h1>
      {editMode ? (
        <Singleton rdata={rdata} />
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>


          <div className='mb-4'>
            <div className='match-info bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-6xl font-extrabold py-10'>Home Team</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaFutbol className="icon mr-2" />
                  <span>Home Team Goals:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamGoals}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaFlag className="icon mr-2" />
                  <span>Home Team Possession:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamPossession}%</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaCrosshairs className="icon mr-2" />
                  <span>Home Team Shots:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamShots}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaTags className="icon mr-2" />
                  <span>Home Team Fouls:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamFouls}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaSquare className="icon mr-2" />
                  <span>Home Team Yellow Cards:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamYellowCards}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaSquare className="icon mr-2" />
                  <span>Home Team Red Cards:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamRedCards}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaArrowsUpToLine className="icon mr-2" />
                  <span>Home Team Corners:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamCorners}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaArrowDown className="icon mr-2" />
                  <span>Home Team Offsides:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.homeTeamOffsides}</span>
                </div>
              </div>
            </div>
          </div>



          <div className='mb-4'>
            <div className='match-info bg-white p-4 rounded-lg shadow-md'>
              <h3 className='text-6xl font-extrabold py-10'>Away Team</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaFlag className="icon mr-2" />
                  <span>Away Team Goals:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamGoals}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaFutbol className="icon mr-2" />
                  <span>Away Team Possession:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamPossession}%</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaCrosshairs className="icon mr-2" />
                  <span>Away Team Shots:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamShots}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaTags className="icon mr-2" />
                  <span>Away Team Fouls:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamFouls}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaSquare className="icon mr-2" />
                  <span>Away Team Yellow Cards:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamYellowCards}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaSquare className="icon mr-2" />
                  <span>Away Team Red Cards:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamRedCards}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaArrowsUpToLine className="icon mr-2" />
                  <span>Away Team Corners:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamCorners}</span>
                </div>

                <div className="flex items-center justify-start my-2 font-bold text-xl text-blue-500">
                  <FaArrowDown className="icon mr-2" />
                  <span>Away Team Offsides:</span>
                </div>
                <div className="flex items-center justify-start my-2 font-bold text-xl">
                  <span className="text-black">{reportData.awayTeamOffsides}</span>
                </div>
              </div>
            </div>
          </div>



          <div className='mb-4'>
            <div className='other-details bg-white p-4 rounded-lg shadow-md'>
              <h3 className="text-6xl font-extrabold py-10">Other Details</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="detail-item flex items-center justify-start font-bold text-xl text-blue-500">
                  <FaHeading className="icon mr-2" />
                  <span>Match Title:</span>
                </div>
                <div className="detail-item flex items-center justify-start font-bold text-xl">
                  <span className="text-black">{reportData.matchTitle}</span>
                </div>

                <div className="detail-item flex items-center justify-start font-bold text-xl text-blue-500">
                  <FaAlignLeft className="icon mr-2" />
                  <span>Summary:</span>
                </div>
                <div className="detail-item flex items-center justify-start font-bold text-xl">
                  <span className="text-black">{reportData.summary}</span>
                </div>

                <div className="detail-item flex items-center justify-start font-bold text-xl text-blue-500">
                  <FaCloud className="icon mr-2" />
                  <span>Weather Conditions:</span>
                </div>
                <div className="detail-item flex items-center justify-start font-bold text-xl">
                  <span className="text-black">{reportData.weatherConditions}</span>
                </div>

                <div className="detail-item my-2 font-bold text-xl text-blue-500">
                  <div className="detail-item my-2 font-bold text-xl text-blue-500">
                    <span className='flex items-center'>
                      <FaListUl className="icon mr-2" />
                      <span >Notable Events:</span>
                    </span>
                    <ul className="pl-8 list-inside">
                      {reportData.notableEvents.map((event, index) => (
                        <li key={index} className="text-gray-700 mb-3 flex items-center">
                          <span className="inline-block w-4 h-4 rounded-full bg-blue-500 mr-2" />
                          <span className="text-black">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>



        </div>


      )}
      <button onClick={toggleEditMode}>
        {editMode ? 'View Mode' : 'Edit Mode'}
      </button>
    </div>
  );
};

export default MatchReportRender;
