import React, { useState, useEffect } from 'react';
import background from '../image/bg-image.jpg';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { FaTemperatureLow, FaTemperatureHigh, FaCity } from 'react-icons/fa';
import { BiError } from 'react-icons/bi';

export const Weather = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState('Mumbai');
  useEffect(() => {
    const fetchApi = async () => {
      const url = `http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=45383b0ec9826999ae104029e502883b`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };
    fetchApi();
  }, [search]);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div className="text-white pt-12">
          <input
            className="text-black pl-2 h-12 rounded-lg"
            type="text"
            placeholder="Search location"
            value={search}
            onChange={event => setSearch(event.target.value)}
          />
          {!city ? (
            <>
              <div className=" flex text-center justify-center pt-40 ">
                <BiError className="bg-black p-5 text-7xl" />
                <div className="bg-black pt-5 text-2xl pr-3">
                  <p>Sorry! No data found</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <div className="text-3xl flex pr-3.5 text-center justify-center pt-10">
                  <FaCity className="bg-black pl-2 pr-2 text-4xl" />
                  <div className="pl-5"> {search}</div>
                </div>

                <div className=" font-bold  text-center  justify-center ">
                  <div className="flex pr-3 pt-36 text-center justify-center pt-10">
                    {' '}
                    <TiWeatherPartlySunny className="text-8xl" />
                    <div className="pl-4 text-center text-2xl ">
                      <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-2 rounded-lg">
                        {' '}
                        {city.temp}°Cel{' '}
                      </span>
                    </div>
                  </div>

                  <div className="text-3xl ">
                    <div className="flex pr-3 text-center justify-center pt-10">
                      <FaTemperatureLow className="text-yellow-500 bg-black px-2 text-4xl" />
                      <div className="text-black px-5 bg-gray-300 rounded-full ml-5 text-xl pt-1">
                        Min: {city.temp_min}°Cel{' '}
                      </div>
                    </div>
                    <div className="pt-10">
                      <div className="flex pr-3 text-center justify-center">
                        <FaTemperatureHigh className="text-red-900 bg-white px-2 text-4xl rounded-lg" />
                        <div className="text-black px-5 bg-gray-300 rounded-full ml-5 text-xl pt-1">
                          Max: {city.temp_max}°Cel{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};
