const express = require('express');
const router = express.Router();
const axios = require('axios');

// Ball Don't Lie API - Player ID for LeBron James is 237
const LEBRON_ID = 237;

// Stats page route
router.get('/', async (req, res) => {
  try {
    // Fetch LeBron's stats from the Ball Don't Lie API
    const response = await axios.get(`${process.env.BALL_DONT_LIE_API}/players/${LEBRON_ID}`);
    const playerData = response.data;
    
    // Fetch some season averages (the most recent available in the API)
    const seasonResponse = await axios.get(`${process.env.BALL_DONT_LIE_API}/season_averages?player_ids[]=${LEBRON_ID}`);
    const seasonData = seasonResponse.data.data.length > 0 ? seasonResponse.data.data[0] : null;
    
    // Render the stats page with the API data
    res.render('stats', {
      title: 'LeBron James Stats',
      player: playerData,
      stats: seasonData
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching stats data');
  }
});

module.exports = router;