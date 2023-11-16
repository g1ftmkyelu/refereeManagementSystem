import React from "react";
import Slider from "react-slick";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import MetricCard from './MetricCard';

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import './style.css'

const PrevArrow = (props) => (
  <div {...props} className="slick-arrow slick-prev-arrow">
    <FaArrowAltCircleLeft className="slick-prev-icon" />
  </div>
);

const NextArrow = (props) => (
  <div {...props} className="slick-arrow slick-next-arrow">
    <FaArrowAltCircleRight className="slick-next-icon" />
  </div>
);
const DashboardCardSection = ({ metrics, data }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4, 
    infinite: true,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablets and smaller desktops
        settings: {
          slidesToShow: 2, // Display 2 slides on medium-sized screens
        },
      },
      {
        breakpoint: 480, // Mobile devices
        settings: {
          slidesToShow: 1, // Display 1 slide on smaller screens
        },
      },
    ],
  };

  return (
    <div style={{ width: '87vw' }}>
    
      {metrics.map((metricGroup, groupIndex) => {
        const groupLength = metricGroup.units.length;
        const isInfinite = groupLength >= settings.slidesToShow;

        return (
          <div className="mx-10">
            <h1 className="text-lg font-bold my-5">{metricGroup.name}</h1>
            <Slider key={groupIndex} {...{ ...settings, infinite: isInfinite }}>
              {metricGroup.units
                .filter((unit) => unit.show === true)
                .map((unit, unitIndex) => (
                  <div key={unitIndex}>
                    <MetricCard {...{ index: unitIndex, metric: unit, data }} />
                  </div>
                ))}
            </Slider>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardCardSection;
