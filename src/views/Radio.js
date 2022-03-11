import React, { useEffect, useState } from "react";
import { RadioBrowserApi } from "radio-browser-api";
// import AudioPlayer from "react-h5-audio-player";
// import "react-h5-audio-player/lib/styles.css";
import defaultImage from "../assets/radio.png";
import Station from "./Station";

export default function Radio() {
  const [stations, setStations] = useState();
  const [stationFilter, setStationFilter] = useState("all");
  const api = new RadioBrowserApi(fetch.bind(window), "Tunes");
  const filters = [
    "all",
    "classical",
    "country",
    "dance",
    "disco",
    "house",
    "jazz",
    "pop",
    "rap",
    "retro",
    "rock",
  ];

  // When filter is selected query API for matching stations.
  useEffect(() => {
    queryAPI(stationFilter).then((data) => {
      setStations(data);
    });
  }, [stationFilter]);

  // Return stations matching the selected filter.
  const queryAPI = async (stationFilter) => {
    const stations = await api.searchStations({
        language: "english",
        tag: stationFilter,
        limit: 30,
      })
      .then((data) => {
        return data;
      });

    return stations;
  };

  // Set default image if station has none.
  const setDefaultSrc = (event) => {
    event.target.src = defaultImage;
  };

  const scrollUp = () => {
    window.scrollTo(0, 0);
  }

  return (
    <div id="radio">
      <h1>Tunes</h1>
      <h2>A media player made using React & Sass.</h2>
      <div className="filters">
        {filters.map(filter => (
          <button key={filter} className={stationFilter === filter ? "selected" : ""} onClick={() => setStationFilter(filter)}>{filter}</button>
        ))}
      </div>
      <div className="stations">
        {
        stations && stations.map((station, index) => {
            return (
              <Station key={station.id} station={station} setDefaultSrc={setDefaultSrc} />
            );
          })
        }
      </div>
        <button className="to-top-btn" onClick={() => scrollUp()}>Back to top</button>
    </div>
  );
}