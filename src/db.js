const mongoose = require('mongoose');
const { MongoClient, ObjectId } = require('mongodb');

const dbName = global.DB_NAME || 'whatsnew';
global.ObjectId = ObjectId;

/**
 * Handles the DB connection with mongo
 */
let scope = module.exports = {
    dbName,
    ObjectId,
    dbConnectPromise: null,
    client: null, // If null, there is no DB connection
    mongoose: null, // Mongoose connection
    init(app) {
        async function resolveWhenDbReady(timeoutSeconds = 5) {
            let start = Date.now();
            do {
                if (scope.client && scope.mongoose) {
                    return;
                }
                if (Date.now() - start > 1000 * timeoutSeconds) {
                    throw new Error('DB_CONNECTION_TIMEOUT');
                }
                await waitSomeTime(0.5);
            } while (!scope.client || !scope.mongoose);
        }

        console.log('Connecting to mongo', global.MONGO_URI);

        // MongoDB Native Driver connection
        scope.dbConnectPromise = MongoClient.connect(global.MONGO_URI).then(function (c) {
            console.log('Connected to MongoDB (Native Driver)');
            scope.client = app.client = c;
        }).catch(err => {
            console.error('Fail to connect to mongo (Native Driver)', { err });
        });

        // Mongoose connection
        const mongooseConnectPromise = mongoose.connect(global.MONGO_URI, { dbName }).then(() => {
            console.log('Connected to MongoDB (Mongoose)');
            scope.mongoose = app.mongoose = mongoose;
        }).catch(err => {
            console.error('Fail to connect to mongo (Mongoose)', { err });
        });

        app.dbConnectPromise = Promise.all([scope.dbConnectPromise, mongooseConnectPromise]);
        app.MongoClient = MongoClient;
        app.mongoose = mongoose;

        scope.prepareDbCollection = async name => {
            console.log('prepareDbCollection', name);
            await resolveWhenDbReady();
            await scope.dbConnectPromise;
            const db = scope.client.db(dbName);
            const collection = db.collection(name);
            return collection;
        };

        scope.prepareDbCollectionMongoose = async name => {
            console.log('prepareDbCollectionMongoose', name);
            await resolveWhenDbReady();
            await mongooseConnectPromise;
            return mongoose.model(name, new mongoose.Schema({}, { strict: false }));
        };

        resolveWhenDbReady().catch(err => {
            console.error('While resolving DB connection', { err });
            setTimeout(() => {
                if (!scope.client || !scope.mongoose) {
                    console.error("Exiting due to no DB connection");
                    process.exit(1);
                }
            }, 1000 * global.DB_CONNECTION_FAIL_EXIT_TIMEOUT_SECONDS);
        });
    }
};

function waitSomeTime(timeSeconds) {
    return new Promise((resolve) => {
        setTimeout(resolve, timeSeconds * 1000);
    });
}