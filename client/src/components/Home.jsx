import React, { useState } from 'react';
import { MapPin, Calendar, Clock, DollarSign, RotateCcw } from 'lucide-react';

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [itinerary, setItinerary] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const attractions = [
    { name: "Bakery", type: "food", duration: 60, optional: true },
    { name: "Bus to brunch", type: "transport", duration: 60 },
    { name: "La Maison Rose", type: "food", duration: 90 },
    { name: "Sacré-Cœur", type: "sightseeing", duration: 120 },
    { name: "Arc de Triomphe", type: "sightseeing", duration: 60 },
    { name: "Eiffel Tower", type: "sightseeing", duration: 120 },
    { name: "Bus back to Airbnb", type: "transport", duration: 30 }
  ];

  const generateItinerary = () => {
    setIsGenerating(true);
    const startHour = parseInt(startTime.split(':')[0]);
    const endHour = parseInt(endTime.split(':')[0]) || 23;
    let currentTime = startHour * 60;
    const endTimeInMinutes = endHour * 60;
    const generatedItinerary = [];

    for (const attraction of attractions) {
      if (currentTime + attraction.duration <= endTimeInMinutes) {
        const startHours = Math.floor(currentTime / 60);
        const startMinutes = currentTime % 60;
        const endHours = Math.floor((currentTime + attraction.duration) / 60);
        const endMinutes = (currentTime + attraction.duration) % 60;

        const startFormatted = `${startHours}:${startMinutes.toString().padStart(2, '0')}${startHours < 12 ? 'AM' : 'PM'}`;
        const endFormatted = `${endHours}:${endMinutes.toString().padStart(2, '0')}${endHours < 12 ? 'AM' : 'PM'}`;

        generatedItinerary.push({
          startTime: startFormatted,
          endTime: endFormatted,
          activity: attraction.name,
          optional: attraction.optional || false
        });

        currentTime += attraction.duration;
      }
    }

    setItinerary({
      date: selectedDate,
      location: location || 'Paris',
      activities: generatedItinerary,
      startTime: `${startHour}:00${startHour < 12 ? 'AM' : 'PM'}`,
      endTime: `${endHour}:00${endHour < 12 ? 'AM' : 'PM'}`
    });

    setIsGenerating(false);
  };

  const handleMapClick = () => {
    setLocation('Paris');
  };

  const formatTimeForDisplay = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour}:${minutes || '00'}${hour < 12 ? 'AM' : 'PM'}`;
  };

  const handleRedo = () => {
    generateItinerary();
  };

  return (
    <div id="home-page" style={{ maxWidth: '1400px', margin: '0 auto', padding: '160px 40px 60px', fontFamily: 'Arial' }}>
      <h1 id="page-title" style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
        Let’s start creating the perfect itinerary
      </h1>

      <div id="generate-button-container" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button id="generate-itinerary-btn" onClick={generateItinerary} style={{ backgroundColor: '#7f4fc3', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          generate itinerary
        </button>
      </div>

      <div id="main-content-wrapper" style={{ display: 'flex', gap: '40px' }}>
        {/* LEFT SIDE */}
        <div id="left-column" style={{ flex: 1 }}>
          <div id="input-section" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px', justifyContent: 'flex-start' }}>
            {/* Input Buttons */}
            <div id="date-picker" style={{ ...styles.inputButton, padding: '14px 20px', minWidth: '200px' }} onClick={() => document.getElementById('date-input').showPicker()}>
              <Calendar size={24} />
              <span>{selectedDate || 'Select Date'}</span>
              <input id="date-input" type="date" style={{ display: 'none' }} value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
            </div>

            <div id="start-time-picker" style={{ ...styles.inputButton, padding: '14px 20px', minWidth: '200px' }} onClick={() => document.getElementById('start-time-input').showPicker()}>
              <Clock size={24} />
              <span>{startTime ? formatTimeForDisplay(startTime) : 'Start Time'}</span>
              <input id="start-time-input" type="time" style={{ display: 'none' }} value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            </div>

            <div id="end-time-picker" style={{ ...styles.inputButton, padding: '14px 20px', minWidth: '200px' }} onClick={() => document.getElementById('end-time-input').showPicker()}>
              <Clock size={24} />
              <span>{endTime ? formatTimeForDisplay(endTime) : 'End Time'}</span>
              <input id="end-time-input" type="time" style={{ display: 'none' }} value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            </div>

            <div id="budget-input-button" style={{ ...styles.inputButton, padding: '14px 20px', minWidth: '200px' }} onClick={() => document.getElementById('budget-input').focus()}>
              <DollarSign size={24} />
              <span>{budget || 'Budget'}</span>
              <input id="budget-input" type="number" style={{ display: 'none' }} value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>

          {/* Map Section */}
          <div id="map-section" style={{ marginBottom: '40px' }}>
            <div id="map-header" style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <MapPin size={20} style={{ color: 'red', marginRight: '6px' }} />
              <span>Location</span>
            </div>
            <div id="map-box" style={{ height: '300px', backgroundColor: '#eee', borderRadius: '10px', position: 'relative', textAlign: 'center', paddingTop: '120px', color: '#666' }} onClick={handleMapClick}>
              {location ? (
                <div>
                  <p>Selected location: {location}</p>
                  <p>Click on the map to change location</p>
                </div>
              ) : (
                <p>[Map will go here]</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div id="itinerary-column" style={{ flex: 1, maxWidth: '400px' }}>
          {!itinerary ? (
            <div style={{ backgroundColor: '#f3f3f3', padding: '30px', borderRadius: '10px', textAlign: 'center', color: '#666' }}>
              <p style={{ fontSize: '16px', fontStyle: 'italic' }}>Click "generate itinerary" to see your travel plan here.</p>
            </div>
          ) : (
            <div id="itinerary-box" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)', marginTop: '10px' }}>
              <div id="itinerary-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h2 style={{ margin: 0 }}>{itinerary.location} Itinerary</h2>
                  <p style={{ fontSize: '14px', color: '#666' }}>{itinerary.startTime} - {itinerary.endTime}</p>
                </div>
                <button onClick={handleRedo} style={{ border: 'none', background: 'none', color: '#555', cursor: 'pointer' }}>
                  <RotateCcw size={16} style={{ marginRight: '4px' }} /> redo
                </button>
              </div>
              <ul style={{ paddingLeft: '0', listStyle: 'none' }}>
                {itinerary.activities.map((activity, index) => (
                  <li key={index} style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start' }}>
                    <Clock size={16} style={{ marginRight: '8px', marginTop: '2px', color: '#aaa' }} />
                    <span>{activity.startTime} - {activity.endTime}: {activity.activity}{activity.optional && ' (optional)'}</span>
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
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    minWidth: '160px',
    justifyContent: 'center'
  }
};

export default HomePage;
