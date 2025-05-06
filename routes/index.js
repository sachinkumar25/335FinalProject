const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const axios = require('axios');

// Temporarily modify the home route to not depend on MongoDB
// Put MongoDB in there
router.get('/', async (req, res) => {
    try {
      // Temporarily use empty array instead of database query
      const comments = await Comment.find().sort({ createdAt: -1 }).limit(10);
      
      res.render('index', { 
        title: 'LeBron James Fan Page',
        comments: comments
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

// Handle form submission
router.post('/comment', async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    
    // Create new comment
    const newComment = new Comment({
      name,
      message,
      rating: parseInt(rating)
    });
    
    // Save comment to database
    await newComment.save();
    
    // Redirect back to home page
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;