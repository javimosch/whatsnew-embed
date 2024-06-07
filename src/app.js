require('dotenv').config()
const express = require('express');
const app = express();
const {MongoClient, ObjectId} = require('mongodb')
const dbName = process.env.DB_NAME || 'whatsnew';
const morgan = require('morgan');

app.use(express.json());
//app.use(bodyParse>r.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.set('view engine', 'ejs');

let client;

console.log('Connecting to mongo', process.env.MONGO_URI)
let dbConnectPromise = MongoClient.connect(process.env.MONGO_URI).then(function (c) {
  console.log('Connected to MongoDB');
  client = c;
  app.client = client
}).catch(err => {
  console.error('Fail to connect to mongo', { err })
})

app.post('/messages', async (req, res) => {
  const { html, title, shortTitle, shortDescription, datetimeFrom, datetimeTo,isDraft } = req.body;

  if (!title) {
    return res.status(400).send({ error: 'Title is required' });
  }
  await dbConnectPromise

  const db = client.db(dbName);
  const collection = db.collection('messages');

  const message = { html, title, shortTitle, shortDescription, datetimeFrom, datetimeTo,isDraft };
  try {
    message.updatedAt = Date.now()
    let doc  = await collection.insertOne(message)
    res.send({ doc,message: 'Message inserted successfully' });
  }
  catch (err) {
    console.log({ err });
    res.status(500).send({ error: 'Failed to insert message' });
  }
});


app.patch('/messages/:id', async (req, res) => {
  const id = req.params.id;
  const { html, title, shortTitle, shortDescription, datetimeFrom, datetimeTo, isDraft } = req.body;

  await dbConnectPromise

  const db = client.db(dbName);
  const collection = db.collection('messages');

  try {
    const filter = { _id: new ObjectId(id) };
    const update = {
      $set: {
        html,
        title,
        shortTitle,
        shortDescription,
        datetimeFrom,
        datetimeTo,
        isDraft,
        updatedAt: Date.now()
      }
    };
    const result = await collection.updateOne(filter, update);
    if (result.modifiedCount === 1) {
      res.send({ message: 'Message updated successfully' });
    } else {
      res.status(404).send({ error: 'Message not found' });
    }
  } catch (err) {
    if(err.stack.includes('BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer')){
      return res.status(404).send({error:'Message not found'})
    }
    console.log({ err });
    res.status(500).send({ error: 'Failed to update message' });
  }
});

app.get('/messages', async (req, res) => {
  await dbConnectPromise

  const db = client.db(dbName);
  const collection = db.collection('messages');
  const pageNumber = parseInt(req.query.page || 0);
  let response = []
  let messages = []

  try {
    //const messages = await collection.find().toArray();
    const now = Date.now();
    
    if (pageNumber) {
      const itemCountPerPage = 10;
      const count = await collection.countDocuments();
      messages = await collection.find()
        .sort({ updatedAt: -1 })
        .skip((pageNumber - 1) * itemCountPerPage)
        .limit(itemCountPerPage)
        .toArray();

      response = { items: messages, totalItems: count };
    } else {
      messages = await collection.find().sort({ updatedAt: -1 }).toArray();
      response = messages;
    }

    let mostRecentUpdatedAt = null;
    let mostRecentMessage = null;
    messages.forEach((message) => {
      const datetimeFrom = new Date(message.datetimeFrom);
      const datetimeTo = new Date(message.datetimeTo);
      if (!message.isDraft && datetimeFrom.getTime() <= now && now <= datetimeTo.getTime()) {
        console.log('message could be active',message.title)
        if (message.updatedAt && (!mostRecentUpdatedAt || message.updatedAt > mostRecentUpdatedAt)) {
          mostRecentUpdatedAt = message.updatedAt;
          mostRecentMessage = message;
        }
      }else{
        /* console.log('message cannot be active',{
          message
        }) */
      }
    });
    if (mostRecentMessage) {
      mostRecentMessage.isActive = true;
    } else {
      for (const message of messages) {
        const datetimeFrom = new Date(message.datetimeFrom);
        const datetimeTo = new Date(message.datetimeTo);
        if (!message.isDraft && datetimeFrom <= now && now <= datetimeTo) {
          message.isActive = true;
          break;
        }
      }
    }
    console.log({
      mostRecentMessage,
      mostRecentUpdatedAt
    })
    res.send(messages);
  }
  catch (err) {
    console.log({ err });
    res.status(500).send({ error: 'Failed to retrieve messages' });
  }
});

app.delete('/messages/:id', async (req, res) => {
  await dbConnectPromise

  const db = client.db(dbName);
  const collection = db.collection('messages');

  try {
    await collection.deleteOne({ _id: new ObjectId(req.params.id) });
    res.send({ message: 'Message deleted successfully' });
  }
  catch (err) {
    if(err.stack.includes('BSONError: input must be a 24 character hex string, 12 byte Uint8Array, or an integer')){
      return res.status(404).send({error:'Message not found'})
    }
    console.log({ err });
    res.status(500).send({ error: 'Failed to delete message' });
  }
});



app.get('/', (req, res) => {
  res.render('index', { title: 'Home Page' });
});

app.dbConnectPromise= dbConnectPromise
app.client = client
app.MongoClient = MongoClient
module.exports = app