import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchCity from "./components/SearchCity";
import { TiWeatherCloudy } from "react-icons/ti";
import { useEffect, useState } from "react";

function App() {
  const [town, setTown] = useState("Kathmandu");
  const [description, setDescription] = useState("");
  const [temp, setTemp] = useState("");

  const handleSearchClicked = (placeName) => {
    // console.log(`The entered location is ${placeName}`);
    setTown(placeName);
  };

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data);
      setDescription(data.weather[0].description);
      setTemp(Math.round(data.main.temp - 273.15));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (town) search(town);
  }, [town]);
  return (
    <center>
      <h1>Weather App</h1>

      <div className="components-wrapper">
        <SearchCity handleSearchClicked={handleSearchClicked}></SearchCity>
        <TiWeatherCloudy className="dimension" />
        <p>{temp} °C</p>
        <p>{town}</p>
        <p>{description}</p>
      </div>
    </center>
  );
}

export default App;
