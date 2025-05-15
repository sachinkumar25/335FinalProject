const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', async (req, res) => {
  try {
    const playerData = {
      first_name: "LeBron",
      last_name: "James",
      position: "F",
      height_feet: 6,
      height_inches: 9,
      weight_pounds: 250,
      team: {
        full_name: "Los Angeles Lakers",
        abbreviation: "LAL"
      }
    };
    
    const seasonData = {
      pts: 25.7,
      reb: 7.5,
      ast: 8.3,
      stl: 1.2,
      blk: 0.5,
      fg_pct: 0.504,
      fg3_pct: 0.355,
      ft_pct: 0.731
    };
    
    res.render('stats', {
      title: 'LeBron James Stats',
      player: playerData,
      stats: seasonData
    });
  } catch (err) {
    console.error('API Error:', err.message);
    res.status(500).render('stats', {
      title: 'LeBron James Stats',
      player: null,
      stats: null,
      error: 'Error fetching stats data. The API may be down or rate-limited.'
    });
  }
});

module.exports = router;