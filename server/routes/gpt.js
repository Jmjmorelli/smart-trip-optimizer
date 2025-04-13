const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/generate-itinerary', async (req, res) => {
    const { location, startTime, endTime } = req.body;

    const prompt = `
Create a travel itinerary for ${location} from ${startTime} to ${endTime}.
Respond ONLY in JSON like this:
{
  "location": "${location}",
  "startTime": "${startTime}",
  "endTime": "${endTime}",
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
