const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs');

// Task 1: Create a new HTML file named home.html
// and return it to the client with the specified message.
router.get('/home', (req, res) => {
  const message = "Welcome to ExpressJs Tutorial";
  const htmlContent = `<html><body><h1>${message}</h1></body></html>`;
  res.send(htmlContent);
});

// Task 2: Return all details from user.json file to the client as JSON format
router.get('/profile', (req, res) => {
  // Read the data from user.json
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    try {
      const userData = JSON.parse(data);
      res.json(userData);
    } catch (error) {
      res.status(500).json({ status: false, message: "Error parsing JSON" });
    }
  });
});

// Task 3: Modify /login router to accept username and password as query string parameters
// and respond accordingly.
router.get('/login', (req, res) => {
  const { username, password } = req.query;
  // Read the data from user.json
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ status: false, message: "Internal Server Error" });
      return;
    }
    try {
      const userData = JSON.parse(data);
      if (userData.username === username && userData.password === password) {
        res.json({ status: true, message: "User Is valid" });
      } else if (userData.username !== username) {
        res.json({ status: false, message: "User Name is invalid" });
      } else {
        res.json({ status: false, message: "Password is invalid" });
      }
    } catch (error) {
      res.status(500).json({ status: false, message: "Error parsing JSON" });
    }
  });
});

// Task 4: Modify /logout route to accept username as a parameter and display a message in HTML format.
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  const htmlContent = `<html><body><b>${username} successfully logged out.</b></body></html>`;
  res.send(htmlContent);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
