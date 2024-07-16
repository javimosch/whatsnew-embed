const { prepareDbCollection } = require('../db');
const News = require('../models/News');

async function migrateMessagesToNews() {
  console.log('Starting migration from messages to News...');
  
  const messagesCollection = await prepareDbCollection('messages');
  const messages = await messagesCollection.find({}).toArray();

  for (const message of messages) {
    try {
      // Check if a News document with the same _id already exists
      const existingNews = await News.findById(message._id);
      
      if (!existingNews) {
        // Create a new News document
        const news = new News({
          _id: message._id, // Preserve the original _id
          html: message.html,
          title: message.title,
          shortTitle: message.shortTitle,
          shortDescription: message.shortDescription,
          datetimeFrom: message.datetimeFrom,
          datetimeTo: message.datetimeTo,
          isDraft: message.isDraft,
          archived: message.archived || false,
          updatedAt: message.updatedAt || new Date(),
          isActive: message.isActive || false
        });

        await news.save();
        console.log(`Migrated message ${message._id} to News`);
      } else {
        console.log(`News document ${message._id} already exists, skipping`);
      }
    } catch (error) {
      console.error(`Error migrating message ${message._id}:`, error);
    }
  }

  console.log('Migration completed');
}

module.exports = { migrateMessagesToNews };