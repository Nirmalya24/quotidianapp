import React, { useState } from 'react';
import Modal from '../utils/Modal';
import CalendarSample from '../images/Widget-Samples/calendar-sample.png'
import DashboardSample from '../images/Widget-Samples/dashboard-sample.png'
import QuoteSample from '../images/Widget-Samples/quote-sample.png'
import TimerSample from '../images/Widget-Samples/timer-sample.png'
import TodoSample from '../images/Widget-Samples/todo-sample.png'
import WeatherSample from '../images/Widget-Samples/weather-sample.png'

function HeroHome() {

  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <section className="relative">
      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
            >
              Take control of your{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
                homepage
              </span>
            </h1>
            <div className="max-w-3xl mx-auto">
              <p
                className="text-xl text-gray-600 mb-8"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                You use a browser everyday and yet don't have many options to
                customize it to your liking. We're here to change that.
              </p>
            </div>
          </div>

          {/* Show Widget Samples */}
          <div className="carousel carousel-center max-w-md p-4 space-x-4 bg-neutral rounded-box">
            <div className="carousel-item">
              <figure>
                <img src={CalendarSample} className="CalendarSample" />
              </figure>
            </div>
            <div className="carousel-item">
              <figure>
                <img src={QuoteSample} className="QuoteSample" />
              </figure>
            </div>
            <div className="carousel-item">
              <figure>
                <img src={TimerSample} className="TimerSample" />
              </figure>
            </div>
            <div className="carousel-item">
              <figure>
                <img src={TodoSample} className="TodoSample" />
              </figure>
            </div>
            <div className="carousel-item">
              <figure>
                <img src={WeatherSample} className="WeatherSample" />
              </figure>
            </div>
          </div>


          {/* Modal */}
          <Modal
            id="modal"
            ariaLabel="modal-headline"
            show={videoModalOpen}
            handleClose={() => setVideoModalOpen(false)}
          >
            <div className="relative pb-9/16">
              <iframe
                className="absolute w-full h-full"
                src="https://player.vimeo.com/video/174002812"
                title="Video"
                allowFullScreen
              ></iframe>
            </div>
          </Modal>
        </div>
      </div>
    </section>
  );
}

export default HeroHome;