import { useEffect, useState } from "react";
import axios from 'axios'; 
import '../Styles/WeatherApp.css';

const WeatherApp = () => {
    const  [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;

    const setCityHandler = (event) => {
       const newCity = event.target.value;
       setCity(newCity)
    }

    const clearInput =  () => {
        setCity("");
    };

    useEffect(()=>{
        axios.get(`${apiUrl}?q=${city}&appid=${apiKey}`)
        .then((response) => {
            console.log(response.data);
            setWeather(response.data);
        })
        .catch((error)=>console.log(error));
    }, [apiKey,apiUrl,city]);

    return (
        <div className="container">
        <div className="input-clear">
            <input type="text" placeholder="Enter the city name" value={city} onChange={setCityHandler} className="city-input"/>
            {city && (
        <button className="clear-button" onClick={clearInput}>
          x
        </button>
      )}
      </div>
      <div  className="weather-display">
      {weather && (
                <div>
                    {/* <h2>Weather for {city}</h2> */}
                    
                 { console.log("weather",weather.list[0].weather[0].description
)}
                   
                </div>
            )}

      </div>
        </div>
    );
}

export default WeatherApp;