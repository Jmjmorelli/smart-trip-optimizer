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
        location: { // location of home
          latitude: 28.419411,
          longitude: -81.581200
        },
        radius: 10, // map radius
        
        startTime: "9:00AM", // hardcoded start time
        endTime: "5:00PM", // hardcoded end time
        budget: { // hard coded budget
          minimal: 500,
          maximal: 1000
        },

        preference: {
          like: "chill, adventure, relax",
          dislike: "vegan, chinese" 

        }

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
    <div style={{ padding: '80px 40px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
        Welcome to Smart Trip Optimizer
      </h1>

      <p style={{ marginTop: '20px', fontSize: '1.2rem' }}>
        This is the Home Page.
      </p>

      <button
        style={{
          marginTop: '40px',
          backgroundColor: '#7f4fc3',
          color: '#fff',
          padding: '12px 24px',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => alert('Button working!')}
      >
        Generate Itinerary
      </button>
    </div>
  );
};

export default Home;
