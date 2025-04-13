import React, { useState, useRef } from 'react';
import { MapPin, Calendar, Clock, DollarSign, RotateCcw } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setHours, setMinutes } from 'date-fns';

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
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

  const handleRedo = async () => {
    setIsGenerating(true);


    setIsGenerating(false);
  };

  return (
    <div id="home-page" style={{ maxWidth: '1400px', margin: '0 auto', padding: '100px 40px 60px', fontFamily: 'Arial' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 'bold', marginBottom: '30px' }}>
        Let’s start creating the perfect itinerary
      </h1>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={generateItinerary}
          style={{ backgroundColor: '#7f4fc3', color: '#fff', padding: '10px 24px', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          generate itinerary
        </button>
      </div>

      <div style={{ display: 'flex', gap: '40px' }}>
        {/* LEFT SIDE */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '40px' }}>
            {/* Custom-Styled Inputs */}
            <div style={styles.inputButton}>
              <Calendar size={24} />
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                placeholderText="Select Date"
                className="styled-input"
                dateFormat="yyyy-MM-dd"
              />
            </div>

            <div style={styles.inputButton}>
              <Clock size={24} />
              <DatePicker
                selected={startTime}
                onChange={(time) => setStartTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Start Time"
                dateFormat="hh:mm aa"
                placeholderText="Start Time"
                className="styled-input"
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
              />
            </div>

            <div style={styles.inputButton}>
              <Clock size={24} />
              <DatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="End Time"
                dateFormat="hh:mm aa"
                placeholderText="End Time"
                className="styled-input"
                minTime={setHours(setMinutes(new Date(), 0), 6)}
                maxTime={setHours(setMinutes(new Date(), 0), 22)}
              />
            </div>

            <div style={styles.inputButton}>
              <DollarSign size={24} />
              <input
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="Budget"
                className="styled-input"
              />
            </div>
          </div>

          {/* Map Section */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <MapPin size={20} style={{ color: 'red', marginRight: '6px' }} />
              <span>Location</span>
            </div>
            <div
              style={{ height: '300px', backgroundColor: '#eee', borderRadius: '10px', textAlign: 'center', paddingTop: '120px', color: '#666' }}
              onClick={handleMapClick}
            >
              {location ? (
                <>
                  <p>Selected location: {location}</p>
                  <p>Click on the map to change location</p>
                </>
              ) : (
                <p>[Map will go here]</p>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ flex: 1, maxWidth: '400px' }} ref={itineraryRef}>
          {itinerary && (
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 0 5px rgba(0,0,0,0.1)', marginTop: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
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

export default Home;
