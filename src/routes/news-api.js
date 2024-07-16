const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Create a new news item
router.post('/news', async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.status(201).json({ message: 'News item created successfully', news });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all news items with pagination
router.get('/news', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const showArchived = req.query.showArchived === 'true';

    let query = showArchived ? {} : { archived: { $ne: true } };

    const totalItems = await News.countDocuments(query);
    const totalPages = Math.ceil(totalItems / limit);

    const news = await News.find(query)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      news,
      currentPage: page,
      totalPages,
      totalItems
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get active news items
router.get('/news/active', async (req, res) => {
  try {
    const activeNews = await News.findActive();
    res.json(activeNews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific news item
router.get('/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a news item
router.patch('/news/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!news) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: 'News item updated successfully', news });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Archive/Unarchive a news item
router.patch('/news/:id/archived', async (req, res) => {
  try {
    const archived = req.body.archived === true;
    const news = await News.findByIdAndUpdate(req.params.id, { archived }, { new: true });
    if (!news) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: `News item ${archived ? 'archived' : 'unarchived'} successfully`, news });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a news item
router.delete('/news/:id', async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ error: 'News item not found' });
    }
    res.json({ message: 'News item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;