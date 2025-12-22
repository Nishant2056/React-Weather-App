import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchCity = ({ handleSearchClicked }) => {
  const [city, setCity] = useState("");

  return (
    <div className="inp-btn-wrapper gap-2">
      <input
        type="text"
        placeholder="Search City/Town"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
        }}
      />
      <button
        type="button"
        className="btn btn-primary d-flex"
        onClick={() => {
          handleSearchClicked(city);
          setCity("");
        }}
      >
        <IoMdSearch />
      </button>
    </div>
  );
};

export default SearchCity;
