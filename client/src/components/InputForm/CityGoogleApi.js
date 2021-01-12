import React, { useState, useEffect } from "react";
import PlacesAutocomplete from "react-places-autocomplete";

const LocationSearchInput = ({ onChangeString }) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    return setAddress("");
  }, [setAddress]);

  return (
    <PlacesAutocomplete value={address} onChange={setAddress}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            name='ville'
            onSelect={onChangeString}
            {...getInputProps({
              placeholder: "Ville ...",
            })}
          />
          <div className={loading ? "city-box-inactive" : "city-box-active"}>
            {loading && (
              <div
                className={!loading ? "city-box-inactive" : "city-box-active"}
              >
                Chargement...
              </div>
            )}
            {suggestions.map((suggestion) => {
              // inline style for demonstration purpose
              const style = suggestion.active
                ? {
                    backgroundColor: "#007be8",
                    cursor: "pointer",
                    color: "#fff",
                    fontWeight: "bold",
                    borderRadius: "5px",
                    padding: "10px 0",
                  }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    style,
                  })}
                >
                  <span>{suggestion.formattedSuggestion.mainText}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
