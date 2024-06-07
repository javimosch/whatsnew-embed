const request = require('supertest');
process.env.DB_NAME = process.env.DB_NAME_TESTS || 'whatsnew_tests';
const dbName = process.env.DB_NAME_TESTS || 'whatsnew_tests';
const app = require('../src/app');

describe('POST /messages', () => {

  beforeEach(async () => {
    await app.dbConnectPromise
    const collections = await app.client.db(dbName).listCollections().toArray();
    for (let collection of collections) {
      await app.client.db(dbName).collection(collection.name).drop();
    }
  });

  it('should create a new message', async () => {
    const title = 'Test Message';
    let res = await request(app).post('/messages').send({ title });
    //res = await res.res
    console.warn({ body:res.body })

    expect(res.body?.doc?.insertedId).toBeDefined()
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Message inserted successfully');
  });

  it('should return 400 if title is missing', async () => {
    const res = await request(app).post('/messages').send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toBe('Title is required');
  });

});




describe('DELETE /messages/:id', () => {
  let messageId;

  beforeEach(async () => {
    await app.dbConnectPromise
    const collections = await app.client.db(dbName).listCollections().toArray();
    for (let collection of collections) {
      await app.client.db(dbName).collection(collection.name).drop();
    }

    // Create a message to delete
    const title = 'Test Message';
    const res = await request(app).post('/messages').send({ title });
    messageId = res.body?.doc?.insertedId
  });
  

  it('should delete a message', async () => {
    const res = await request(app).delete(`/messages/${messageId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Message deleted successfully');
  });

  it('should return 404 if message is not found', async () => {
    const nonExistentId = '123456789012';
    const res = await request(app).delete(`/messages/${nonExistentId}`);

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Message not found');
  });
});


describe('PATCH /messages/:id', () => {
  let messageId;

  beforeEach(async () => {
    await app.dbConnectPromise
    const collections = await app.client.db(dbName).listCollections().toArray();
    for (let collection of collections) {
      await app.client.db(dbName).collection(collection.name).drop();
    }

    // Create a message to update
    const title = 'Test Message';
    const res = await request(app).post('/messages').send({ title });
    messageId = res.body?.doc?.insertedId
  });

  it('should update a message', async () => {
    const updatedTitle = 'Updated Test Message';
    const res = await request(app).patch(`/messages/${messageId}`).send({ title: updatedTitle });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Message updated successfully');
  });

  it('should return 404 if message is not found', async () => {
    const nonExistentId = '123456789012';
    const res = await request(app).patch(`/messages/${nonExistentId}`).send({ title: 'Updated Test Message' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('Message not found');
  });
});