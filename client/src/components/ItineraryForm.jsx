import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItineraryForm = () => {
  const [date, setDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [budget, setBudget] = useState('');

  return (
    <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
      <h2 style={{ fontSize: '1.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
        Let’s start creating the perfect itinerary
      </h2>
      <hr style={{ width: '50%', margin: '0 auto 2rem auto', borderTop: '1px solid #999' }} />

      {/* Generate Button */}
      <button
        style={{
          backgroundColor: '#6b46c1',
          color: 'white',
          border: 'none',
          padding: '0.75rem 2rem',
          borderRadius: '999px',
          fontWeight: 'bold',
          fontSize: '1rem',
          marginBottom: '2rem',
          cursor: 'pointer',
        }}
      >
        generate itinerary
      </button>

      {/* Input Fields */}
      <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {/* Date */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}>📅 Select Date</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            placeholderText="Select Date"
            className="styled-input"
          />
          <div style={hintStyle}>Hint text</div>
        </div>

        {/* Start Time */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}>⏰ Start Time</label>
          <DatePicker
            selected={startTime}
            onChange={(time) => setStartTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            placeholderText="Start Time"
            className="styled-input"
          />
          <div style={hintStyle}>Hint text</div>
        </div>

        {/* End Time */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}>⏰ End Time</label>
          <DatePicker
            selected={endTime}
            onChange={(time) => setEndTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="h:mm aa"
            placeholderText="End Time"
            className="styled-input"
          />
          <div style={hintStyle}>Hint text</div>
        </div>

        {/* Budget */}
        <div style={{ textAlign: 'left' }}>
          <label style={labelStyle}>💵 Budget</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="Budget"
            className="styled-input"
          />
          <div style={hintStyle}>Hint text</div>
        </div>
      </div>
    </div>
  );
};

// Shared styles
const labelStyle = {
  display: 'block',
  fontWeight: '500',
  marginBottom: '0.5rem',
};

const hintStyle = {
  fontSize: '0.75rem',
  color: '#777',
  marginTop: '0.25rem',
};

export default ItineraryForm;
