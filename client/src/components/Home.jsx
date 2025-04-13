import React, { useState } from "react";
import { MapPin, Calendar, Clock, DollarSign, RotateCcw } from "lucide-react";
import API from "../axiosConfig";
import MapGL, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const HomePage = () => {
  const [viewport, setViewport] = useState({
    latitude: 28.5383, // Default to Orlando
    longitude: -81.3792,
    zoom: 10,
  });

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [budget, setBudget] = useState("");
  const [location, setLocation] = useState("");
  const [itinerary, setItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const attractions = [
    { name: "Bakery", type: "food", duration: 60, optional: true },
    { name: "Bus to brunch", type: "transport", duration: 60 },
    { name: "La Maison Rose", type: "food", duration: 90 },
    { name: "Sacré-Cœur", type: "sightseeing", duration: 120 },
    { name: "Arc de Triomphe", type: "sightseeing", duration: 60 },
    { name: "Eiffel Tower", type: "sightseeing", duration: 120 },
    { name: "Bus back to Airbnb", type: "transport", duration: 30 },
  ];

  const generateItinerary = () => {
    setIsGenerating(true);
    const startHour = parseInt(startTime.split(":")[0]);
    const endHour = parseInt(endTime.split(":")[0]) || 23;
    let currentTime = startHour * 60;
    const endTimeInMinutes = endHour * 60;
    const generatedItinerary = [];

    for (const attraction of attractions) {
      if (currentTime + attraction.duration <= endTimeInMinutes) {
        const startHours = Math.floor(currentTime / 60);
        const startMinutes = currentTime % 60;
        const endHours = Math.floor((currentTime + attraction.duration) / 60);
        const endMinutes = (currentTime + attraction.duration) % 60;

        const startFormatted = `${startHours}:${startMinutes
          .toString()
          .padStart(2, "0")}${startHours < 12 ? "AM" : "PM"}`;
        const endFormatted = `${endHours}:${endMinutes
          .toString()
          .padStart(2, "0")}${endHours < 12 ? "AM" : "PM"}`;

        generatedItinerary.push({
          startTime: startFormatted,
          endTime: endFormatted,
          activity: attraction.name,
          optional: attraction.optional || false,
        });

        currentTime += attraction.duration;
      }
    }

    setItinerary({
      date: selectedDate,
      location: location || "Paris",
      activities: generatedItinerary,
      startTime: `${startHour}:00${startHour < 12 ? "AM" : "PM"}`,
      endTime: `${endHour}:00${endHour < 12 ? "AM" : "PM"}`,
    });

    setIsGenerating(false);
  };

  const handleMapClick = () => {
    setLocation("Paris");
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    return `${hour}:${minutes || "00"}${hour < 12 ? "AM" : "PM"}`;
  };

  const handleRedo = async () => {
    // generateItinerary();
    setIsGenerating(true);

    try {
      const res = await API.post("/generate-itinerary", {
        location: "Orlando, Florida", // hardcoded location
        startTime: "9:00AM", // hardcoded start time
        endTime: "5:00PM", // hardcoded end time
      });

      console.log("GPT Response:", res.data); // See if you get a valid JSON response
      setItinerary(res.data);
    } catch (error) {
      console.error("GPT error:", error);
      alert("Could not generate itinerary.");
    }

    setIsGenerating(false);
  };

  return (
    <div
      id="home-page"
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "60px 40px 60px",
        fontFamily: "Arial",
      }}
    >
      <h1
        id="page-title"
        style={{
          top: "0",
          textAlign: "center",
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "20px",
        }}
      >
        Let’s start creating the perfect itinerary
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
        id="generate-button-container"
      >
        {/* Left side filters */}
        <div
          className="filters-wrp"
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <button>Select Date</button>
          <button>Select Time</button>
          <button>End Time</button>
          <button>Budget</button>
        </div>

        {/* Right side generate */}
        <div className="itenerary-wrp">
          <button
            id="generate-itinerary-btn"
            onClick={generateItinerary}
            style={{
              backgroundColor: "#7f4fc3",
              color: "#fff",
              padding: "10px 24px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            generate itinerary
          </button>
        </div>
      </div>

      <div id="main-content-wrapper" style={{ display: "flex", gap: "40px" }}>
        {/* LEFT SIDE */}
        <div id="left-column" style={{ flex: 1 }}>
          <div
            id="input-section"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              marginBottom: "40px",
              justifyContent: "flex-start",
            }}
          >
            {/* Input Buttons */}
            <div
              id="date-picker"
              style={{
                ...styles.inputButton,
                padding: "14px 20px",
                minWidth: "200px",
              }}
              onClick={() => document.getElementById("date-input").showPicker()}
            >
              <Calendar size={24} />
              <span>{selectedDate || "Select Date"}</span>
              <input
                id="date-input"
                type="date"
                style={{ display: "none" }}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>

            <div
              id="start-time-picker"
              style={{
                ...styles.inputButton,
                padding: "14px 20px",
                minWidth: "200px",
              }}
              onClick={() =>
                document.getElementById("start-time-input").showPicker()
              }
            >
              <Clock size={24} />
              <span>
                {startTime ? formatTimeForDisplay(startTime) : "Start Time"}
              </span>
              <input
                id="start-time-input"
                type="time"
                style={{ display: "none" }}
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div
              id="end-time-picker"
              style={{
                ...styles.inputButton,
                padding: "14px 20px",
                minWidth: "200px",
              }}
              onClick={() =>
                document.getElementById("end-time-input").showPicker()
              }
            >
              <Clock size={24} />
              <span>
                {endTime ? formatTimeForDisplay(endTime) : "End Time"}
              </span>
              <input
                id="end-time-input"
                type="time"
                style={{ display: "none" }}
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            <div
              id="budget-input-button"
              style={{
                ...styles.inputButton,
                padding: "14px 20px",
                minWidth: "200px",
              }}
              onClick={() => document.getElementById("budget-input").focus()}
            >
              <DollarSign size={24} />
              <span>{budget || "Budget"}</span>
              <input
                id="budget-input"
                type="number"
                style={{ display: "none" }}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Map Section */}
          <div id="map-section" style={{ marginBottom: "10px" }}>
            <div
              id="map-header"
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <MapPin size={20} style={{ color: "red", marginRight: "6px" }} />
              <span>Location</span>
            </div>
            <MapGL
              {...viewport}
              width="100%"
              height="300px"
              mapboxApiAccessToken={import.meta.env.VITE_MAPBOX_TOKEN}
              mapStyle="mapbox://styles/mapbox/streets-v11"
              onViewportChange={(nextViewport) => setViewport(nextViewport)}
              onClick={(e) => {
                const [lng, lat] = e.lngLat;
                setSelectedLocation({ latitude: lat, longitude: lng });
                setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`);
              }}
            >
              {selectedLocation && (
                <Marker
                  latitude={selectedLocation.latitude}
                  longitude={selectedLocation.longitude}
                />
              )}
            </MapGL>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div id="itinerary-column" style={{ flex: 1, maxWidth: "400px" }}>
          {itinerary && (
            <div
              id="itinerary-box"
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
                marginTop: "40px",
              }}
            >
              <div
                id="itinerary-header"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h2 style={{ margin: 0 }}>{itinerary.location} Itinerary</h2>
                  <p style={{ fontSize: "14px", color: "#666" }}>
                    {itinerary.startTime} - {itinerary.endTime}
                  </p>
                </div>
                <button
                  id="redo-button"
                  onClick={handleRedo}
                  style={{
                    border: "none",
                    background: "none",
                    color: "#555",
                    cursor: "pointer",
                  }}
                >
                  <RotateCcw size={16} style={{ marginRight: "4px" }} /> redo
                </button>
              </div>
              <ul
                id="itinerary-list"
                style={{ paddingLeft: "0", listStyle: "none" }}
              >
                {itinerary.activities.map((activity, index) => (
                  <li
                    key={index}
                    className="itinerary-item"
                    style={{
                      marginBottom: "12px",
                      display: "flex",
                      alignItems: "flex-start",
                    }}
                  >
                    <Clock
                      size={16}
                      style={{
                        marginRight: "8px",
                        marginTop: "2px",
                        color: "#aaa",
                      }}
                    />
                    <span>
                      {activity.startTime} - {activity.endTime}:{" "}
                      {activity.activity}
                      {activity.optional && " (optional)"}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  inputButton: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
    minWidth: "160px",
    justifyContent: "center",
  },
};

export default HomePage;
