const dbName = global.DB_NAME || 'whatsnew';
const { MongoClient, ObjectId } = require('mongodb')
global.ObjectId = ObjectId

/**
 * Handles the DB connection with mongo
 */
let scope = module.exports = {
    dbName,
    ObjectId,
    dbConnectPromise: null,
    client: null, //If nulls, there is no DB connection
    init(app) {

        async function resolveWhenDbReady(timeoutSeconds = 5) {
            let start = Date.now()
            do {
                if (scope.client) {
                    return
                }
                if (Date.now() - start > 1000 * timeoutSeconds) {
                    throw new Error('DB_CONNECTION_TIMEOUT')
                }
                await waitSomeTime(0.5)
            } while (!scope.client)
        }

        console.log('Connecting to mongo', global.MONGO_URI)

        scope.dbConnectPromise = MongoClient.connect(global.MONGO_URI).then(function (c) {
            console.log('Connected to MongoDB');
            scope.client = app.client = c;
        }).catch(err => {
            console.error('Fail to connect to mongo', { err })
        })
        app.dbConnectPromise = scope.dbConnectPromise
        app.MongoClient = MongoClient

        scope.prepareDbCollection = async name => {
            console.log('prepareDbCollection', name)
            await resolveWhenDbReady()
            await scope.dbConnectPromise
            const db = scope.client.db(dbName);
            const collection = db.collection(name);
            return collection
        }

        resolveWhenDbReady().catch(err => {
            console.error('While resolving DB connection', {
                err
            })
            setTimeout(() => {
                if (!scope.client) {
                    console.error("Exiting due to no DB connection")
                    process.exit(1)
                }
            }, 1000*global.DB_CONNECTION_FAIL_EXIT_TIMEOUT_SECONDS)
        })
    }
}

function waitSomeTime(timeSeconds) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timeSeconds)
    })
}