import React, { useEffect, useState } from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getDataByTimeRange, getDataCount, getDataByField } from "../../../utils/metricDataPreprocessor";
import { MoonLoader } from "react-spinners";

import { useGetResourceCount } from "../../../utils/getAPI";


const MetricCard = ({ index, metric }) => {

  const { data, isLoading, isError } = useGetResourceCount(metric.path, metric.dataSource)

  console.log('mydata', data)
  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <MoonLoader color="#1400ff" />
      </div>
    )
  }

  return (
    <div
      key={index}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg mx-2 border border-gray-200"

    >
      <div className="flex items-center bg-gray-100 p-4">
        {metric.icon && (
          <div className="bg-white p-3 rounded-full mr-4">
            <metric.icon className="text-3xl" style={{ color: metric.color }} />
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold" style={{ color: metric.color }}>
            {metric.title}
          </h2>
          <p className="mt-1 text-xl font-extrabold text-gray-600">{data}</p>
        </div>
      </div>
      {metric.seeMore && (
        <Link
          to={`/${metric.path}`}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: metric.color, // Use metric.color as the background color
            color: "#fff",
            fontSize: "0.875rem", // Equivalent to text-sm in Tailwind
            padding: "0.5rem 1rem", // Equivalent to py-2 px-4 in Tailwind
            transition: "background-color 0.3s ease",
            textDecoration: "none",
            textAlign: "center",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")} // hover:bg-blue-600
          onMouseOut={(e) => (e.target.style.backgroundColor = metric.color)} // Original color on hover out
          className="flex items-center justify-between"
        >
          See All <FaArrowAltCircleRight style={{ marginLeft: "0.5rem" }} />
        </Link>

      )}
    </div>
  )


}
export default MetricCard;
