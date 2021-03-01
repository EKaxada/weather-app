import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import AutoComplete from './AutoComplete'

const App = () => {
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState({});

  const fetchData = async (e) => {
    if (e.key === "Enter") {
      await axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            q: place,
            units: "metric",
            appid: "f33a484cf794d08d0148764789aaba32",
          },
        })
        .then((res) => {
          console.log(res.data);
          setWeather(res.data);
          setPlace("");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };


  return (
    <div className="App">
      <div className="weather-container">
        {weather.main && (
          <div>
            <p className="description">{weather.weather[0].description}</p>
            <p className="degrees">
              {weather.main.temp}
              <sup>&deg;</sup>
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="cloudy"
            />
            <p className="city">
              {weather.name}
              <sup>{weather.sys.country}</sup>
            </p>
          </div>
        )}
        {!weather.main && (
          <h1>
            Welcome to <br />
            <strong>weather guide</strong>
          </h1>
        )}
        <br />
        <br />
        <input
          type="text"
          name="place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          onKeyPress={fetchData}
          placeholder="Input location"
          autoFocus
        />
        <AutoComplete/>
      </div>
    </div>
  );
};

export default App;
