import React, { useState } from "react";
import Sunset from "../images/sunset.jpeg";
import axios from "axios";
function WeatherWidgetComponent() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl image-full ml-0 m-6 before:opacity-90">
      <figure>
        <img src={Sunset} alt="Sunset" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Weather</h2>
        <div className="w-full max-w-xs bg-local bg-cover bg-center">
          <div className="p-1 relative text-center mb-6">
            {console.log("City: ", data.name, location)}
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyPress={searchLocation}
              placeholder="Enter Location"
              type="text"
              className="border-2 border-gray-100 h-10 px-5 pr-16 rounded-full text-xl focus:outline-none bg-transparent py-6"
            />
          </div>
          {/*Weather Container */}
          <div className="relative h-max w-full text-white">
            {/* Top */}
            <div className="">
              {/* Location */}
              <div className="text-2xl">
                <p>{data.name}</p>
              </div>
              {/* Temperature */}
              <div>
                {data.main ? (
                  <h1 className="text-7xl my-8">
                    {data.main.temp.toFixed()}°F
                  </h1>
                ) : null}
              </div>
              {/* Side Description */}
              <div className="side-rotate">
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
            </div>

            {data.name !== undefined && (
              <div className="flex justify-evenly text-center p-2 rounded-lg bg-white/20">
                {/*Bottom Weather Stats */}
                <div className="">
                  {/* Feels */}
                  {data.main ? (
                    <p className="font-bold">
                      {data.main.feels_like.toFixed()}°F
                    </p>
                  ) : null}
                  <p>Feels Like</p>
                </div>
                <div className="">
                  {/* Humidity */}
                  {data.main ? (
                    <p className="font-bold">{data.main.humidity}%</p>
                  ) : null}
                  <p>Humidity</p>
                </div>
                <div className=" ">
                  {/* Wind */}
                  {data.wind ? (
                    <p className="font-bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p>Wind Speed</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherWidgetComponent;
