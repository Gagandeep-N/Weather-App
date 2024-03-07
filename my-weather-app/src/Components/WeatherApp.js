import { useState } from "react";
import axios from 'axios';
import '../Styles/WeatherApp.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSun } from '@fortawesome/free-solid-svg-icons';


const WeatherApp = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [showWeather, setShowWeather] = useState(false);
    const [error, setError] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;

    const setCityHandler = (event) => {
        const newCity = event.target.value;
        setCity(newCity)
    }

    const submitHandler = () => {
        axios.get(`${apiUrl}?q=${city}&appid=${apiKey}`)
            .then((response) => {
                console.log(response.data);
                setWeather(response.data);
                setCity("");
                setShowWeather(true)
                setError('')
            })
            .catch(() => setError("Invalid city!"));
            
    }

    function kelvinToCelsius(kelvin) {
        return kelvin - 273.15;
    }

    return (
        <div className="container">
            <div className="container-top">

            <h1 className="app-header">Weather</h1>
            <div className="input-clear">
                <input type="text" placeholder="Enter the city name" value={city} onChange={setCityHandler} className="city-input" />
                {error && <p className="error">{error}</p>}
            </div>
            <div>
                <button className="submit-btn" onClick={submitHandler}>Search</button>
            </div>
            </div>
            {showWeather && 
            <div className="weather-display">
                {weather && (
                    <div className="current-temp">
                        <div className="icon"><FontAwesomeIcon icon={faCloudSun} className="icon-svg"/></div>
                        <div className="temp-info">
                        <p className="city">{weather.city.name}</p>
                        <p className="celsius">{kelvinToCelsius(weather.list[0].main.temp).toFixed(2)}°C</p>
                        <p className="info">{weather.list[0].weather[0].main}</p>
                        </div>
                    </div>
                )}

            </div>}
        </div>
    );
}

export default WeatherApp;