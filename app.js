const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();

// CORS middleware with allowed origins and methods
app.use(cors({
  origin: ['http://localhost:5500', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 204, // Some legacy browsers choke on 204
}));

// Handle OPTIONS preflight requests explicitly (optional but helpful)
app.options('/send-location-alert', cors());

// Body parser to read JSON bodies
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'benovencher29@gmail.com',
    pass: 'diee wopf tlra rngv', // Your Gmail app password
  },
});

app.post('/send-location-alert', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Latitude and longitude are required' });
  }

  const mailOptions = {
    from: 'benovencher29@gmail.com',
    to: 'benob9992@gmail.com',
    subject: 'Emergency Alert with Location',
    text: `Alert triggered!\nLatitude: ${latitude}\nLongitude: ${longitude}\nGoogle Maps: https://www.google.com/maps?q=${latitude},${longitude}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Alert email sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server started on port 3000'));
