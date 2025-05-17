const express = require('express');
const router = express.Router();
const axios = require('axios');

const LEBRON_ID = 237;
const LAKERS_ID = 14;

router.get('/', async (req, res) => {
  try {
    console.log('Making API requests with key:', process.env.BALL_DONT_LIE_API_KEY ? 'Key exists (not showing full key)' : 'No key found');
    
    let apiResults = {
      player: { success: false, data: null, error: null },
      team: { success: false, data: null, error: null }
    };
    
    const makeApiCall = async (endpoint, resultKey) => {
      try {
        const response = await axios.get(
          `https://api.balldontlie.io/v1/${endpoint}`, 
          { 
            headers: { 
              'Authorization': process.env.BALL_DONT_LIE_API_KEY || '75205853-7356-4945-9bd1-6b44232659d0'
            },
            validateStatus: function (status) {
              return true;
            }
          }
        );
        
        console.log(`API Response for ${endpoint} - Status:`, response.status);
        
        if (response.status === 200) {
          apiResults[resultKey].success = true;
          apiResults[resultKey].data = response.data;
          return true;
        } else {
          apiResults[resultKey].error = `Status: ${response.status}, Message: ${response.statusText || 'Unknown error'}`;
          console.log(`API error for ${endpoint}:`, apiResults[resultKey].error);
          return false;
        }
      } catch (err) {
        apiResults[resultKey].error = err.message;
        console.error(`API error for ${endpoint}:`, err.message);
        return false;
      }
    };
    
    await makeApiCall(`players/${LEBRON_ID}`, 'player');
    await makeApiCall(`teams/${LAKERS_ID}`, 'team');
    
    const playerData = apiResults.player.success 
      ? (apiResults.player.data.data || apiResults.player.data)
      : {
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
    
    const teamData = apiResults.team.success 
      ? (apiResults.team.data.data || apiResults.team.data)
      : null;
    
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
      team: teamData,
      stats: seasonData,
      goatTierRequired: true
    });
    
  } catch (err) {
    console.error('General Error:', err.message);
    
    const fallbackPlayer = {
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
    
    const fallbackStats = {
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
      player: fallbackPlayer,
      team: null,
      stats: fallbackStats,
      goatTierRequired: true
    });
  }
});

module.exports = router;