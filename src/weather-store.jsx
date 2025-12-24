import { createContext, useReducer, useCallback } from "react";

export const WeatherContext = createContext({
  town: "",
  description: "",
  temp: "",
  error: false,
  searchCity: () => {},
});

const weatherReducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_SUCCESS":
      return {
        town: action.payload.town,
        description: action.payload.description,
        temp: action.payload.temp,
        error: false,
      };
    case "SEARCH_ERROR":
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, {
    town: "Kathmandu",
    description: "",
    temp: "",
    error: false,
  });

  const searchCity = useCallback(async (town) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${town}&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.cod === "404") {
        dispatch({ type: "SEARCH_ERROR" });
        return;
      }

      dispatch({
        type: "SEARCH_SUCCESS",
        payload: {
          town: town,
          description: data.weather[0].description,
          temp: Math.round(data.main.temp - 273.15),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <WeatherContext.Provider value={{ ...state, searchCity }}>
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
