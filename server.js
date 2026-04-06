const express = require('express');
const app = express();

app.use(express.json());

let users = [];

let packages = [
  { name: "30 Minutes", price: 5, duration: 1800 },
  { name: "2 Hours", price: 10, duration: 7200 },
  { name: "5 Hours", price: 20, duration: 18000 },
  { name: "8 Hours", price: 30, duration: 28800 },
  { name: "1 Day", price: 50, duration: 86400 },
  { name: "1 Week", price: 150, duration: 604800 }
];

app.get('/', (req, res) => {
  res.send("WiFi System Running 🚀");
});

app.get('/packages', (req, res) => {
  res.json(packages);
});

app.post('/buy', (req, res) => {
  const { phone, packageName } = req.body;

  let selected = packages.find(p => p.name === packageName);
  if (!selected) return res.send("Invalid package");

  let expiry = Date.now() + (selected.duration * 1000);

  users.push({ phone, packageName, expiry });

  res.send(`Package activated for ${phone}`);
});

app.listen(3000, () => console.log("Server running"));
