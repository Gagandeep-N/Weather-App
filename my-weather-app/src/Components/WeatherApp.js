import { useEffect, useState } from "react";
import axios from 'axios'; 


const WeatherApp = () => {
    const  [weather, setWeather] = useState(null);
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;
    const city = "London";

    useEffect(()=>{
        axios.get(`${apiUrl}?q=${city}&appid=${apiKey}`)
        .then((response) => {
            console.log(response);
            console.log(response.data);
            setWeather(response.data);
        })
        .catch((error)=>console.log(error));
    }, [apiKey,city]);
}

export default WeatherApp;