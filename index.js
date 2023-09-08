const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Define a route for your currency conversion API
app.get('/convert/:currencyA/:currencyB', async (req, res) => {
  try {
    // Extract currency parameters from the request
    const { currencyA, currencyB } = req.params;

    // Make a GET request to the provided URL
    const apiUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currencyA}/${currencyB}.json`;
    const response = await axios.get(apiUrl);

    // Return the response data
    res.json(response.data);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
