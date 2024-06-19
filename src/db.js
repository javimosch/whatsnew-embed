const dbName = process.env.DB_NAME || 'whatsnew';
const { MongoClient, ObjectId } = require('mongodb')
global.ObjectId=ObjectId


let scope = module.exports = {
    dbName,
    ObjectId,
    dbConnectPromise: null,
    client: null,
    init(app) {

        async function resolveWhenDbReady(timeoutSeconds = 5){
            let start = Date.now()
            do{
                if(scope.client){
                    return
                }
                if(Date.now()-start > 1000 * timeoutSeconds){
                    throw new Error('DB_CONNECTION_TIMEOUT')
                }
                await waitSomeTime(0.5)
            }while(!scope.client)
        }

        console.log('Connecting to mongo', process.env.MONGO_URI)

        scope.dbConnectPromise = MongoClient.connect(process.env.MONGO_URI).then(function (c) {
            console.log('Connected to MongoDB');
            scope.client = app.client = c;
        }).catch(err => {
            console.error('Fail to connect to mongo', { err })
        })
        app.dbConnectPromise = scope.dbConnectPromise
        app.MongoClient = MongoClient

        scope.prepareDbCollection = async name => {
            console.log('prepareDbCollection',name)
            await resolveWhenDbReady()
            await scope.dbConnectPromise
            const db = scope.client.db(dbName);
            const collection = db.collection(name);
            return collection
        }

        resolveWhenDbReady().catch(err=>{
            console.error('While resolving DB connection',{
                err
            })
        })
    }
}

function waitSomeTime(timeSeconds){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },timeSeconds)
    })
}