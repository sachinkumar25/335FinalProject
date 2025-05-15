const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const axios = require('axios');

router.get('/', async (req, res) => {
    try {
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

router.post('/comment', async (req, res) => {
  try {
    const { name, message, rating } = req.body;
    
    const newComment = new Comment({
      name,
      message,
      rating: parseInt(rating)
    });
    
    await newComment.save();
    
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;