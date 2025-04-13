require('dotenv').config();
console.log("Mongo URI:", process.env.mongoURI);  // TEMP for testing

const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const FormDataModel = require ('./routes/models/FormData');
const User = require('./routes/models/User');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(409).json({ message: 'User already exists' });
  
      const newUser = new User({ name, email, password });
      await newUser.save();
  
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Incorrect password' });
        }

        res.status(200).json({ message: 'Login successful' });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});