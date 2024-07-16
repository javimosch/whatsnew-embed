const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  html: String,
  title: {
    type: String,
    required: true
  },
  shortTitle: String,
  shortDescription: String,
  datetimeFrom: Date,
  datetimeTo: Date,
  isDraft: Boolean,
  archived: {
    type: Boolean,
    default: false
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // This will add createdAt and updatedAt fields
});

// Add a method to check if the news is currently active
newsSchema.methods.checkActive = function() {
  const now = new Date();
  return !this.isDraft && !this.archived && 
         this.datetimeFrom <= now && now <= this.datetimeTo;
};

// Add a static method to find active news
newsSchema.statics.findActive = function() {
  const now = new Date();
  return this.find({
    isDraft: false,
    archived: false,
    datetimeFrom: { $lte: now },
    datetimeTo: { $gte: now }
  }).sort({ updatedAt: -1 });
};

// Add a pre-save middleware to update the 'updatedAt' field
newsSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

const News = mongoose.model('News', newsSchema);

module.exports = News;