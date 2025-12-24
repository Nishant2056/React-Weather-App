import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchCity from "./components/SearchCity";
import { TiWeatherCloudy } from "react-icons/ti";
import { useContext, useEffect } from "react";
import WeatherProvider, { WeatherContext } from "./weather-store";

function WeatherApp() {
  const { town, description, temp, searchCity, error } =
    useContext(WeatherContext);

  const handleSearchClicked = (placeName) => {
    searchCity(placeName);
  };

  useEffect(() => {
    if (searchCity) searchCity("Kathmandu");
  }, [searchCity]);

  return (
    <center>
      <h1>Weather App</h1>

      <div className="components-wrapper">
        <SearchCity handleSearchClicked={handleSearchClicked}></SearchCity>
        <TiWeatherCloudy className="dimension" />
        {error ? (
          <p>City Not found</p>
        ) : (
          <>
            <p>{temp} °C</p>
            <p>{town}</p>
            <p>{description}</p>
          </>
        )}
      </div>
    </center>
  );
}

function App() {
  return (
    <WeatherProvider>
      <WeatherApp />
    </WeatherProvider>
  );
}

export default App;
