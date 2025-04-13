const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-itinerary', async (req, res) => {
    const {
        locationInCord,
        location,
        radius,
        startTime,
        endTime,
        budget,

        preference
      } = req.body;

      const { latitude, longitude } = locationInCord;
      const { minValue, maxValue, estimateValue} = budget;

    const prompt = `
Create a detailed travel itinerary near coordinates (${latitude}, ${longitude}) within a ${radius}-mile radius of the cordinates.
The itinerary should start at ${startTime} and end at ${endTime} and can go over the budget $${minValue} but not exceed the $${maxValue}. 
Give me an Estimate Value of after all Activities has been generated:$${estimateValue}.


Respond ONLY in JSON like this:
{
  "location": "${location}",
  "startTime": "${startTime}",
  "endTime": "${endTime}",
  "budget: "$${estimateValue}",

  "activities": [
    { "startTime": "9:00AM", "endTime": "10:00AM", "activity": "Breakfast at cafe", "optional": false },
    { "startTime": "10:30AM", "endTime": "12:00PM", "activity": "Visit museum", "optional": false }
  ]

}
`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }],
        }, {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        console.log("=== RAW GPT RESPONSE ===");
        console.log(response.data.choices[0].message.content);

        const itinerary = JSON.parse(response.data.choices[0].message.content);

        res.json(itinerary);

    } catch (err) {
        console.error("=== GPT ERROR ===");
        console.error(err);
        res.status(500).json({ error: 'Failed to generate itinerary' });
    }
});

module.exports = router;
