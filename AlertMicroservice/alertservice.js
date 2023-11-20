const express = require('express');
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());

app.use(express.json());

let userPreferences = {
  showPopUps: true
};

app.post('/update-preference', (req, res) => {
  const { showPopUps } = req.body;
  userPreferences.showPopUps = showPopUps;
  res.json({ message: "Preference updated successfully." });
});

const motivationalMessages = [
  "Keep pushing forward! You're doing great!",
  "You're doing fantastic! Keep it up!",
  "Amazing effort! Let's finish the next one!",
  "Every step counts! You're making progress",
  "Impressive work! On to the next task!",
  "Stay positive! You are tackling you're goals!",
  "You're making a difference! One step at a time!"
];

let lastMessageSent = "";

function getRandomMotivationalMessage() {
  let message;
  do {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    message = motivationalMessages[randomIndex];
  } while (message === lastMessageSent);
  lastMessageSent = message;
  return message;
}

app.post('/alert', (req, res) => {
  if(userPreferences.showPopUps) {
    if(req.body.confirmed) {
      const message = getRandomMotivationalMessage();
      res.json({ message: message, popUpEnabled: true });
    } else {
      res.status(400).send('Invalid request');
    }
  } else {
    res.json({ popUpEnabled: false });
  }
});

app.listen(port, () => {
  console.log(`Service is running on port ${port}`);
});
